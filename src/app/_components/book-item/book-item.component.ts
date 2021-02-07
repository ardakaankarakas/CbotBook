import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BookService } from '../../_services/book.service';

@Component({
  selector: 'book-item',
  templateUrl: './book-item.component.html',
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

}
