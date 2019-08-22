import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchPostsComponent } from './search-posts/search-posts.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search-users', component: SearchUsersComponent },
  { path: 'search-posts', component: SearchPostsComponent },
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
