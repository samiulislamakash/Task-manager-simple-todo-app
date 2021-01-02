import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
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
}
