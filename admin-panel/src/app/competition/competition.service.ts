import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
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

  async getCompetitionsAsync(): Promise<Competition[]> {
    try {
      return lastValueFrom(this.getCompetitions());
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
    return [];
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl);
  }

  async getCountriesAsync(): Promise<Country[]> {
    try {
      return lastValueFrom(this.getCountries());
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
    return [];
  }

  postCompetition(competitionData: CompetitionDto): Observable<any> {
    return this.http.post<any>(this.competitionsUrl, competitionData);
  }

  async postCompetitionAsync(competitionData: CompetitionDto): Promise<any> {
    try {
      return lastValueFrom(this.postCompetition(competitionData));
    } catch (error) {
      console.error('Error posting data:', error);
    }
    return {};
  }

  updateCompetition(id: number, competitionData: CompetitionDto): Observable<any> {
    return this.http.put(`${this.competitionsUrl}/${id}`, competitionData);
  }

  async updateCompetitionAsync(id: number, competitionData: CompetitionDto): Promise<any> {
    try {
      return await lastValueFrom(this.updateCompetition(id, competitionData));
    } catch (error) {
      console.error('Error updating competition:', error);
      throw error;
    }
  }

  deleteCompetition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.competitionsUrl}/${id}`);
  }

  async deleteCompetitionAsync(id: number): Promise<void> {
    try {
      return lastValueFrom(this.deleteCompetition(id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
}