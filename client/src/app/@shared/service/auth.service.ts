// import { Injectable } from '@angular/core';
// import { HttpClient, HttpResponse } from '@angular/common/http';
// import { WebRequestService } from './web-request.service';
// import { Router } from '@angular/router';
// import { tap, shareReplay } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(
//     private http: HttpClient,
//     private webService: WebRequestService,
//     private router: Router
//   ) { }

//   login(email: string, password: string) {
//     return this.webService.login(email, password).pipe(
//       shareReplay(),
//       tap((res: HttpResponse<any>) => {
//         this.setSession(res.body.user._id, res.body.authTokens.accessToken, res.body.authTokens.refreshToken);
//         console.log("Login successfull")
//       })
//     )
//   }

//   signUp(email: string, password: string) {
//     return this.webService.signUp(email, password).pipe(
//       shareReplay(),
//       tap((res: HttpResponse<any>) => {
//         this.setSession(res.body.newUser._id, res.body.authTokens.accessToken, res.body.authTokens.refreshToken);
//         console.log("Login successfull")
//       })
//     )
//   }

//   // set authoraization credensials in localStorage
//   private setSession(userId: string, accessToken: string, refreshToken: string) {
//     localStorage.setItem('user-id', userId)
//     localStorage.setItem('x-access-token', accessToken)
//     localStorage.setItem('x-refresh-token', refreshToken)
//   }

//   logout() {
//     this.removeSession()
//     console.log('Logout successfull')
//     this.router.navigate(['/login'])
//   }

//   getAccessToken() {
//     return localStorage.getItem('x-access-token');
//   }

//   setAccessToken(accessToken: string) {
//     localStorage.setItem('x-access-token', accessToken)
//   }

//   getRefreshToken() {
//     return localStorage.getItem('x-refresh-token')
//   }

//   getUserId() {
//     return localStorage.getItem('user-id')
//   }

//   // remove authoraization credensials in localStorage
//   private removeSession() {
//     localStorage.removeItem('user-id')
//     localStorage.removeItem('x-access-token')
//     localStorage.removeItem('x-refresh-token')
//   }

//   getRefreshAccessToken() {
//     return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
//       headers: {
//         'x-refresh-token': this.getRefreshToken(),
//         '_id': this.getUserId()
//       },
//       observe: 'response'
//     }).pipe(
//       tap((res: HttpResponse<any>) => {
//         this.setAccessToken(res.body.accessToken)
//       })
//     )
//   }
// }