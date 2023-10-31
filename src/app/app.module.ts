import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

import { LoginComponent } from './login/login.component';
import { BookListingComponent } from './book/book-listing/book-listing.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookViewComponent } from './book/book-view/book-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    BookListingComponent,
    BookFormComponent,
    BookViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule
  ],
  providers: [
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
