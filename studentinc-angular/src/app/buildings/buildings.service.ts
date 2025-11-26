import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Building {
  _id: string;
  name: string;
  address: string;
  facilities: string[];
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {
  private apiUrl = 'http://localhost:3000/api/buildings';

  constructor(private http: HttpClient) {}

  getBuildings(): Observable<Building[]> {
    return this.http.get<Building[]>(this.apiUrl);
  }
}
