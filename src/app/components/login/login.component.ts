import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LoginUser } from 'src/app/interfaces/login-register.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logged: boolean = false;

  err: string | undefined

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    let data: LoginUser = {
      email: form.value.email,
      password: form.value.password
    }
    this.authSrv.login(data).pipe(catchError(err => {
      if (err.error == "Cannot find user") {
        this.err = `Utente non registrato`
      } else if (err.error == "Incorrect password") {
        this.err = `Password errata`
      } else if (err.error == "Email format is invalid") {
        this.err = `Formato email errato`
      }
      throw err
    })).subscribe(res => {
      this.router.navigate(['/'])
      // this.logged= localStorage.getItem('user')!== undefined || localStorage.getItem('user')!== null;
    })
  }




}
