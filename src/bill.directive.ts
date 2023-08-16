import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[bill]'
})
export class MyDirective {
  constructor() {}

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    // Your event handling code here
  }
}
