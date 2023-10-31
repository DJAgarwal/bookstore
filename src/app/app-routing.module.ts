import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookListingComponent  } from './book/book-listing/book-listing.component';
import { BookFormComponent  } from './book/book-form/book-form.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'book-listing', component: BookListingComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'customer'] } },
  { path: 'book-form', component: BookFormComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
