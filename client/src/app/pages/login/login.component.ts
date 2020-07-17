import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onUserLogin(gmail: string, password: string) {
    if (gmail === '' || password === '') {
      alert('Empty value is not allwoed');
    } else {
      this.authService.login(gmail, password).subscribe(data=>{
        alert('Welcome to our Task Manager Application')
        this.router.navigate(['/lists'])
      }, error=>{
        alert('You are make a Bad request')
      })
    }
  }
}
