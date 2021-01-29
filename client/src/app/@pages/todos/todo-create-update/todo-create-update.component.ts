import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-create-update',
  templateUrl: './todo-create-update.component.html',
  styleUrls: ['./todo-create-update.component.scss']
})
export class TodoCreateUpdateComponent implements OnInit {

  form: FormGroup;
  pageTitle: string;

  constructor(
    public dialogRef: MatDialogRef<TodoCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [, [Validators.required]]
    })
    if (data.mode === 'list-create') {
      this.pageTitle = 'Create List';
    } else if (data.mode === 'task-create') {
      this.pageTitle = 'Create Task'
    } else if (data.mode === 'edit-list') {
      this.pageTitle = 'Edit List'
      this.form.patchValue(data.list)
    } else if (data.mode === 'edit-task') {
      this.pageTitle = 'Edit Task'
    }

    this.dialogRef.backdropClick().subscribe(() => this.dialogRef.close({ success: false }));
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close({ success: true, data: this.form.value })
  }

  onNoClick(): void {
    this.dialogRef.close({ success: false });
  }

}
