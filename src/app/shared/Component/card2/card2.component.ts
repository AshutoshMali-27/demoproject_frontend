import { Component, Output, EventEmitter, inject, Injector } from '@angular/core';
import { BaseComponent } from '../../Ui-Component/BaseComponent';

@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
  styleUrl: './card2.component.css',
  standalone: true,
  imports:[]
})
export class Card2Component extends BaseComponent {

  @Output() back = new EventEmitter<void>();

  onBackClick() {
    this.back.emit();
  }
constructor(inject:Injector){
  super(inject)
}

}
