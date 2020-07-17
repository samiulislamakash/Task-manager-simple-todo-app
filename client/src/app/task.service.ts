import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title:string){
    return this.webRequestService.post('lists',{title})
  }

  updateList(id:string, title:string){
    return this.webRequestService.patch(`lists/${id}`,{title})
  }

  getList(){
    return this.webRequestService.get('lists')
  }

  getOneList(url:string){
    return this.webRequestService.get(url)
  }

  deleteList(listId:string){
    return this.webRequestService.delete(`lists/${listId}`)
  }
  
  getTasks(listId: string){
    return this.webRequestService.get(`lists/${listId}/tasks`)
  }

  createTask(title:string , listId:string){
    return this.webRequestService.post(`lists/${listId}/tasks`,{title})
  }

  completed(task: Task){
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    })
  }

  deleteTask(listId:string, taskId:string){
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`)
  }

  updateTask(listId:string, taskId:string, title:string){
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`,{title})
  }

  getOneTask(listId:string , taskId:string){
    return this.webRequestService.get(`lists/${listId}/tasks/${taskId}`);
  }
}
