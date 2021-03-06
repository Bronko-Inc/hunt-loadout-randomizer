import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tooltip]',
})
export class TooltipDirective {
  public shown: boolean = false;
  private readonly _renderer: Renderer2;
  private readonly _el: ElementRef<any>;
  private _tooltip?: HTMLSpanElement;

  @Input('tooltip') tooltipTitle: string = '';

  constructor(el: ElementRef, renderer: Renderer2) {
    this._el = el;
    this._renderer = renderer;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.shown) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.shown) {
      this.hide();
    }
  }

  private show() {
    this.shown = true;

    this._tooltip = this._renderer.createElement('span');
    this._tooltip!.innerText = this.tooltipTitle;
    this._tooltip!.classList.add('tooltip');
    setTimeout(() => {
      this._tooltip!.classList.add('visible');
    }, 1);
    this._renderer.appendChild(document.body, this._tooltip!);

    const hostPos = this._el.nativeElement.getBoundingClientRect();

    const tooltipPos = this._tooltip!.getBoundingClientRect();

    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const top = hostPos.top - tooltipPos.height - 10;
    let left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    const tooRight =
      this._tooltip?.clientWidth! + 75 + left - document.body.clientWidth;
    if (tooRight > 0) {
      left -= tooRight;
    }

    if (left < 75) {
      left = 75;
    }

    this._renderer.setStyle(this._tooltip, 'top', `${top + scrollPos}px`);
    this._renderer.setStyle(this._tooltip, 'left', `${left}px`);
  }

  private hide() {
    const toRemove = this._tooltip;
    this._renderer.removeClass(toRemove, 'visible');
    this.shown = false;
    setTimeout(() => {
      this._renderer.removeChild(document.body, toRemove);
    }, 500) as any;
  }
}
