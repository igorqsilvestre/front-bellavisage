import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() type: string = '';
  @Input() message: string = '';
  @Output() confirm: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

  onConfirm(): void {
    this.confirm.emit();
    this.bsModalRef.hide();
  }

  onCancel(): void {
    this.cancel.emit();
    this.bsModalRef.hide();
  }
}
