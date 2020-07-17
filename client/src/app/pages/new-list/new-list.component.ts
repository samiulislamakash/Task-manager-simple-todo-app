import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})

export class NewListComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createNewList(title: string) {
    if (title === '') {
      alert('Empty value is not allowed')
    } else {
      this.taskService.createList(title).subscribe((res: List) => {
        this.router.navigate(['/lists', res._id])
      })
    }
  }

}
