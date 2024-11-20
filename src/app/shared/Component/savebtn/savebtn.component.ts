import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-savebtn',
  standalone: true,
  imports: [],
  templateUrl: './savebtn.component.html',
  styleUrl: './savebtn.component.css'
})
export class SavebtnComponent {

  @Input() label: string = 'Save';
  @Input() disabled: boolean = false;
  @Input() buttonClass: string = '';
  @Input() backgroundColor: string = '';
  @Input() color: string = '';
  
  @Output() saveClicked = new EventEmitter<void>();

  // Method to handle the click event
  onClick(): void {
    if (!this.disabled) {
      this.saveClicked.emit();
    }
  }
}
