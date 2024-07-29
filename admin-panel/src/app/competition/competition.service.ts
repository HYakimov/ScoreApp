import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from './competition.model';
import { Country } from './country.model';
import { CompetitionDto } from './competition.dto';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private readonly competitionsUrl = 'http://localhost:3000/competitions';
  private readonly countriesUrl = 'http://localhost:3000/countries';
  private competition: Competition | null = null;

  constructor(private http: HttpClient) { }

  setCompetition(competition: Competition): void {
    this.competition = competition;
  }

  getCompetition(): Competition | null {
    return this.competition;
  }

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.competitionsUrl);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl);
  }

  postCompetition(competitionData: CompetitionDto): Observable<any> {
    return this.http.post<any>(this.competitionsUrl, competitionData);
  }

  updateCompetition(id: number, competitionData: CompetitionDto): Observable<any> {
    return this.http.put(`${this.competitionsUrl}/${id}`, competitionData);
  }

  deleteCompetition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.competitionsUrl}/${id}`);
  }
}