import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carmodel } from '../model/carmodel.service';

@Injectable({
  providedIn: 'root'
})
export class modellist {

  private modelsUrl = 'http://localhost:5120/api/CarModelManagement/GetCarModels'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getModels(): Observable<Carmodel[]> {
    return this.http.get<Carmodel[]>(this.modelsUrl);
  }

  getModelById(id: number): Observable<Carmodel> {
    const url = `${this.modelsUrl}/${id}`;
    return this.http.get<Carmodel>(url);
  }

  // Add more methods as per your application's requirements
}
