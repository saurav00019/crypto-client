import { Directive } from '@angular/core';


import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberValidate]'
})
export class NumberValidateDirective {
  constructor(private el: ElementRef) {  }

  @HostListener('input', ['$event']) onInputChange(event:any) {
 

    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      console.log("appNumberValidate")
      event.stopPropagation();
    }
  }
}
