import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
export class sanctiondetails{

    sanctionAmount: number;
     expenditureAmount:number;
     balanceAmount:number;



    constructor(paramObject:object){
        return Object.assign(this,paramObject);
    }


    
    static getForm(sanctiondetails: sanctiondetails): UntypedFormGroup{

        return new UntypedFormBuilder().group({
           //  sanctionnumber:[Sanctionorder.sanctionnumber || null],
            // amount:[Sanctionorder.amount || null,[Validators.required, Validators.pattern('^[0-9]+$')]],
             sanctionAmount:[sanctiondetails.sanctionAmount || null,[Validators.required, Validators.pattern('^[0-9]+$')]],
             expenditureAmount:[sanctiondetails.expenditureAmount || null,[Validators.required, Validators.pattern('^[0-9]+$')]],
             balanceAmount:[sanctiondetails.balanceAmount || null,[Validators.required, Validators.pattern('^[0-9]+$')]],
            // uploadFile:[Sanctionorder.uploadFile || null,[Validators.required]],
        }
    )
    
    }

}