import {
  Directive, ElementRef, OnInit, Renderer2,
  OnDestroy, HostListener, Input, Inject, Output, EventEmitter
} from '@angular/core';
import { CLOCK_VIEWS, CLOCk_TYPES } from '../constant/app-constants';
import { DOCUMENT } from '@angular/common';
import { Attributes } from '../type/attributes.type';
import { SharedService } from '../service/shared.service';

@Directive({
  selector: '[appTickerDragCapture]'
})
export class TickerDragCaptureDirective {

  @Input('step') step: number;
  @Input('cp') cp: ElementRef;
  @Input('spacedMinutes') spacedMinutes: boolean;

  @Output() returnValues: EventEmitter<Attributes> = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
    private rend: Renderer2,
    private service: SharedService) {
    console.log('Directive Init');
  }

  @HostListener('mousedown', ['$event']) mousedown(event) {
    event.preventDefault();
    let attributes = this.service.getAttribute();
    attributes.isMouseDown = true;
    let outerRadius = attributes.timeDefaults.outerRadius;
    let dialRadius = attributes.timeDefaults.dialRadius;
    let tickRadius = attributes.timeDefaults.tickRadius;


    let offsetLeft: number = this.cp.nativeElement.getBoundingClientRect().left;
    let offsetTop: number = this.cp.nativeElement.getBoundingClientRect().top;
    attributes.x0 = offsetLeft + dialRadius;
    attributes.y0 = offsetTop + dialRadius;
    attributes.dx = event.pageX - attributes.x0;
    attributes.dy = event.pageY - attributes.y0;
    let z = Math.sqrt(attributes.dx * attributes.dx + attributes.dy * attributes.dy);

    event.preventDefault();

    if (this.spacedMinutes && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
      return;
    }

    setTimeout(() => {
      this.rend.addClass(this.document.body, 'm-clock-moving');
    }, 200);

    this.alignHand(attributes.dx, attributes.dy, false, 'mousedown');
  }

  @HostListener('document:mouseup', ['$event']) mouseup(event) {
    let attributes = this.service.getAttribute();

    if (attributes.isMouseDown) {
      event.preventDefault();
      let view: number = attributes.clockView;
      let x = event.pageX - attributes.x0;
      let y = event.pageY - attributes.y0;

      if ((this.spacedMinutes || attributes.isMouseMoved) && x === attributes.dx && y === attributes.dy) {
        this.alignHand(x, y, false, 'mouseup');
      }

      this.service.toggleView();

      attributes.x0 = 0;
      attributes.y0 = 0;
      attributes.dx = 0;
      attributes.dy = 0;

      attributes.isMouseDown = false;
      attributes.isMouseMoved = false;
      this.rend.removeClass(this.document.body, 'm-clock-moving');
    }
  }

  @HostListener('document:mousemove', ['$event']) mousemove(event) {
    let attributes = this.service.getAttribute();

    if (attributes.isMouseDown) {
      event.preventDefault();
      let x = event.pageX - attributes.x0;
      let y = event.pageY - attributes.y0;
      if (!attributes.isMouseMoved && x === attributes.dx && y === attributes.dy) {
        // Clicking in chrome on windows will trigger a mousemove event
        return;
      }

      attributes.isMouseMoved = true;
      this.alignHand(x, y, true, 'mousemove');
    }
  }

  alignHand(dx: number, dy: number, drag: boolean, eventSrc: string) {
    this.service.alignHand(dx, dy, drag);
    if (eventSrc === 'mouseup') {
      let attributes = this.service.getAttribute();
      this.returnValues.emit(attributes);
    }
  }

}
