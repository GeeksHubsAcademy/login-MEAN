import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './containers/signup/signup.component';
import { LoginComponent } from './containers/login/login.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
