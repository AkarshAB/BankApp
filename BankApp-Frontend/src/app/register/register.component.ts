import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationError: string = '';
  registerSuccess:string = '';

  constructor(private fb: FormBuilder, private api: ApiService, private loginRouter: Router) { }

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  //from control passed to html form
  register() {

    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      let username = this.registerForm.value.username;
      let acno = this.registerForm.value.acno;
      let password = this.registerForm.value.password;
      console.log(username, acno, password);
      // alert('Register  clicked');

      this.api.register(username, acno, password).subscribe((response: any) => {
        console.log(response.message);
        alert('Registration Successful')
        this.registerSuccess = response.message;
        setTimeout(() => {
          this.loginRouter.navigateByUrl('')
        },2000)
        // this.loginRouter.navigateByUrl('');

      },
      (response:any) => {
        this.registrationError = response.error.message //error Message
        setTimeout(() => {
          this.registerForm.reset();
          this.registrationError = '';
        },3000)
      }
      )
    }
    else {
      alert('Invalid form')
    }


  }
}
