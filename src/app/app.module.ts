import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { CommentComponent } from './comment/comment.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { NewPostComponent } from './profile/new-post/new-post.component';
import { UsersService } from './services/users.service';
import { PostsService } from './services/posts.service';
import { SearchPostsComponent } from './search-posts/search-posts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    PostPreviewComponent,
    PostModalComponent,
    CommentComponent,
    SearchUsersComponent,
    UserComponent,
    ProfileComponent,
    NewPostComponent,
    SearchPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModalModule,
    //HttpClient
  ],
  providers: [UsersService, PostsService, PostModalComponent, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [PostModalComponent, NewPostComponent]
})
export class AppModule { }
