import {
  Component, OnInit, EventEmitter,
  Output, Renderer2, ViewChild, ElementRef, Inject,
  Input, ChangeDetectionStrategy, Optional, InjectionToken,
  ViewContainerRef, ComponentRef, NgZone, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList, OnChanges
} from '@angular/core';

import { MatButtonToggleChange } from '@angular/material';
import { Subscription, Subject, merge } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { matDatepickerAnimations } from '@angular/material/datepicker';

import { MTimePickerInput } from '../../shared/directive/m-time-picker.directive';

import { CLOCk_TYPES, CLOCK_VIEWS } from '../../shared/constant/app-constants';

import { Attributes } from '../../shared/type/attributes.type';
import { DefaultTime } from '../../shared/type/default-time.type';

import { SharedService } from 'src/app/shared/service/shared.service';
import { OverlayRef, OverlayConfig, Overlay, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/platform-browser';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/** Injection token that determines the scroll handling while the calendar is open. */
export const M_TIMEPICKER_SCROLL_STRATEGY =
  new InjectionToken<() => ScrollStrategy>('m-timepicker-scroll-strategy');

/** @docs-private */
export function M_TIMEPICKER_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const M_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: M_TIMEPICKER_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: M_TIMEPICKER_SCROLL_STRATEGY_FACTORY,
};

export enum DEFAUTS {
  default = '',       // default time, 'now' or '13:14' e.g.
  fromnow = 0,          // set default time to * milliseconds from now (using with default = 'now')
  placement = 'bottom', // clock popover placement
  align = 'left',       // popover arrow align
  donetext = 'Done',    // done button text
  autoclose = 0,    // auto close when minute is selected
  twelvehour = 0, // change to 12 hour AM/PM clock from 24 hour
  vibrate = 1        // vibrate the device when dragging clock hand
}

@Component({
  selector: 'app-m-clock',
  templateUrl: './m-clock.component.html',
  styleUrls: ['./m-clock.component.scss'],
  host: {
    'class': 'mat-datepicker-content',
    '[@transformPanel]': '"enter"'
  },
  animations: [
    matDatepickerAnimations.transformPanel,
    matDatepickerAnimations.fadeInCalendar,
  ],
})

export class MTimepickerContent implements OnInit {

  @ViewChild('cph') hourParent: ElementRef;
  @ViewChild('cpm') minutesParent: ElementRef;
  @ViewChild('cp') cpRef: ElementRef;

  @ViewChild('container') container: ElementRef;

  private transform: string;
  attributes: Attributes;

  timepicker: MTimepicker;

  constructor(private rend: Renderer2, private service: SharedService) { }

  ngOnInit() {

    this.attributes = this.service.getAttribute();

    this.transform = "translate(" + this.attributes.timeDefaults.dialRadius + "," + this.attributes.timeDefaults.dialRadius + ")";

    this.initTimeFromInput();

    this.service.resetClock();

    this.attributes = this.service.getAttribute();
  }

  initTimeFromInput(): void {
    this.service.initTimeFromInput(this.timepicker._selected);
  }

  syncAttributes(value: Attributes) {
    this.attributes = value;
  }

  format(step: number): string {
    return this.service.leadingZero(step);
  }

  logdata() {
    console.log(this.attributes.clockType);
  }

  update(source: string, event: MatButtonToggleChange) {
    if (source === 'meridian') {
      this.service.setMeridian(event.value);
    } else if (source === 'type') {
      this.service.setClockType(event.value);
    }
  }

  select(): void {
    this.timepicker.select();
  }

  setContainerWidth(width: number): void {
    this.container.nativeElement.style.width = width + 'px';
  }

}


