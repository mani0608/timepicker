import { Directive, Input, EventEmitter, Optional, ElementRef, OnDestroy } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { MatFormField } from '@angular/material';
import { MTimepicker } from 'src/app/clock/m-clock/m-clock.component';
import { Subscription } from 'rxjs';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: 'input[mTimePicker]',
  host: {
    '[attr.aria-haspopup]': 'true',
    '[disabled]': 'disabled',
    '(input)': '_onInput($event.target.value)',
    '(keydown)': '_onKeydown($event)',
    '(blur)': '_onBlur()'
  }
})
export class MTimePickerInput implements ControlValueAccessor, OnDestroy {

  _valueChange = new EventEmitter<any>();

  private _cvaOnChange: (value: any) => void = () => { };

  /** Emits when the disabled state has changed */
  _disabledChange = new EventEmitter<boolean>();

  private _timepickerSubscription = Subscription.EMPTY;

  /** The value of the input. */
  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    this._value = value;
    this._formatValue(value);
    this._valueChange.emit(value);
  }

  private _value: any;

  @Input()
  set mTimePicker(value: MTimepicker) {
    if (!value) {
      return;
    }
    this._timepicker = value;
    this._timepicker.registerInput(this);
    this._timepickerSubscription.unsubscribe();

    this._timepickerSubscription = this._timepicker._timeSelected.subscribe((selected: any) => {
      this.value = selected.value;
      this._cvaOnChange(selected.value);
    });
  }

  _timepicker: MTimepicker;

  /** Whether the datepicker-input is disabled. */
  @Input()
  get disabled(): boolean { return !!this._disabled; }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this._disabledChange.emit(newValue);
    }
  }

  private _disabled: boolean;

  constructor(private _elementRef: ElementRef<HTMLInputElement>,
    @Optional() private _formField: MatFormField) { }


  ngOnDestroy() {
    this._timepickerSubscription.unsubscribe();
    this._valueChange.unsubscribe();
    this._disabledChange.complete();
  }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: any): void {
    this.value = value;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => void): void {
    this._cvaOnChange = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: () => void): void {
    //this._onTouched = fn;
  }

  _onKeydown(event: KeyboardEvent) {
    const isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW;

    if (this._timepicker && isAltDownArrow && !this._elementRef.nativeElement.readOnly) {
      this._timepicker.open();
      event.preventDefault();
    }
  }

  _onInput(value: string) {
    this._value = value;
    this._cvaOnChange(value);
    this._valueChange.emit(value);
  }

  /** Handles blur events on the input. */
  _onBlur() {
    // Reformat the input only if we have a valid value.
    if (this.value) {
      this._formatValue(this.value);
    }
  }

  getElement(): ElementRef {
    return this._elementRef;
  }


  /**
   * Gets the element that the datepicker popup should be connected to.
   * @return The element to connect the popup to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
  }

  /** Formats a value and sets it on the input element. */
  private _formatValue(value: any) {
    this._elementRef.nativeElement.value = value;
  }

}
