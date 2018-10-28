import { Component, OnInit, Input, ChangeDetectorRef, AfterContentInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MTimepicker } from '../m-clock/m-clock.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {merge, of as observableOf, Subscription} from 'rxjs';

@Component({
  selector: 'app-time-picker-toggle',
  templateUrl: './m-time-picker-toggle.component.html',
  styleUrls: ['./m-time-picker-toggle.component.scss'],
  host: {
    'class': 'mat-datepicker-toggle',
    // Clear out the native tabindex here since we forward it to the underlying button
    '[class.mat-datepicker-toggle-active]': 'datepicker && datepicker.opened'
  }
})
export class MTimePickerToggleComponent implements AfterContentInit, OnChanges, OnDestroy {

  private _stateChanges = Subscription.EMPTY;

  @Input('for') timePicker: MTimepicker;

  @Input()
  get disabled(): boolean {
    return this._disabled === undefined ? this.timePicker.disabled : !!this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  private _disabled: boolean;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterContentInit() {
    this._watchStateChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.timePicker) {
      this._watchStateChanges();
    }
  }

  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }

  _open(event: Event): void {
    if (this.timePicker && !this.timePicker.disabled) {
      this.timePicker.open();
      event.stopPropagation();
    }
  }

  private _watchStateChanges() {
    const timepickerDisabled = this.timePicker ? this.timePicker._disabledChange : observableOf();
    const inputDisable = this.timePicker && this.timePicker._timePickerInput ? 
                          this.timePicker._timePickerInput._disabledChange : observableOf();
    const timepickerToggled = this.timePicker ? merge(this.timePicker.openedStream, this.timePicker.closedStream) : observableOf();

    this._stateChanges.unsubscribe();

    this._stateChanges = merge (
      timepickerDisabled,
      inputDisable,
      timepickerToggled
    ).subscribe(() => this.cdr.markForCheck());
  }

}
