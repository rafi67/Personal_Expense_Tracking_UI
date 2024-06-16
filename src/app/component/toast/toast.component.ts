import { Component, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  constructor(private toastr: ToastrService) {}

  showSuccess(title: string, msg: string) : void {
    this.toastr.success(title, msg);
  } 

}
