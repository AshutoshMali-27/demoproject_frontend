
import { Component, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/Ui-Component/BaseComponent';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { sanctionorder } from '../../../shared/Models/saanctionorder';
import { SanctionorderService } from '../../../shared/Services/sanctionorder.service';
@Component({
  selector: 'app-sanctionorderentry',
  templateUrl: './sanctionorderentry.component.html',
  styleUrl: './sanctionorderentry.component.css',
})
export class SanctionorderentryComponent extends BaseComponent implements OnInit
{
  form: UntypedFormGroup;
  SanctionOrder: sanctionorder;
  tablegroup: boolean = false;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  financialYears: Array<{ id: number; name: string }> = [];
  schemename: Array<{ id: number; name: string }> = [];
  componentName: Array<{ id: number; name: string }> = [];

  constructor(injector: Injector, private service: SanctionorderService) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = sanctionorder.getForm(new sanctionorder(this.SanctionOrder));
    this.loadDropdownItems();
    this.loadSchemes();
  }

  loadSchemes(): void {
    this.service.getScheme().subscribe({
      next: (data) => {
        this.schemename = data.map((item: any) => ({
          id: item.id,
          name: item.schemename,
        }));
      },
      error: (err) => {
        console.error('Error fetching dropdown items', err);
      },
    });
  }

  loadComponent(schemeid: any): void {
    this.service.getComponent(schemeid).subscribe({
      next: (data) => {
        this.componentName = data.map((item: any) => ({
          id: item.id,
          name: item.componentName,
        }));
      },
      error: (err) => {
        console.error('Error fetching dropdown items', err);
      },
    });
  }

  loadDropdownItems(): void {
    this.service.getFinancialYear().subscribe({
      next: (data) => {
        this.financialYears = data.map((item: any) => ({
          id: item.id,
          name: item.financialYear,
        }));
      },
      error: (err) => {
        console.error('Error fetching dropdown items', err);
      },
    });
  }

  onDropdownChange(selectedValue: string | number): void {
    console.log('Selected Finyear:', selectedValue);
    const selectedItem = this.financialYears.find((item) => item.name);
    const selectedLabel = selectedItem ? selectedItem.name : null;
    console.log('Selected Financial Year Label:', selectedLabel);
  }

  ddlSchemeChange(schemeid: any): void {
    console.log('Selected Finyear:', schemeid);
    const selectedItem = this.schemename.find((item) => item.name);
    const selectedLabel = selectedItem ? selectedItem.name : null;
    console.log('Selected Financial Year Label:', selectedLabel);
    this.loadComponent(schemeid);
  }

  ddlComponentChange(component: any): void {
    console.log('Selected Finyear:', component);
    const selectedItem = this.componentName.find((item) => item.name);
    const selectedLabel = selectedItem ? selectedItem.name : null;
    console.log('Selected Financial Year Label:', selectedLabel);
    this.tablegroup = true;
    this.fetchSanctionOrderAmounts();
  }

  fetchSanctionOrderAmounts() {
    this.service.getSanctionDetails().subscribe({
      next: (data) => {
        console.log(data);
        this.form.patchValue({
          sanctionAmount: data[0].sanctionAmount,
          expenditureAmount: data[0].expenditureAmount,
          balanceAmount: data[0].balanceAmount,
        });
        console.log('Form values after patchValue:', this.form.value);
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
    });
  }

  onUploadComplete(fileupload: any): void {
    console.log('Upload complete:', fileupload);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.form.get('fileControl')?.setValue(this.selectedFile);
      this.uploadFile();
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile);
      // alert('File uploaded successfully!');
      this.sweetservice.showSuccess('File uploaded successfully!').then(() => {
        // console.log('Login Response:', response);
      });
      //this.clearFile();
    }
  }
  clearFile(): void {
    this.selectedFile = null;
    this.selectedFileName = null;
    this.form.get('fileControl')?.reset();
  }

  onSubmit() {
    debugger;
    if (this.form.valid) {
      this.sweetservice
        .showConfirmation(
          'Confirmation',
          'Are you sure you want to save this data?',
          'Save',
          'Cancel',
          'warning'
        )
        .then((result) => {
          if (result.isConfirmed) {
            const utypeid = localStorage.getItem('utypeid');
            const ulbid = localStorage.getItem('ulbid');
            const payload = {
              ...this.form.value,
              utypeid: utypeid,
              ulbid: ulbid,
            };

            this.service.createsanctioorder(payload).subscribe({
              next: (response) => {
                console.log(response);
                this.sweetservice
                  .showSuccess('Saved Successfully!')
                  .then(() => {
             
                    this.router.navigate([
                      '/sanction-order/sanction-order-inbox',
                    ]);
                  });
              },
              error: (err) => {
                this.notify(
                  `Error while saving! ${err?.error?.text}`,
                  this.NOTIFICATION_Types.ERROR
                );
              },
            });
          } else {
            console.log('User canceled the action.');
          }
        });
    }else{
      this.sweetservice.showError('Fill all Field to submit')
                  .then(() => {
             
                 
                  });
    }
  }
}
