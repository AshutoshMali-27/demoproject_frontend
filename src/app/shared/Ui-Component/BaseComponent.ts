import { Injector } from "@angular/core";
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../Services/authentication.service";
import { LoaderService } from "../Services/loader.service";
import { ActiveToast, ToastrService } from "ngx-toastr";
import { StorageService } from "../Services/storage.service";
import { SweetalertService } from "../Services/sweetalert.service";
import { Location } from "@angular/common";

export abstract class BaseComponent{

    //isMobileDevoce=window.innerWidth<760;
    router:Router;
    isLoading=false;
    isLoggedIn=false;
    isSidebarCollapsed=false;
    activateRouter:ActivatedRoute;
    userPermissionList:string|any[]=null;
    fb:UntypedFormBuilder;
    authservice: AuthenticationService;
    storageservice:StorageService
    LoadingService:LoaderService;
	notifyService: ToastrService;
    sweetservice:SweetalertService;
    location: Location // Add location service

    NOTIFICATION_Types={
        INFO:"info",
        ERROR:"error",
        WARNING:"warning",
        SUCCESS:"success",
    };


    constructor(injector:Injector){

        this.router=injector.get(Router);
        this.authservice=injector.get(AuthenticationService);
        this.notifyService=injector.get(ToastrService);
        this.sweetservice=injector.get(SweetalertService);
        this.location = injector.get(Location); 
        this.activateRouter=injector.get(ActivatedRoute);
        this.LoadingService=injector.get(LoaderService);
        this.fb=injector.get(UntypedFormBuilder);
        
        this.authservice.authStatus.subscribe((isLoggedIn)=>{
            this.isLoggedIn=isLoggedIn;
        });
     
       
    }

    ValidateFormFields(form:UntypedFormGroup |UntypedFormArray):void{
        Object.keys(form.controls).forEach(field=>{
            const control=form.get(field);
            if(control instanceof UntypedFormControl){
                control.markAsTouched();
				control.updateValueAndValidity(); 
            }
            else if (control instanceof UntypedFormGroup) {
				this.ValidateFormFields(control);
			}
            else if(control instanceof UntypedFormArray){
                Object.keys(control.controls).forEach(index=>{
                    if(control instanceof UntypedFormControl){
                        control.markAsTouched();
                        control.updateValueAndValidity();
                    }else{
                        this.ValidateFormFields(control.get(index) as UntypedFormGroup);
                    }
                })
            }
        })
    }

    
    notify(message: string, type = this.NOTIFICATION_Types.SUCCESS, title = "", override = {}): ActiveToast<any> {
		switch (type) {
			default:
				return this.notifyService.success(message, title ?? "Success", override);
			case this.NOTIFICATION_Types.ERROR:
				return this.notifyService.error(message, title ??  "Error", override);
			case this.NOTIFICATION_Types.INFO:
				return this.notifyService.info(message, title ?? "Info", override);
			case this.NOTIFICATION_Types.WARNING:
				return this.notifyService.warning(message, title ?? "Warning", override);
		}
	}

    showAlert(
        message: string,
        type = this.NOTIFICATION_Types.SUCCESS,
        title = '',
        confirmButtonText = 'OK',
        cancelButtonText = 'Cancel',
        showCancelButton = false
      ): void {
        switch (type) {
          case this.NOTIFICATION_Types.SUCCESS:
            this.sweetservice.showSuccess(title, message, confirmButtonText);
            break;
          case this.NOTIFICATION_Types.ERROR:
            this.sweetservice.showError(title, message, confirmButtonText);
            break;
          case this.NOTIFICATION_Types.INFO:
            this.sweetservice.showInfo(title, message, confirmButtonText);
            break;
          case this.NOTIFICATION_Types.WARNING:
            this.sweetservice.showWarning(title, message, confirmButtonText);
            break;
          default:
            if (showCancelButton) {
              this.sweetservice.showConfirmation(
                title,
                message,
                confirmButtonText,
                cancelButtonText
              );
            } else {
              this.sweetservice.showAlert(title, message, 'info', confirmButtonText);
            }
        }
      }

    toggleSidebar(){
		console.log("testing", this.isSidebarCollapsed);
		this.isSidebarCollapsed = !this.isSidebarCollapsed;
	}


  goBack(): void {
    this.location.back(); // Navigate to the previous route
  }

    logout(): void {
      
		this.authservice
			.logout()
			.subscribe()
			.add(() => {
				this.authservice.clearUserSession();
                
				setTimeout(() => {
					this.router.navigate(["/"]);
				}, 10);
			});
	}

    setLoader(value:boolean) {
		this.isLoading = value;
	}
}