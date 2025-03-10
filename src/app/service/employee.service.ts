import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = "/api/employees"

  constructor(
    private http: HttpClient
  ) { }

  getAllEmployees()
  {
    return this.http.get<any>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError));
  }

  getById(id: number | string)
  {
    return this.http.get<any>(`${this.baseUrl}/${+id}`)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse)
  {
    if (error.status === 0)
      console.error("There was an error:\n\t", error.error);
    else
    {
      console.error("The Backend returned the code: " 
        + error.status + "\nBody: \n\t" + error.error.message);
    }

    return throwError(() => error);
  }
}
