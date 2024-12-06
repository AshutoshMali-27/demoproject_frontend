import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() items: Array<{ id: number | string; name: string }> = [];
  @Input() placeholder: string = 'Choose an option';
  @Input() formControl: FormControl = new FormControl();
  @Output() valueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

  value: string | number | null = null;
  isDisabled: boolean = false; // Track the disabled state

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() {}

  ngOnInit(): void {}

  // Update the view when the model changes
  writeValue(value: string | number | null): void {
    this.value = value;
  }

  // Register a change callback
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register a touched callback
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Handle the disabled state
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Handle value change in the dropdown
  onValueChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = selectedValue;
    this.onChange(selectedValue); // Notify Angular form control about the change
    this.onTouched(); // Mark as touched
    this.valueChange.emit(selectedValue); // Emit custom event
  }
}
