import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private EndPiont = environment.API_ENDPOINT + 'users/'

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    session(userId: string, accessToken: string, refreshToken: string) {
        localStorage.setItem('id', userId)
        localStorage.setItem('access-token', accessToken)
        localStorage.setItem('refresh-token', refreshToken)
    }

    removeSession() {
        localStorage.removeItem('id')
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
    }

    logout() {
        this.removeSession()
        this.router.navigate(['/login'])
    }

    getRefreshAccessToken() {
        return this.http.get(`${this.EndPiont}/me/access-token`, {
            headers: {
                'refresh-token': this.getRefreshToken(),
                '_id': this.getUserId()
            },
            observe: 'response'
        }).pipe(
            tap((res: HttpResponse<any>) => {
                this.setAccessToken(res.body.accessToken)
            })
        )
    }

    getAccessToken() {
        return localStorage.getItem('access-token');
    }

    setAccessToken(accessToken: string) {
        localStorage.setItem('access-token', accessToken)
    }

    getRefreshToken() {
        return localStorage.getItem('refresh-token')
    }

    getUserId() {
        return localStorage.getItem('id')
    }


}
