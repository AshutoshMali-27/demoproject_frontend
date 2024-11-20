import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [

  
	{
		path:"",
		component:AuthComponent,
		children:[

			{
				path:"login",
				component:LoginComponent,
				canActivate: [AuthGuard],
				title:"DemoProject Login"
			}
		]
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
