import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }
  showAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon = 'info',
    confirmButtonText: string = 'OK'
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
    });
  }

  /**
   * Displays a confirmation dialog with Yes/No options.
   */
  showConfirmation(
    title: string,
    text: string,
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'No',
    icon: SweetAlertIcon = 'warning'
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
    });
  }

  /**
   * Displays a success notification.
   */
  showSuccess(
    title: string,
    text: string = '',
    confirmButtonText: string = 'OK'
  ): Promise<SweetAlertResult<any>> {
    return this.showAlert(title, text, 'success', confirmButtonText);
  }

  /**
   * Displays an error notification.
   */
  showError(
    title: string,
    text: string = '',
    confirmButtonText: string = 'OK'
  ): Promise<SweetAlertResult<any>> {
    return this.showAlert(title, text, 'error', confirmButtonText);
  }

  /**
   * Displays a warning notification.
   */
  showWarning(
    title: string,
    text: string = '',
    confirmButtonText: string = 'OK'
  ): Promise<SweetAlertResult<any>> {
    return this.showAlert(title, text, 'warning', confirmButtonText);
  }

  /**
   * Displays an info notification.
   */
  showInfo(
    title: string,
    text: string = '',
    confirmButtonText: string = 'OK'
  ): Promise<SweetAlertResult<any>> {
    return this.showAlert(title, text, 'info', confirmButtonText);
  }
}
