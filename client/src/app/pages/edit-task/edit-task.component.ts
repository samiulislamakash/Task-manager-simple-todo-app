import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  taskId:string;
  listId:string;
  taskTitle:string;

  ngOnInit(): void {
    this.route.params.subscribe((p:Params)=>{
      this.taskId = p.taskId
      this.listId = p.listId
      this.taskService.getOneTask(p.listId, p.taskId).subscribe((data:Task)=>{
        this.taskTitle = data.title
      })
    })
  }

  editTask(title:string){
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(()=>{
      this.router.navigate(['/lists',this.listId])
    })
  }

}
