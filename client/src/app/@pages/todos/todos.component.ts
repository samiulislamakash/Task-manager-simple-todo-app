import { ListService } from './../../@shared/service/list.service';
import { TaskService } from './../../@shared/service/task.service';
import { AuthService } from './../../@shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  isTaskEdit: boolean = false;
  isListEdit: boolean = false;
  isTaskCreate: boolean = false;
  isListCreate: boolean = false;



  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private listService: ListService
  ) { }

  ngOnInit(): void {
  }

  getAllTask() {

  }

  taskCreateView() {
    this.isTaskCreate = true;
  }

  taskCreateViewCancel() {
    this.isTaskCreate = false;
  }

  taskSave() {
    this.isTaskCreate = false;
  }

  taskEditView() {
    this.isTaskEdit = true;
  }

  taskEditCancel() {
    this.isTaskEdit = false;
  }

  taskUpdate() {
    this.isTaskEdit = false;
  }


  listCreateView() {
    this.isListCreate = true;
  }

  listCreateViewCancel() {
    this.isListCreate = false;
  }

  listSave() {
    this.isListCreate = false;
  }

  listEditView() {
    this.isListEdit = true;
  }

  listEditViewCancel() {
    this.isListEdit = false;
  }

  listUpdate() {
    this.isListEdit = false;
  }

  deleteTask() { }
  deleteList() { }

  logout() {
    this.authService.logout();
  }
}
