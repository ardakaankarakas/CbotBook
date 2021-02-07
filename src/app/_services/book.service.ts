import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookName: string = '';
  bookAuthor: string = '';
  idForBook: number = 4;
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  books: Book[] = [];

  constructor(private http: HttpClient) {
    this.books = this.getBooks();
  }

  getBooks(): Book[] {
    this.http.get(API_URL + '/getBooks')
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        this.books = response;
        console.log(response)
      })

      return this.books;
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Something went wrong!!!!');
  }

  addBook(bookName: string, bookAuthor: string ): void {
    if (bookName.trim().length === 0 || bookAuthor.trim().length === 0) {
      return;
    }

    this.http.post(API_URL + '/createBook/', {
      name: bookName,
      author: bookAuthor,
    })
      .subscribe((response: any) => {
        console.log(bookName)
        this.books.push({
          createdAt: response.createdAt,
          _id: response._id,
          name: response.name,
          author: response.author,
      
        });
        console.log(response.name)
      });

    this.idForBook++;
  }

  deleteBook(_id: string): void {

    this.http.post(API_URL + '/deleteBookById', {
      _id
    })
    .subscribe((response: any) => {
        this.books = this.books.filter(book => book._id !== _id);
      })
  }

  booksFiltered(): Book[] {
    if (this.filter === 'all') {
      return this.books;
    }
    return this.books;
  }
}
