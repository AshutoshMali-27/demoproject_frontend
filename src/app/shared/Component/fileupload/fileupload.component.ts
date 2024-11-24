import { Component, EventEmitter, forwardRef, Injector, Input, Output } from '@angular/core';
import { BaseComponent } from '../../Ui-Component/BaseComponent';
import { ApiService } from '../../Services/api.service';
import { forkJoin } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileuploadComponent),
      multi: true,
    },
  ],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.css'
})
export class FileuploadComponent  extends BaseComponent{

  @Input() uploadUrl: string = ''; // URL endpoint for upload
  @Input() multiple: boolean = false; // Whether multiple files are allowed
  @Output() uploadComplete = new EventEmitter<any>(); // Event emitted on completion

  files: File[] = [];

  constructor(injector:Injector,private service:ApiService){
    super(injector);
  }

  onFilesSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.files = Array.from(target.files);
    }
  }

  onUpload(): void {
    if (!this.files.length) {
      console.warn('No files selected');
      return;
    }

    const uploadObservables = this.files.map(file =>
      this.service.upload(this.uploadUrl, file)
    );

    if (this.multiple) {
      forkJoin(uploadObservables).subscribe({
        next: (responses) => {
          console.log('All files uploaded successfully', responses);
          this.uploadComplete.emit(responses);
        },
        error: (error) => {
          console.error('Error during file upload', error);
        },
      });
    } else {
      // Handle single file upload
      uploadObservables[0].subscribe({
        next: (response) => {
          console.log('File uploaded successfully', response);
          this.uploadComplete.emit(response);
        },
        error: (error) => {
          console.error('Error during file upload', error);
        },
      });
    }
  }


}
