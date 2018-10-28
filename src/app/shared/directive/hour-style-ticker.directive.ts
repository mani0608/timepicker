import { Directive, ElementRef, OnInit, Input, Renderer2 } from '@angular/core';
import { CLOCk_TYPES, CLOCK_VIEWS } from '../../shared/constant/app-constants';
import { Attributes } from '../type/attributes.type';
import { SharedService } from '../service/shared.service';

@Directive({
  selector: '[appHourStyleTicker]'
})
export class HourStyleTickerDirective implements OnInit {

  @Input('step') step: number;

  constructor(private el: ElementRef, 
            private rend: Renderer2,
            private service: SharedService) { }

  ngOnInit() {
    this.doStyle();
  }

  doStyle() {
    let attributes: Attributes = this.service.getAttribute();
    let outerRadius:number = attributes.timeDefaults.outerRadius;
    let dialRadius:number = attributes.timeDefaults.dialRadius;
    let tickRadius:number = attributes.timeDefaults.tickRadius;
    let innerRadius:number = attributes.timeDefaults.innerRadius;
    let type:number = attributes.clockType;

    let ticker = this.el.nativeElement;

    if (type && type === CLOCk_TYPES.SIMPLE) {
      let radian = this.step / 6 * Math.PI;
      let radius = outerRadius;

      this.rend.setStyle(ticker, 'font-size', '120%');
      this.rend.setStyle(ticker, 'left', String(dialRadius + Math.sin(radian) * radius - tickRadius - 5) + 'px');
      this.rend.setStyle(ticker, 'top', String(dialRadius - Math.cos(radian) * radius - tickRadius - 5) + 'px');
    } else {
      let radian = this.step / 6 * Math.PI;
      let inner = this.step > 0 && this.step < 13;
      let radius = inner ? innerRadius : outerRadius;
      if (inner) {
        this.rend.setStyle(ticker, 'font-size', '120%');
      }

      this.rend.setStyle(ticker, 'left', String(dialRadius + Math.sin(radian) * radius - tickRadius - 5) + 'px');
      this.rend.setStyle(ticker, 'top', String(dialRadius - Math.cos(radian) * radius - tickRadius - 5) + 'px');
    }

  }

}
