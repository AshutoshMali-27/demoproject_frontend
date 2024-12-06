
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-contolcontainer2',
  standalone: true,
  imports: [NgClass, NgIf, ErrorComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Contolcontainer2Component,
      multi: true,
    },
  ],
  templateUrl: './contolcontainer2.component.html',
  styleUrl: './contolcontainer2.component.css'
})
export class Contolcontainer2Component implements OnInit, ControlValueAccessor {
  control: AbstractControl | null = null;

  @Input() name: string = '';
  @Input() label: string = '';
  @Input() errorMsg: string = 'An error occurred';
  @Input() tooltipText: string | null = null;
  @Input() isReadOnly = false;
  @Input() isLabelOnSameLine = false;

  required = false;
  isDisabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  get status() {
    return this.control?.validator?.(this.control)?.['required'] || false;
  }

  ngOnInit() {
    if (this.controlContainer) {
      if (this.name) {
        this.control = this.controlContainer.control?.get(this.name);
        if (this.control?.validator) {
          const validator = this.control.validator(this.control);
          if (validator?.['required']) {
            this.required = true;
          }
        }
      } else {
        console.warn('Missing FormControlName directive from host element of the component');
      }
    } else {
      console.warn('Cannot find parent FormGroup directive');
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (this.control) {
      this.control.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
