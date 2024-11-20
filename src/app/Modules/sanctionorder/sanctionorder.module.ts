import { SanctionorderslipComponent } from './sanctionorderslip/sanctionorderslip.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanctionorderRoutingModule } from './sanctionorder-routing.module';

import { SanctionorderentryComponent } from './sanctionorderentry/sanctionorderentry.component';
import { SharedModule } from '../../shared/shared.module';
import { SanctionorderinboxComponent } from './sanctionorderinbox/sanctionorderinbox.component';
import { SanctionorderoutboxComponent } from './sanctionorderoutbox/sanctionorderoutbox.component';
import { HideifemptyDirective } from '../../shared/Directive/hideifempty.directive';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SanctionorderslipComponent,
    SanctionorderentryComponent,
    SanctionorderinboxComponent,
    SanctionorderoutboxComponent    
  ],
  imports: [
    CommonModule,
    SanctionorderRoutingModule,
    SharedModule,
    ReactiveFormsModule
    
  ]
})
export class SanctionorderModule { }
