import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { ControlContainer, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlcontainersComponent } from './Component/controlcontainers/controlcontainers.component';
import { CardsComponent } from './Component/cards/cards.component';
import { SavebtnComponent } from './Component/savebtn/savebtn.component';
import { ApplogoComponent } from './Component/applogo/applogo.component';
import { RouterModule } from '@angular/router';
import { PopoversComponent } from './popovers/popovers.component';
import { Card2Component } from './Component/card2/card2.component';
import { ModelpopupComponent } from './Component/modelpopup/modelpopup.component';
import { HideifemptyDirective } from './Directive/hideifempty.directive';
import { DropdownComponent } from './Component/dropdown/dropdown.component';
import { FileuploadComponent } from './Component/fileupload/fileupload.component';
import { NgDatagridComponent } from './Component/ng-datagrid/ng-datagrid.component';
import { ToggleThemeComponent } from './Layout/toggle-theme/toggle-theme.component';



const COMMON_STANDALONE_COMP_LIST: any[] | Type<any> = [
  HeaderComponent,
  FooterComponent,
  CardsComponent,
  ApplogoComponent,
  PopoversComponent,
  Card2Component,
  HideifemptyDirective,
  DropdownComponent,
  SavebtnComponent,
  ControlcontainersComponent,
  ToggleThemeComponent,
  FileuploadComponent,
  NgDatagridComponent,
  HideifemptyDirective,
  
  
];


@NgModule({
  
  declarations: [



  ],
  imports: [
    COMMON_STANDALONE_COMP_LIST,
    CommonModule,
   FormsModule,
   ReactiveFormsModule,
   RouterModule,
   ReactiveFormsModule
  ],
  exports:[
    COMMON_STANDALONE_COMP_LIST,
   ReactiveFormsModule
  ],
  providers: [],

})
export class SharedModule { }
