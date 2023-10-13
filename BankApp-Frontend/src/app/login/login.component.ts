import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError : string = '';

  loginSuccess:boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService, private loginRouter:Router) { }
  loginForm = this.fb.group({
    // username: ['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  //from control passed to html form
  login() {

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let acno:any = this.loginForm.value.acno;
      let password:any = this.loginForm.value.password;
      console.log(acno, password);

      this.api.login(acno, password).subscribe((response: any) => {
        console.log(response); //login message

        this.loginSuccess = true

        //to set current user name into local storage
        localStorage.setItem('currentUser',response.currentUser)

        //to set currentBalance into local storage
        localStorage.setItem('currentBalance',response.currentBalance)

        //to set current acno into local storage
        localStorage.setItem('currentAcno',response.currentAcno)
        

        //to set token in localStorage
        localStorage.setItem('token',response.token)
        // alert('Login successful');

        setTimeout(() => {
          this.loginRouter.navigateByUrl('/home');
        },1500)

      },
      (response) => {
        this.loginError = response.error.message;

        setTimeout(() => {
          this.loginForm.reset ();
          this.loginError = '';
        },3000)
      })
    }
    else {
      alert('Invalid form')
    }


  }
}
