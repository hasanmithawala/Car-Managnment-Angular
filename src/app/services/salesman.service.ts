import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface SalesmanCommission {
  salesman: string;
  totalSalesAmount: number;
  totalCommission: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalesmanService {
  private apiUrl = 'http://localhost:5120/api/SalesmanReport/GetSalesmanCommission';

  constructor(private http: HttpClient) { }

  getSalesmanCommission(): Observable<SalesmanCommission[]> {
    return this.http.get<SalesmanCommission[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
