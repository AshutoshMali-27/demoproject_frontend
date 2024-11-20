
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
  imports:[CommonModule, FormsModule]
})
export class DropdownComponent  {
  @Input() items: { value: any; label: string }[] = [];
  @Input() selectedValue: any;
  @Output() valueChanged = new EventEmitter<any>();

  onValueChange(newValue: any): void {
    this.valueChanged.emit(newValue);
  }
}


