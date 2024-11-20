import { sanction_order } from './../../../shared/constants/constant';
import { Component, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/Ui-Component/BaseComponent';
import { UntypedFormGroup } from '@angular/forms';
import { DropdownOption } from '../../../shared/Models/DropdownOptions';
import { FinancialYear } from '../../../shared/Models/FinancialYear';
import { sanctionorder } from '../../../shared/Models/saanctionorder';
import { SanctionorderService } from '../../../shared/Services/sanctionorder.service';
import { sanctiondetails } from '../../../shared/Models/sanctiondetails';
import { component, Scheme } from '../../../shared/Models/scheme';


@Component({
  selector: 'app-sanctionorderentry',
  templateUrl: './sanctionorderentry.component.html',
  styleUrl: './sanctionorderentry.component.css'
})
export class SanctionorderentryComponent extends BaseComponent implements OnInit {

    form:UntypedFormGroup;
    SanctionOrder:sanctionorder;
    scheme:Scheme[]=[];
    finyear: FinancialYear[] = [];
    component:component[]=[];
    selectedItem: any;
    isOpen = false;
    tablegroup:boolean=false;

    constructor(injector:Injector,private service:SanctionorderService){
      super(injector);
    }

    ngOnInit(): void {
     this.form = sanctionorder.getForm(new sanctionorder(this.SanctionOrder));

      this.loadDropdownItems();
      this.loadSchemes();

    }

        loadSchemes(){
    this.service.getScheme().subscribe({
      next: (data) => {
    console.log(data);
    this.scheme=data;
    console.log(this.scheme);
      },
      error:err=>{
        console.error('Error fetching dropdown items', err);
      }
    });

    }
    loadComponent(scheme :number ){
      
      this.service.getComponent(scheme).subscribe({
        next: (data) => {
      console.log(data);
      this.component=data;
      console.log(this.component);
        },
        error:err=>{
          console.error('Error fetching dropdown items', err);
        }
      });
    }


    loadDropdownItems() {
      this.service.getFinancialYear().subscribe({

        next:(data) => {
          debugger;
          console.log(data);
          this.finyear = data;
          console.log(this.finyear);
        },
        error:err => {
          console.error('Error fetching dropdown items', err);
        }
    });
    }

    ddlfinyearchange(finyear: any): void {
      debugger;
      this.isOpen = !this.isOpen;
      const selectedFinyear = finyear.target.value;  // Get the selected finyear value (item id)
      console.log('Selected Finyear:' ,selectedFinyear);
    
    }

    ddlSchemeChange(schemeid: any): void {
      debugger;
      this.isOpen = !this.isOpen;
      const selectedscheme = schemeid.target.value;  // Get the selected scheme value (item id)
      console.log('Selected Scheme:' ,selectedscheme);
      this.loadComponent(selectedscheme);
    
    }
   
    ddlComponentChange(componentid: any): void {
      debugger;
      this.isOpen = !this.isOpen;
      this.tablegroup= true;
      const selectedcomponent = componentid.target.value;  // Get the selected component value (item id)
      console.log('Selected Scheme:' ,selectedcomponent);
      this.fetchSanctionOrderAmounts();
    
    }

    fetchSanctionOrderAmounts(){
      this.service.getSanctionDetails().subscribe({
        next:(data)=>{

          console.log(data);
          this.form.patchValue({
            sanctionAmount:data[0].sanctionAmount,
            expenditureAmount: data[0].expenditureAmount,
            balanceAmount: data[0].balanceAmount
          });
          console.log('Form values after patchValue:', this.form.value); 
        },
        error:err=>{
          console.error('Error fetching data', err);
        }
      })
    }



  onSubmit(){
    debugger;
    if (this.form.valid) {
    const utypeid = localStorage.getItem('utypeid');
    const ulbid = localStorage.getItem('ulbid');
    const payload = {...this.form.value,utypeid: utypeid,ulbid: ulbid };
			this.service.createsanctioorder(payload).subscribe({

				next: () => {
					this.notify("save successfully!");
					
				},
				error: err => {
					this.notify(`error while saving! ${err?.error?.text}`, this.NOTIFICATION_Types.ERROR);
				}
			}).add(() => {
				
			});
		} else {
			this.ValidateFormFields(this.form);
		}
  }



  



}
