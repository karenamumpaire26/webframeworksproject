import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AboutInfo {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private apiUrl = 'http://localhost:3000/api/about';

  constructor(private http: HttpClient) {}

  getAbout(): Observable<AboutInfo> {
    return this.http.get<AboutInfo>(this.apiUrl);
  }
}
