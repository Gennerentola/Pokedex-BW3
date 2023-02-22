import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser, LoginUser, RegisterUser } from '../interfaces/login-register.interface';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    jwtHelper = new JwtHelperService()
    private authSubj = new BehaviorSubject<null | AuthUser>(null);
    user$ = this.authSubj.asObservable();



    timeoutLogout: any


    constructor(private http: HttpClient, private router: Router) {
        this.restore()
    }

    signUp(data: RegisterUser) {
        return this.http.post<AuthUser>('http://localhost:4201/register', data).pipe(tap((res) => {
            this.authSubj.next(res);
            localStorage.setItem('user', JSON.stringify(res))
            // this.router.navigate(['/'])
            window.location.href = 'http://localhost:4200';
        }))
    }

    login(data: LoginUser) {
        return this.http.post<AuthUser>('http://localhost:4201/login', data).pipe(catchError(err => {
            throw err
        }), tap((res) => {
            this.authSubj.next(res);
            localStorage.setItem('user', JSON.stringify(res))
            // this.router.navigate(['/'])
            window.location.href = 'http://localhost:4200';
        }))
    }

    logout() {
        this.authSubj.next(null);
        localStorage.removeItem('user')
        if (this.timeoutLogout) {
            clearTimeout(this.timeoutLogout)
        }
        // this.router.navigate(['/login'])
        window.location.href = 'http://localhost:4200';
    }

    autoLogout(data: AuthUser) {
        const exDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
        const exMs = exDate.getTime() - new Date().getTime()
        this.timeoutLogout = setTimeout(() => {
            this.logout()
        }, exMs);
    }

    restore() {
        const user = localStorage.getItem('user');
        if (!user) {
            return;
        }
        const userdata: AuthUser = JSON.parse(user);
        if (this.jwtHelper.isTokenExpired(userdata.accessToken)) {
            return
        }
        this.authSubj.next(userdata)
        this.autoLogout(userdata)
    }

    changeUsername(name: string) {
        return this.http.patch(environment.api + "/users/" + this.authSubj.value?.user.id, {"name": name})
    }

    changeUserEmail(email: string) {
        return this.http.patch(environment.api + "/users/" + this.authSubj.value?.user.id, {"email": email})
    }
}
