import { Component, OnInit } from '@angular/core';
//import { trigger, transition, style, animate } from '@angular/animations';
import { BookService } from '../../_services/book.service';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  providers: [BookService],

})
export class BookListComponent implements OnInit {
  bookName: string;
  bookAuthor: string;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookName = '';
    this.bookAuthor = '';
  }

  addBook(): void {
    if (this.bookName.trim().length === 0 || this.bookAuthor.trim().length === 0 ) {
      return;
    }

    this.bookService.addBook(this.bookName, this.bookAuthor);

    this.bookName = '';
    this.bookAuthor = '';
  }
}

