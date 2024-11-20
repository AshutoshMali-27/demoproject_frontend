    import {  UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
    export class sanctionorder{
        FinancialYearId: string;
        schemeid:string;
        componentid:number;    
        sanctionAmount: number;
        expenditureAmount:number;
        balanceAmount:number;
        utypeid:number;
        ulbid:number;

        constructor(paramObject:object){
            return Object.assign(this,paramObject);
        }


        
        static getForm(Sanctionorder: sanctionorder): UntypedFormGroup{

            return new UntypedFormBuilder().group({
            
        
                FinancialYearId:[Sanctionorder.FinancialYearId || null,[Validators.required]],
                schemeid:[Sanctionorder.schemeid || null,[Validators.required]],
                componentid:[Sanctionorder.componentid || null,[Validators.required]],
        
                sanctionAmount:[Sanctionorder.sanctionAmount ],
                expenditureAmount:[Sanctionorder.expenditureAmount ],
                balanceAmount:[Sanctionorder.balanceAmount ],
                utypeid:[Sanctionorder.utypeid || null],
                ulbid:[Sanctionorder.ulbid || null],
        
            }
        )
        
        }

    }