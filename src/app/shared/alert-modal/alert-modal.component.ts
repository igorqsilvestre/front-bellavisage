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

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  onClose() {
    this.bsModalRef.hide();
  }


}
