import { User } from './../models/user.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private EndPiont = environment.API_ENDPOINT + 'users/'

    constructor(private http: HttpClient) { }

    create(payload: User) {
        return this.http.post(`${this.EndPiont}create`, payload)
    }

    login(payload: any) {
        return this.http.post(`${this.EndPiont}login`, payload)
    }

}