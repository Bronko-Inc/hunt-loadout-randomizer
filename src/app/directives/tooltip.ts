import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  public shown: boolean = false;
  private readonly _renderer: Renderer2;
  private readonly _el: ElementRef<any>;
  private _tooltip?: HTMLSpanElement;
  private _hideTimeout?: number;

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
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }
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
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    this._renderer.setStyle(this._tooltip, 'top', `${top + scrollPos}px`);
    this._renderer.setStyle(this._tooltip, 'left', `${left}px`);
  }
  private hide() {
    this._renderer.removeClass(this._tooltip, 'visible');
    this.shown = false;
    this._hideTimeout = setTimeout(() => {
      this._renderer.removeChild(document.body, this._tooltip);
      this._tooltip = undefined;
    }, 500) as any;
  }
}