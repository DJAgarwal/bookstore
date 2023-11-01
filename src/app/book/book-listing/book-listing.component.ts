import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.scss']
})
export class BookListingComponent {
  books: any[] = [];
  total: any;
  per_page: any;
  userRole: any;

  constructor(
    private router: Router,
    private bookService: BookService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.fetchBooks(1, 10);
    this.userRole = localStorage.getItem('user_role');
  }

  fetchBooks(page: number, perPage: number): void {
    this.bookService.getBooks(page, perPage).subscribe(
      (response) => {
        this.books = response.data.data;
        this.total = response.data.total;
        this.per_page = response.data.per_page;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  confirmDelete(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.deleteBook(bookId);
    }
  }
  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(
      () => {
        this.toastr.success('Book deleted successfully');
        this.fetchBooks(1, 10);
      },
      (error) => {
        this.toastr.error('Error deleting book');
      }
    );
  }

  toggleDescription(book: any): void {
    book.showDescription = !book.showDescription;
  }

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}