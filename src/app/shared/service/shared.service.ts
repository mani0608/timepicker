import { Injectable } from '@angular/core';
import { CLOCK_VIEWS, CLOCk_TYPES } from '../constant/app-constants';
import { Attributes } from '../type/attributes.type';
import { DefaultTime } from '../type/default-time.type';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _attributes: Attributes

  constructor() { 
    this._attributes = new Attributes();
    this._attributes.initialize();
  }

  setAttribute(attributes: Attributes) {
    this._attributes = attributes;
  }

  getAttribute(): Attributes {
    return this._attributes;
  }

  alignHand(dx: number, dy: number, drag?: boolean) {

    let outerRadius = this._attributes.timeDefaults.outerRadius;
    let innerRadius = this._attributes.timeDefaults.innerRadius;

    let radian = Math.atan2(dx, -dy);
    let isHours = this._attributes.clockView === 1;
    let unit = Math.PI / (isHours ? 6 : 30);
    let z = Math.sqrt(dx * dx + dy * dy);
    let inner = isHours && z < (outerRadius + innerRadius) / 2;
    let radius = inner ? innerRadius : outerRadius;
    let value;

    if (this._attributes.clockType === CLOCk_TYPES.SIMPLE) {
      radius = outerRadius;
    }

    // Radian should in range [0, 2PI]
    if (radian < 0) {
      radian = Math.PI * 2 + radian;
    }

    // Get the round value
    value = Math.round(radian / unit);

    // Get the round radian
    radian = value * unit;

    // Correct the hours or minutes
    if (this._attributes.clockType === CLOCk_TYPES.SIMPLE) {
      if (isHours) {
        if (value === 0) {
          value = 12;
        }
      } else {
        if (value === 60) {
          value = 0;
        }
      }
    } else {
      if (isHours) {
        if (value === 12) {
          value = 0;
        }
        value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
      } else {
        if (value === 60) {
          value = 0;
        }
      }
    }

    this.setSelectedValue(value);

    // Place clock hand at the top when dragging
		/* if (! isHours && value % 5) {
			this.g.insertBefore(this.hand, this.bearing);
			this.g.insertBefore(this.bg, this.fg);
			this.bg.setAttribute('class', 'm-clock-canvas-bg m-clock-canvas-bg-trans');
		} else {
			// Or place it at the bottom
			this.g.insertBefore(this.hand, this.bg);
			this.g.insertBefore(this.fg, this.bg);
			this.bg.setAttribute('class', 'm-clock-canvas-bg');
		} */

    // Set clock hand and others' position
    let cx = Math.sin(radian) * radius;
    let cy = - Math.cos(radian) * radius;

    this._attributes.lineX2 = cx;
    this._attributes.lineY2 = cy;

    this._attributes.bgCX = cx;
    this._attributes.bgCY = cy;
    this._attributes.fgCX = cx;
    this._attributes.fgCY = cy;
  }

  resetClock() {

    let value: Array<number> = [];
    let timePart: number;
    let innerRadius = this._attributes.timeDefaults.innerRadius;
    let outerRadius = this._attributes.timeDefaults.outerRadius;

    if (this.isTimeSet()) {
      value = [Number(this._attributes.selectedTime.hour), Number(this._attributes.selectedTime.minutes)];
    } else {
      let defaultTimeValue = DefaultTime._value;
        if (defaultTimeValue === 'now') {
          var now = new Date(+ new Date() + this._attributes.timeDefaults.fromnow);
          value = [
            now.getHours(),
            now.getMinutes()
          ];
        } else {
          value.push(Number(DefaultTime._hour));
          value.push(Number(DefaultTime._minutes));
        }
    }

    timePart = value[0];

    if (this._attributes.clockView === CLOCK_VIEWS.MINUTES) {
      timePart = value[1];
    }

    let isHours: boolean = (this._attributes.clockView === CLOCK_VIEWS.HOUR);
    let unit = Math.PI / (isHours ? 6 : 30);
    let radian = timePart * unit;
    let radius = isHours && timePart > 0 && timePart < 13 ? innerRadius : outerRadius;
    let x = Math.sin(radian) * radius;
    let y = - Math.cos(radian) * radius;
    this.alignHand(x, y);
  }

  toggleView() {
    if (this.isHourView()) {
      this._attributes.clockView = CLOCK_VIEWS.MINUTES;
    } else {
      this._attributes.clockView = CLOCK_VIEWS.HOUR;
    }

    this.resetClock();
  }

  leadingZero(num: number): string {
    return (num < 10 ? '0' : '') + num;
  }

  setSelectedValue(value: number) {
    if (this.isHourView())
      this._attributes.selectedTime.hour = this.leadingZero(value);
    else
      this._attributes.selectedTime.minutes = this.leadingZero(value);

    if (this.isTimeSet()) {
      if(this._attributes.clockType === CLOCk_TYPES.SIMPLE)
        this._attributes.selectedTime.value = this._attributes.selectedTime.hour + ":" + this._attributes.selectedTime.minutes + " " + this._attributes.selectedTime.meridian;
      else {
        this._attributes.selectedTime.value = this._attributes.selectedTime.hour + ":" + this._attributes.selectedTime.minutes;
        this._attributes.selectedTime.meridian = '';
      }
    }
  }

  isHourView() {
    return (this._attributes.clockView === CLOCK_VIEWS.HOUR);
  }

  isTimeSet() {
    return (this._attributes.selectedTime.hour && this._attributes.selectedTime.minutes)
  }

  setMeridian(value: string): void {
    this._attributes.selectedTime.meridian = value;
    this.updateValue();
  }

  getMeridian(): string {
    return this._attributes.selectedTime.meridian;
  }

  setClockType(value: number): void {

    if (this._attributes.clockType !== value) {

      if (value === CLOCk_TYPES.WIDE) {
        this._attributes.selectedTime.meridian = "";
      } else {
        this._attributes.selectedTime.meridian = DefaultTime._meridian;
      }
      this._attributes.clockType = value;
      this.updateValue();
      this.resetClock();

    }
  }

  getHour(): string {
    return this._attributes.selectedTime.hour;
  }

  getMinutes(): string {
    return this._attributes.selectedTime.minutes;
  }

  updateValue() {
    this._attributes.selectedTime.value = this.getHour() + ':' + this.getMinutes() + ' ' + this.getMeridian();
  }

  initTimeFromInput (value: string) {
    if (value && value.trim().length > 0) {
      //splitting hours & minutes - 12:00 AM
      let hourspart:Array<string> = value.split(":");
      this._attributes.selectedTime.hour = hourspart[0];
      let minutespart:Array<string> = hourspart[1].split(" ");
      this._attributes.selectedTime.minutes = minutespart[0];
      this._attributes.selectedTime.meridian = minutespart[1];

      let meridian = minutespart[1];

      if (meridian && meridian.trim().length > 0) {
        this._attributes.clockType = CLOCk_TYPES.SIMPLE;
      }else {
        this._attributes.clockType = CLOCk_TYPES.WIDE;
      }
    }
  }
}
