import { Error404Component } from './@pages/error404/error404.component';
import { TodosComponent } from './@pages/todos/todos.component';
import { HomeComponent } from './@pages/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: HomeComponent
  },
  {
    path: 'signUp',
    component: HomeComponent
  },
  {
    path: 'main',
    component: TodosComponent
  },
  {
    path: "**",
    component: Error404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
