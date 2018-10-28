import { Directive, ElementRef, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appClockViewTransition]'
})
export class ClockViewTransitionDirective implements OnInit, OnDestroy {

  constructor(private el: ElementRef,
    private rend: Renderer2) { }

  ngOnInit() {
    let target = this.el.nativeElement;
    this.rend.removeClass(target, 'm-clock-dial-out');
  }

  ngOnDestroy() {
    let target = this.el.nativeElement;
    this.rend.addClass(target, 'm-clock-dial-out');
  }

}
