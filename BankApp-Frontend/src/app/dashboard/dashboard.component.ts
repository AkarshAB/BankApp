import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  deleteConfirm : boolean = false

  acno:any = '' //for parent child data communication

  logoutSuccess: boolean = false;

  transferSuccess: string = '';
  transferError: string = '';
  success: any;

  user: string = '';
  balance: any = '';
  currentAcno: string = '';

  isCollapse: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.user = localStorage.getItem('currentUser') || '';
    }
    // if(localStorage.getItem('currentBalance')){
    //   this.balance = localStorage.getItem('currentBalance') || ''
    // } 
    //this was no longer needed

    if (localStorage.getItem('currentAcno')) {
      this.currentAcno = localStorage.getItem('currentAcno') || ''; //currentAcno assigning to a var
    }
  }
  fundTransferForm = this.fb.group({
    creditAcno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
  })

  collapse() {
    this.isCollapse = !this.isCollapse;
  }

  dashboardForm() {
    //fundtransfer
    if (this.fundTransferForm.valid) {
      console.log('inside fundTransfer API');

      let creditAcno = this.fundTransferForm.value.creditAcno
      let password = this.fundTransferForm.value.password
      let amount = this.fundTransferForm.value.amount
      this.api.fundtransfer(creditAcno, password, amount).subscribe((result: any) => {
        console.log(result);
        this.transferSuccess = result.message;
        this.success = true



      }, (result: any) => {
        console.log(result.error.message);
        this.transferError = result.error.message
        this.success = false

      })
    }
    else {
      alert('plaese enter valid parameters')
    }
  }

  //reset button
  reset() {
    this.fundTransferForm.reset()
    this.success = ''
  }
  //close button
  // close(){
  //   this.router.navigateByUrl('/home')
  // }

  getBalance() {
    this.api.getBalance(this.currentAcno).subscribe((result: any) => {
      this.balance = result.balance
    },
      (result) => {
        alert(result.error.message)
      })
  }

  logout() {
    this.logoutSuccess = true;
    setTimeout(() => {
      this.router.navigateByUrl('')
      localStorage.clear()
    },1000)


  }

  deleteAccount(){
    this.acno = localStorage.getItem('currentAcno') //1

    this.deleteConfirm = true
  }

  cancelDeleteConfirm(){
    this.acno = ''
    this.deleteConfirm = false
  }

}
