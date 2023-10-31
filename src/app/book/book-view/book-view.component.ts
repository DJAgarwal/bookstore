import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent {
  book: any;
  bookId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private datePipe: DatePipe
  ) {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
    });
  }

  ngOnInit(): void {
    this.fetchBook(this.bookId);
  }
  formatDate(date: any): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  fetchBook(bookId): void {
    this.bookService.getBookDetails(bookId).subscribe(
      (response) => {
        this.book = response.data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
