import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse  } from '@angular/common/http'
import {Observable, throwError, empty } from 'rxjs'
import { AuthService } from './auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WebReqIntreseptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req :HttpRequest<any> , next: HttpHandler):Observable<any>{
    // handel the request
    req = this.addAuthHeader(req);

    // call next() and handle this response
    return next.handle(req).pipe(
      catchError((err:HttpErrorResponse)=>{
        // if error status is 401 that means unauthorized req
        if(err.status === 401){

          return this.accessTokenRefreshing().pipe(
            switchMap(()=>{
              req = this.addAuthHeader(req)
              return next.handle(req)
            }),
            catchError((err:any)=>{
              this.authService.logout()
              return empty()
            })
          )
        }
        return throwError(err)
      })
    )
  }

  accessTokenRefreshing(){
    return this.authService.getRefreshAccessToken().pipe(
      tap(()=>{
        console.log('Access token is refreshed')
      })
    )
  }

  addAuthHeader(req: HttpRequest<any>){
    // get the access token
      const token = this.authService.getAccessToken();
      
      if(token){
        // append the access token to the request header
        return req.clone({
          setHeaders:{
            'x-access-token':token
          }
        })
      }

      return req;
  }

}
