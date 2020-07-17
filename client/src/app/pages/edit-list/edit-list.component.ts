import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private taskServie:TaskService,
    private router: Router
  ) { }

  listId:string;
  title:string;

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      this.listId = p.listId;
      this.taskServie.getOneList(`lists/${p.listId}`).subscribe((data:List)=>{
        this.title = data.title;
      })
    })
  }

  editList(title:string){
    this.taskServie.updateList(this.listId ,title).subscribe(()=>{
      this.router.navigate(['/lists',this.listId])
    });
  }

}
