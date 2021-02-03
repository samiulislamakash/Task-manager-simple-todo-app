import { NotificationService } from './../../@shared/service/notification.service';
import { Router } from '@angular/router';
import { AuthService } from './../../@shared/service/auth.service';
import { UserService } from './../../@shared/service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date = new Date().getFullYear();
  state: string;

  form: FormGroup;
  isToken: boolean;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    let url = this.router.url.split('/')
    this.state = url[1];
    console.log(this.state)
    if (this.state === 'login') {
      this.loginForm()
    } else if (this.state === 'signUp') {
      this.singUpFrom()
    }

    this.isToken = !!localStorage.getItem('access-token') && !!localStorage.getItem('refresh-token')
  }

  ngOnInit(): void {
  }

  loginForm() {
    this.form = this.fb.group({
      email: [
        "", [Validators.required, Validators.pattern(/^([a-zA-Z0-9]+)@([a-zA-z0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/)],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  singUpFrom() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        "", [Validators.required, Validators.pattern(/^([a-zA-Z0-9]+)@([a-zA-z0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/)],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required]],
      gender: ['']
    })
  }

  userLogin() {
    this.isLoading = true;
    this.userService.login(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.authService.session(res.data.user._id, res.data.authTokens.accessToken, res.data.authTokens.refreshToken);
            this.form.reset();
            this.isLoading = false;
            this.router.navigate(['main']);
            this.notificationService.showPopupInfo('Login Successfull')
          } else {
            this.isLoading = false;
            this.notificationService.showPopupDanger(res.message);
          }
        }, (err) => {
          this.isLoading = false;
          this.notificationService.showPopupDanger(err.message);
        }
      )

  }

  userSingUp() {
    this.isLoading = true;
    this.userService.create(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.authService.session(res.data.user._id, res.data.authTokens.accessToken, res.data.authTokens.refreshToken);
            this.form.reset();
            this.isLoading = false;
            this.router.navigate(['main']);
            this.notificationService.showPopupInfo('Sing up successfull')
          } else {
            this.isLoading = false;
            this.notificationService.showPopupDanger(res.message);
          }
        }, (err) => {
          this.isLoading = false;
          this.notificationService.showPopupDanger(err.message);
        }
      )
  }

}
