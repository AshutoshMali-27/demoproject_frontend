import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
export class Userinfo{
    id:number;
    username: string;
    password:string;
    utypeId:number;
    employeeName:string;
    approvalStatus:number;
    isActive:number;
    ulbid:number


    constructor(paramObject:object){
        return Object.assign(this,paramObject);
    }


    
    static getForm(Userinfo: Userinfo): UntypedFormGroup{

        return new UntypedFormBuilder().group({
            id:[Userinfo.id || null,[Validators.required]],
            username:[Userinfo.username || null,[Validators.required]],
            password:[Userinfo.password || null ,[Validators.required]],
            utypeId:[Userinfo.utypeId || null ,[Validators.required]],
            employeeName:[Userinfo.employeeName || null ,[Validators.required]],
            approvalStatus:[Userinfo.approvalStatus || null ,[Validators.required]],
            isActive:[Userinfo.isActive || null ,[Validators.required]],
            ulbid:[Userinfo.ulbid || null ,[Validators.required]],

        })
    }

}