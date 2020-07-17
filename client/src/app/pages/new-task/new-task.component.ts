import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  listId: string;

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      this.listId = p['listId']
      console.log(this.listId)
    })
  }

  createNewTask(title: string) {
    if (title === '') {
      alert('Empty value is not allowed')
    } else {
      this.taskService.createTask(title, this.listId).subscribe((newTask: Task) => {
        this.router.navigate(['lists/' + newTask._listId])
      })
    }
  }
}
