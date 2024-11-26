import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentListComponent } from './components/content-list/content-list.component';
import { ContentService } from './services/content.service';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateContentComponent } from './components/create-content/create-content.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { ContentDetailsComponent } from './components/content-details/content-details.component';
import { PropositionListComponent } from './components/proposition-list/proposition-list.component';
import { PropositionCreateComponent } from './components/proposition-create/proposition-create.component';
import { CommentCreateComponent } from './components/comment-create/comment-create.component';
import { customInterceptor } from './interceptors/custom.interceptor';
import { RequestComponent } from './components/request-proposition/request.component';
import { CategoryContentsComponent } from './components/category-contents/category-contents.component';
import { EditPropositionComponent } from './components/edit-proposition/edit-proposition.component';
import { UpdateContentComponent } from './components/update-content/update-content.component';
import { AfterDownloadComponent } from './components/after-download/after-download.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserListComponent,
    EditUserComponent,
    DeleteUserComponent,
    ContentListComponent,
    HomeComponent,
    NavbarComponent,
    CreateContentComponent,
    CommentsComponent,
    CommentComponent,
    ContentDetailsComponent,
    PropositionListComponent,
    PropositionCreateComponent,
    CommentCreateComponent,
    RequestComponent,
    CategoryContentsComponent,
    EditPropositionComponent,
    UpdateContentComponent,
    AfterDownloadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],

  providers: [
    provideHttpClient(withInterceptors([customInterceptor])),
    ContentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
