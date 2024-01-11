import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject(localStorage.getItem('token'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue()
    {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.url}/auth/login`, { username, password })
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                // user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('token',user.data);
                this.currentUserSubject.next(user);
                return user;
            }));
    }
  
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}