import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { DatePipe } from '@angular/common';

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
    private datePipe: DatePipe
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