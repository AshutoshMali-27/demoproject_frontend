import { Component, Injector } from '@angular/core';
import { BaseComponent } from '../../../shared/Ui-Component/BaseComponent';
import { AuthenticationService } from '../../../shared/Services/authentication.service';
import { UntypedFormGroup } from '@angular/forms';
import { Login } from '../../../shared/Models/Login';
import { SweetalertService } from '../../../shared/Services/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent extends BaseComponent {
  form: UntypedFormGroup;
  login: Login;
  isLogging = false;

  constructor(injector: Injector, private service: AuthenticationService) {
    debugger;
    super(injector);
  }

  ngOnInit(): void {
    this.form = Login.getForm(new Login(this.login));
  }

  onlogin(): void {
    this.LoadingService.setLoading(true);

    if (this.form.valid) {
      this.isLogging = true;

      const username = this.form.value.username;
      const password = this.form.value.password;
      console.log('Login attempted with:', { username, password });

      this.service
        .login(this.form.value)
        .subscribe({
          next: (response) => {
            this.service.setUserSession(response.user, response.token);

            this.sweetservice.showSuccess('Login Successful!').then(() => {
              console.log('Login Response:', response);

              this.notify(
                `Welcome back, ${username}!`,
                this.NOTIFICATION_Types.SUCCESS
              );
            });
          },
          error: (errorResponse) => {
            console.error('Error Logging in:', errorResponse);
            const errorMessage =
              errorResponse?.error?.text || 'An unexpected error occurred.';

            this.sweetservice.showError('Login Failed', errorMessage);
          },
        })
        .add(() => {
          this.isLogging = false;
          this.LoadingService.setLoading(false);
        });
    } else {
      this.sweetservice.showWarning(
        'Invalid Form',
        'Please fill in all required fields before submitting.'
      );
    }
  }
}
