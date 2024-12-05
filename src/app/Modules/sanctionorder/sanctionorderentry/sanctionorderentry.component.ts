import { sanction_order } from './../../../shared/constants/constant';
import { Component, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/Ui-Component/BaseComponent';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { DropdownOption } from '../../../shared/Models/DropdownOptions';
import { FinancialYear } from '../../../shared/Models/FinancialYear';
import { sanctionorder } from '../../../shared/Models/saanctionorder';
import { SanctionorderService } from '../../../shared/Services/sanctionorder.service';
import { sanctiondetails } from '../../../shared/Models/sanctiondetails';
import { component, Scheme } from '../../../shared/Models/scheme';

@Component({
  selector: 'app-sanctionorderentry',
  templateUrl: './sanctionorderentry.component.html',
  styleUrl: './sanctionorderentry.component.css',
})
export class SanctionorderentryComponent extends BaseComponent  implements OnInit
{
  form: UntypedFormGroup;
  SanctionOrder: sanctionorder;
  //scheme: Scheme[] = [];
 // finyear: FinancialYear[] = [];
  //component: component[] = [];
  isOpen = false;
  tablegroup: boolean = false;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  financialYears: Array<{ id: number, name: string }> = [];
  schemename:  Array<{ id: number, name: string }> = [];
  componentname:Array<{id:number,name:string}>=[];
//  selectedFinYear = new FormControl('selectedFinYear');


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
        console.log(data);
        this.schemename = data.map((item: any) => ({ id: item.id, name: item.schemename }));
       console.log(this.schemename);
      
       this.loadComponent(this.id);
      },
      error: (err) => {
        console.error('Error fetching dropdown items', err);
      },
    });
  }

  loadComponent(scheme: number):void{
    this.service.getComponent(scheme).subscribe({
      next: (data) => {
        console.log(data);
        this.componentname = data.map((item: any) => ({ id: item.id, name: item.componentname }));
        console.log(this.componentname);
      },
      error: (err) => {
        console.error('Error fetching dropdown items', err);
      },
    });
  }
  // loadComponent(scheme: number) {
  //   this.service.getComponent(scheme).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.component = data;
  //       console.log(this.component);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching dropdown items', err);
  //     },
  //   });
  // }

  loadDropdownItems(): void {
    this.service.getFinancialYear().subscribe({
      next: (data) => {
        this.financialYears = data.map((item: any) => ({ id: item.id, name: item.financialYear }));
      },
      error: (err) => {
        console.error('Error fetching dropdown items', err);
      }
    });
  }

  // loadDropdownItems() {
  //   this.service.getFinancialYear().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.finyear = data;
  //       console.log(this.finyear);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching dropdown items', err);
  //     },
  //   });
  // }

  // ddlfinyearchange(finyear: any): void {
  //   this.isOpen = !this.isOpen;
  //   const selectedFinyear = finyear.target.value; // Get the selected finyear value (item id)
  //   console.log('Selected Finyear:', selectedFinyear);
  // }

  onDropdownChange(selectedValue: string | number): void {
debugger;
    console.log('Selected Finyear:', selectedValue);
    const selectedItem = this.financialYears.find(item => item.name);
    const selectedLabel = selectedItem ? selectedItem.name : null; 
    console.log('Selected Financial Year Label:', selectedLabel);

  }

  ddlSchemeChange(schemeid: string | number): void {
    console.log('Selected Finyear:', schemeid);
    // this.isOpen = !this.isOpen;
    const selectedItem = this.schemename.find(item => item.name);
    const selectedLabel = selectedItem ? selectedItem.name : null; // Get the selected scheme value (item id)
    console.log('Selected Financial Year Label:', selectedLabel);
  //  this.loadComponent(schemeid);
  }

  ddlComponentChange(componentid: any): void {
    this.isOpen = !this.isOpen;
    this.tablegroup = true;
    const selectedcomponent = componentid.target.value; // Get the selected component value (item id)
    console.log('Selected Scheme:', selectedcomponent);
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
    if (this.form.valid) {
      this.sweetservice.showConfirmation(
        'Confirmation',
        'Are you sure you want to save this data?',
        'Save',
        'Cancel',
        'warning'
      ).then((result) => {
        if (result.isConfirmed) {
          const utypeid = localStorage.getItem('utypeid');
          const ulbid = localStorage.getItem('ulbid');
          const payload = { ...this.form.value, utypeid: utypeid, ulbid: ulbid };
  
          this.service.createsanctioorder(payload).subscribe({
            next: (response) => {
              console.log(response);
              this.sweetservice.showSuccess('Saved Successfully!').then(() => {
                // Navigate to another page after success
                this.router.navigate(['/sanction-order/sanction-order-inbox']); 
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
    }
  }
  


}