@Component({
  selector: 'app-timepicker',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MTimepicker implements OnInit, OnDestroy {

  private _scrollStrategy: () => ScrollStrategy;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {

    const nw = coerceBooleanProperty(value);

    if (nw !== this._disabled) {
      this._disabled = nw;
      this._disabledChange.next(nw);
    }

  }

  private _disabled: boolean;

  /** Whether the timer is open. */
  @Input()
  get opened(): boolean { return this._opened; }
  set opened(value: boolean) { value ? this.open() : this.close(); }

  private _opened: boolean;

  _timePickerInput: MTimePickerInput;

  private _inputSubscription = Subscription.EMPTY;

  readonly _timeSelected = new Subject<any>();

  /** Emits when the datepicker is disabled. */
  readonly _disabledChange = new Subject<boolean>();

  _selected: string;

  /** A reference to the overlay when the timepicker is opened as a popup. */
  _popupRef: OverlayRef;

  /** A portal containing the calendar for this datepicker. */
  private _timerPortal: ComponentPortal<MTimepickerContent>;

  private _popupComponentRef: ComponentRef<MTimepickerContent>;

  /** Emits when the timepicker has been opened. */
  @Output('opened') openedStream: EventEmitter<void> = new EventEmitter<void>();

  /** Emits when the timepicker has been closed. */
  @Output('closed') closedStream: EventEmitter<void> = new EventEmitter<void>();

  constructor(private service: SharedService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _zone: NgZone,
    @Optional() private _dir: Directionality,
    @Inject(M_TIMEPICKER_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() @Inject(DOCUMENT) private _document: any) {
    this._scrollStrategy = scrollStrategy;
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.close();
    this._inputSubscription.unsubscribe();
    this._disabledChange.complete();

    if (this._popupRef) {
      this._popupRef.dispose();
      this._popupComponentRef = null;
    }
  }

  registerInput(input: MTimePickerInput) {
    this._timePickerInput = input;
    this._inputSubscription =
      this._timePickerInput._valueChange.subscribe((value: any) => this._selected = value);
  }

  select() {
    this._timeSelected.next(this.service.getAttribute().selectedTime);
    this.close();
  }

  open(): void {
    if (this._opened || this._disabled) {
      return;
    }

    if (!this._timePickerInput) {
      throw Error("Attempted to open an TimePicker with no associated input.");
    }

    this._openAsPopup();
    this._opened = true;

    //Emits when timepicker is opened
    this.openedStream.emit();
  }

  close(): void {

    if (!this._opened) {
      return;
    }

    if (this._popupRef && this._popupRef.hasAttached()) {
      this._popupRef.detach();
    }

    if (this._timerPortal && this._timerPortal.isAttached) {
      this._timerPortal.detach();
    }

    const completeClose = () => {
      if (this._opened) {
        this._opened = false;
        this.closedStream.emit();
      }
    }
    completeClose();
  }

  private _openAsPopup(): void {

    if (!this._timerPortal)
      this._timerPortal = new ComponentPortal<MTimepickerContent>(MTimepickerContent,
        this._viewContainerRef);

    if (!this._popupRef)
      this._createPopup();

    if (!this._popupRef.hasAttached()) {
      this._popupComponentRef = this._popupRef.attach(this._timerPortal);
      this._popupComponentRef.instance.timepicker = this;
    }

    this._popupComponentRef.instance.setContainerWidth(this._timePickerInput.getElement().nativeElement.clientWidth);

    this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
      this._popupRef.updatePosition();
    })
  }

  private _createPopup(): void {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: 'm-overlay-transparent-backdrop',
      direction: this._dir,
      scrollStrategy: this._scrollStrategy(),
      panelClass: 'm-timepicker-popup'
    });

    this._popupRef = this._overlay.create(overlayConfig);
    this._popupRef.overlayElement.setAttribute('role', 'dialog');

    merge(
      this._popupRef.backdropClick(),
      this._popupRef.detachments(),

      this._popupRef.keydownEvents().pipe(filter(event => {
        // Closing on alt + up is only valid when there's an input associated with the datepicker.
        return event.keyCode === ESCAPE ||
          (this._timePickerInput && event.altKey && event.keyCode === UP_ARROW);
      }))
    ).subscribe(() => this.close());

  }

  private _createPopupPositionStrategy(): PositionStrategy {
    return this._overlay.position()
      .flexibleConnectedTo(this._timePickerInput.getConnectedOverlayOrigin())
      .withTransformOriginOn('app-m-clock')
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withLockedPosition()
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ]);
  }
}
