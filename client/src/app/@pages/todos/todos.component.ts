import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  isTaskEdit: boolean = false;
  isListEdit: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  taskEditView() {
    this.isTaskEdit = true;
  }

  taskSave() {
    this.isTaskEdit = false;
  }

  taskCancel() {
    this.isTaskEdit = false;
  }

  listEditView() {
    this.isListEdit = true;
  }

  listSave() {
    this.isListEdit = false;
  }

  listCancel() {
    this.isListEdit = false;
  }

  deleteTask() { }
  deleteList() { }
}
