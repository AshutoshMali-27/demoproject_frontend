import { Component ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
  styleUrl: './card2.component.css'
})
export class Card2Component {

  @Output() back = new EventEmitter<void>();

  onBackClick() {
    this.back.emit();
  }
}
