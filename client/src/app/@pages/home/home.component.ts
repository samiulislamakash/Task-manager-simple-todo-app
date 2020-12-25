import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date = new Date().getFullYear();
  state: string;

  constructor(
    private router: Router
  ) {
    let url = this.router.url.split('/')
    this.state = url[1];
    console.log(this.state)
  }

  ngOnInit(): void {
  }

}
