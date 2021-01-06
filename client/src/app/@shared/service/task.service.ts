import { Task } from './../models/task.model';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private EndPoint = environment.API_ENDPOINT + 'lists/'

    constructor(private http: HttpClient) { }

    create(listId: string, payload: Task) {
        return this.http.post(`${this.EndPoint}${listId}/task/create`, payload);
    }

    getAll(listId: string) {
        return this.http.get(`${this.EndPoint}${listId}/tasks/all`);
    }

    getSingle(listId: string, taskId: string) {
        return this.http.get(`${this.EndPoint}${listId}/tasks/${taskId}`)
    }

    update(listId: string, taskId: string, payload: any) {
        return this.http.patch(`${this.EndPoint}${listId}/tasks/delete/${taskId}`, payload)
    }

    delete(listId: string, taskId: string) {
        return this.http.delete(`${this.EndPoint}${listId}/tasks/delete/${taskId}`)
    }

}