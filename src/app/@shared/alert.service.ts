import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showAlert(title: string, msg: string, icon: SweetAlertIcon) {
    Swal.fire(title, msg, icon);
  }
}
