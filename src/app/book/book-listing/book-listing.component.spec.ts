import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListingComponent } from './book-listing.component';

describe('BookListingComponent', () => {
  let component: BookListingComponent;
  let fixture: ComponentFixture<BookListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListingComponent]
    });
    fixture = TestBed.createComponent(BookListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
