import { Component, ChangeDetectorRef  } from '@angular/core';
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
  searchTitle: string = '';
  searchAuthor: string = '';
  searchGenre: string = '';
  searchISBN: string = '';

  constructor(
    private router: Router,
    private bookService: BookService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private changeDetectorRef: ChangeDetectorRef
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

  searchBooks(): void {
      const queryParams: any = {};
      if (this.searchTitle) {
        queryParams.title = this.searchTitle;
      }
      if (this.searchAuthor) {
        queryParams.author = this.searchAuthor;
      }
      if (this.searchGenre) {
        queryParams.genre = this.searchGenre;
      }
      if (this.searchISBN) {
        queryParams.isbn = this.searchISBN;
      }
    this.bookService.searchBooks(queryParams).subscribe(
      (response) => {
        this.books = response.data.data;
        this.total = response.data.total;
        this.per_page = response.data.per_page;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error searching books:', error);
      }
    );
  }
}