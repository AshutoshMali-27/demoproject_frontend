import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHideifempty]'
})
export class HideifemptyDirective {

  constructor(private elementRef:ElementRef ) { }

  ngAfterViewInit(): void {
    if(this.elementRef.nativeElement.children.length === 0){
      this.elementRef.nativeElement.style.display="none";
    }
  }


}
