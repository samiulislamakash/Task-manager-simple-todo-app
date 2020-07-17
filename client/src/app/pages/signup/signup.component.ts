import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onUserSingUp(email: string, password: string) {
    if (email === '' || password === '') {
      alert('Empty value is not allwoed');
    } else {
      this.authService.signUp(email, password).subscribe(data =>{
        alert('Welcome to our Task Manager Application')
        this.router.navigate(['/lists'])
      }, error=>{
        alert('You are make a Bad request')
      })
    }
  }

}
