import { Pipe, PipeTransform } from '@angular/core';
import { CLOCk_TYPES, CLOCK_VIEWS } from '../constant/app-constants';

@Pipe({
  name: 'mClockArray'
})
export class MClockArrayPipe implements PipeTransform {

  transform(value: number, view: number, type: number, args?: any): Array<number> {
    let steps: number = 1;
    let result: Array<number> = [];
    let start: number = 1;
    let end: number = value + 1;

    if (type === CLOCk_TYPES.WIDE) {
      start = 0;
      end = value;
    }

    if (view === CLOCK_VIEWS.MINUTES) {
      steps = 5;
      start = 0;
      end = 60;
    }

    for (let i = start; i < end; i += steps) {
      result.push(i);
    }
    return result;
  }

}
