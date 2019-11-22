import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appContainer]'
})
export class ContainerDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.elRef.nativeElement, 'max-width', '700px'),
      this.renderer.setStyle(this.elRef.nativeElement, 'margin', '5% auto');
  }
}
