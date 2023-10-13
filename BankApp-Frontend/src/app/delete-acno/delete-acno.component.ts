import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-acno',
  templateUrl: './delete-acno.component.html',
  styleUrls: ['./delete-acno.component.css']
})
export class DeleteAcnoComponent {

  @Input() deleteAcno:any

  //user defined event - onCancel
  @Output() onCancel = new EventEmitter()
  //it helps us to create a new user defined event

  cancel(){
    this.onCancel.emit() //Emits an event containing a given value
  }
}
