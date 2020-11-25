import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { LogInComponent } from './views/log-in/log-in.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
