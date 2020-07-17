import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import {AuthService} from 'src/app/auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})

export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  constructor(
    private taskServie: TaskService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  listId:string;

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      if (p.listId) {
        this.taskServie.getTasks(p.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks
        })
      }else{
        this.tasks = undefined
      }
    })

    this.taskServie.getList().subscribe((list: List[]) => {
      this.lists = list;
    })

    this.route.params.subscribe((p:Params)=>{
      this.listId = p['listId']
      console.log(this.listId)
    })
  }

  onTaskClick(task: Task) {
    console.log(task)
    this.taskServie.completed(task).subscribe(() => {
      task.completed = !task.completed;
    })
  }

  logout(){
    this.authService.logout();
  }

  listDelete(){
    this.taskServie.deleteList(this.listId).subscribe(()=>{
      this.router.navigate(['lists'])
    })
  }

  taskDelete(taskId:string){
    this.taskServie.deleteTask(this.listId,taskId).subscribe(()=>{
      this.tasks = this.tasks.filter(val => val._id !== taskId)
    })
  }

}
