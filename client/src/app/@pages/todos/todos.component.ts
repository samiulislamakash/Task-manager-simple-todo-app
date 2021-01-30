import { NotificationService } from './../../@shared/service/notification.service';
import { TodoCreateUpdateComponent } from './todo-create-update/todo-create-update.component';
import { ListService } from './../../@shared/service/list.service';
import { TaskService } from './../../@shared/service/task.service';
import { AuthService } from './../../@shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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

  myTodos: any = [];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private listService: ListService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    this.getAllList();
    console.log(this.myTodos)
  }

  getAllList() {
    this.listService.getAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          this.getAllTaskAndMakeArray(res.data).catch(() => {
            this.notificationService.showPopupWarning('Data Is Not Ready.')
          })
        }, (err: any) => {
          console.log(err)
        }
      )
  }

  async getAllTaskAndMakeArray(list: any) {
    for (let i = 0; i < list.length; i++) {
      let res: any = await this.taskService.getAll(list[i]._id).toPromise();
      let d = {
        list: list[i],
        task: res.data
      }
      this.myTodos.push(d);
    }
  }

  createList() {
    const dialogRef = this.dialog.open(TodoCreateUpdateComponent, {
      width: '550px',
      data: {
        mode: 'list-create',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log('The dialog was closed', result);
        this.listService.create(result.data)
          .pipe(untilDestroyed(this))
          .subscribe(
            (res: any) => {
              if (res.success) {
                let todo = {
                  list: res.data,
                  task: [],
                }
                this.myTodos.push(todo)
                this.notificationService.showPopupInfo(res.message);
              } else {
                this.notificationService.showPopupDanger(res.message);
              }
            }, err => {
              this.notificationService.showPopupDanger(err.message);
            }
          )
      }
    });
  }
  createTask(listId, index) {
    const dialogRef = this.dialog.open(TodoCreateUpdateComponent, {
      width: '550px',
      data: {
        mode: 'task-create',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.taskService.create(listId, result.data)
          .pipe(untilDestroyed(this))
          .subscribe(
            (res: any) => {
              if (res.success) {
                this.myTodos[index].task.push(res.data);
                this.notificationService.showPopupSuccess(res.message);
              } else {
                this.notificationService.showPopupDanger(res.message);
              }
            }, err => {
              this.notificationService.showPopupDanger(err.message);
            }
          )
      }
    });
  }
  editList(list: any, index) {
    const dialogRef = this.dialog.open(TodoCreateUpdateComponent, {
      width: '550px',
      data: {
        mode: 'edit-list',
        list,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.listService.updateSingle(list._id, result.data)
          .pipe(untilDestroyed(this))
          .subscribe(
            (res: any) => {
              if (res.success) {
                let todoAll = this.myTodos;
                todoAll[index].list.title = res.data.title;
                this.myTodos = todoAll;
                this.notificationService.showPopupInfo(res.message);
              } else {
                this.notificationService.showPopupDanger(res.message);
              }
            }, err => {
              this.notificationService.showPopupDanger(err.message);
            }
          )
      }
    });
  }
  editTask(task: any, listId, index, tIndex) {
    const dialogRef = this.dialog.open(TodoCreateUpdateComponent, {
      width: '550px',
      data: {
        mode: 'edit-task',
        data: {
          task: task
        },
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.taskService.update(listId, task._id, result.data)
          .pipe(untilDestroyed(this))
          .subscribe(
            (res: any) => {
              if (res.success) {
                let todoAll = this.myTodos;
                todoAll[index].task[tIndex].title = res.data.title;
                this.myTodos = todoAll;
                this.notificationService.showPopupSuccess(res.message);
              } else {
                this.notificationService.showPopupDanger(res.message);
              }
            }, err => {
              this.notificationService.showPopupDanger(err.message);
            }
          )
      }
    });
  }

  deleteList(id: string, index) {
    this.listService.delete(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          if (res.success) {
            let allTodos = this.myTodos;
            allTodos.splice(index, 1);
            this.myTodos = allTodos;
            this.notificationService.showPopupInfo(res.message);
          } else {
            this.notificationService.showPopupDanger(res.message);
          }
        }, err => {
          this.notificationService.showPopupDanger(err.message);
        }
      )
  }

  deleteTask(listId, taskId, index, tIndex) {
    this.taskService.delete(listId, taskId)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          if (res.success) {
            let allTodos = this.myTodos;
            allTodos[index].task.splice(tIndex, 1);
            this.myTodos = allTodos;
            this.notificationService.showPopupInfo(res.message);
          } else {
            this.notificationService.showPopupDanger(res.message);
          }
        }, err => {
          this.notificationService.showPopupDanger(err.message);
        }
      )
  }


  logout() {
    this.authService.logout();
  }
}
