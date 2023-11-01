import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  bookId: any;
  title:any;
  bookForm: FormGroup;
  submitted = false;
  currentImage: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      image: ['',this.bookId ? null : Validators.required],
      published: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
    });
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
      if (this.bookId) {
        this.title="Edit";
        this.editBook(this.bookId);
      } else {
        this.title="Create";
      }
    });
  }

  editBook(bookId: number): void {
    this.bookService.getBookDetails(bookId).subscribe((book) => {
      this.bookForm.patchValue(book.data);
      this.bookForm.patchValue({ id: bookId });
      this.currentImage = book.data.image;
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.bookForm.patchValue({ image: file });
    }
  }
  
  onSubmit(): void {
    this.submitted = true;
    if (this.bookForm.invalid) {
      this.toastr.error('Please enter valid details.');
      return;
    }
  
    const formData = new FormData();
    const book = this.bookForm.value;
  
    for (const key in book) {
        formData.append(key, book[key]);
    }
  
    this.bookService.saveBook(formData).subscribe(
      (response) => {
        this.toastr.success("Book saved successfully");
        this.router.navigate(['/book-listing']);
      },
      (error) => {
         if (error.status === 401) {
          this.toastr.error(error.error.message);
        } if (error.status === 422) {
          const errorMessages = error.error.errors;
          const errors = Object.keys(errorMessages).map((key) => {
            return errorMessages[key].join(', ');
          });
          errors.forEach(errorMessage => {
            this.toastr.error(errorMessage);
          });
        } else {
          this.toastr.error('Please enter valid details.');
        }
      }
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
