import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from './competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  private readonly competitionsUrl = 'http://localhost:3000/competitions';

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.competitionsUrl);
  }
}