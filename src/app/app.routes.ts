

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren:()=>import("./Modules/auth/auth.module").then(m=>m.AuthModule),
        title:"DemoProject"
      },
      
      
      {
        path: 'sanction-order',        
        canActivate: [AuthGuard],
        loadChildren: () => import('./Modules/sanctionorder/sanctionorder.module').then(m => m.SanctionorderModule)
      },
      {
        path: "dashboard1",
        loadChildren: () => import("./Modules/dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        title: "HrPhase Dashboard",
      },
      
      {
        path: "",
        redirectTo: 'auth/login',
        pathMatch: 'full'
      }
];
