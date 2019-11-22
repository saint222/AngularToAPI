import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
this.renderer.setStyle(this.elRef.nativeElement, 'padding-top', '3%'),
this.renderer.setStyle(this.elRef.nativeElement, 'padding-bottom', '3%'),
this.renderer.setStyle(this.elRef.nativeElement, 'text-align', 'center')
  }
}
