import { Directive, ElementRef, OnInit, Input, Renderer2 } from '@angular/core';
import { Attributes } from '../type/attributes.type';
import { SharedService } from '../service/shared.service';

@Directive({
  selector: '[appMinutesStyleTicker]'
})
export class MinutesStyleTickerDirective implements OnInit {

  @Input('step') step: number;
  
  constructor(private el: ElementRef, 
            private rend: Renderer2,
            private service: SharedService) { }

  ngOnInit() {
    this.doStyle();
  }

  doStyle() {

    let attributes: Attributes = this.service.getAttribute();;

    let outerRadius = attributes.timeDefaults.outerRadius;
    let dialRadius = attributes.timeDefaults.dialRadius;
    let tickRadius = attributes.timeDefaults.tickRadius;

    let ticker = this.el.nativeElement;

    let radian = this.step / 30 * Math.PI;

    this.rend.setStyle(ticker, 'font-size', '120%');
    this.rend.setStyle(ticker, 'left', String(dialRadius + Math.sin(radian) * outerRadius - tickRadius - 5) + 'px');
    this.rend.setStyle(ticker, 'top', String(dialRadius - Math.cos(radian) * outerRadius - tickRadius - 5) + 'px');
  }

}
