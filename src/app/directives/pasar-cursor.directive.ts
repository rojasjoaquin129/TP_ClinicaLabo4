import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appPasarCursor]'
})
export class PasarCursorDirective {

  @HostListener('mouseenter') onMouseEnter(){
    this.ResaltarColor('#7c00ff');
    this.elemento.nativeElement.style.backgroundColor='#7c00ff'
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.ResaltarColor('');
    this.elemento.nativeElement.style.color='#000000';
  }
  constructor(private elemento:ElementRef) {

  }

  private ResaltarColor(color:string){
    this.elemento.nativeElement.style.backgroundColor =color;

    this.elemento.nativeElement.style.color='#ff0000';
  }
}
