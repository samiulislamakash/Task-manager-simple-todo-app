import { List } from './../models/list.model';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ListService {

    private EndPoint = environment.API_ENDPOINT + 'lists/'

    constructor(private http: HttpClient) { }

    create(payload: List) {
        return this.http.post(`${this.EndPoint}create`, payload);
    }

    getAll() {
        return this.http.get(`${this.EndPoint}all`);
    }

    getSingle(id: string) {
        return this.http.get(`${this.EndPoint}${id}`);
    }

    updateSingle(id: string, payload: any) {
        return this.http.patch(`${this.EndPoint}update/${id}`, payload);
    }

    delete(id: string) {
        return this.http.delete(`${this.EndPoint}delete/${id}`);
    }

}