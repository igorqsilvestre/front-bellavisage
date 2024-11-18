import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css'
})
export class AlertModalComponent{
  @Input() type = 'success';
  @Input() message: string = '';
  @Input() navegar: {estado:boolean, url:string} = {estado:false, url:''};

  constructor(private bsModalRef: BsModalRef, private route:Router) { }

  ngOnInit() {
  }

  onClose() {
    setTimeout(() => {
      this.bsModalRef.hide();
      if(this.navegar.estado){
        this.route.navigate([`${this.navegar.url}`]);
      }
    }, 500);
  }
}
