import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class carmodel {

  private apiUrl = 'http://localhost:5120/api'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Example method to post data to your API
  postData(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data'); // Ensure Content-Type is set
    return this.http.post<any>(`${this.apiUrl}/CarModelManagement`, formData, { headers });
  }

}
