import { Component, ViewChild } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { Competition } from '../competition.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  templateUrl: './competition-table.component.html',
  styleUrl: './competition-table.component.css'
})
export class CompetitionTableComponent {

  constructor(private competitionService: CompetitionService, private router: Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  competitions = new MatTableDataSource<Competition>();
  displayedColumns: string[] = ['id', 'name', 'countries', 'actions'];
  title = "Competitions";

  ngOnInit(): void {
    this.fetchCompetitions();
  }

  ngAfterViewInit(): void {
    this.competitions.paginator = this.paginator;
  }

  async fetchCompetitions(): Promise<void> {
    this.competitionService.getCompetitions().subscribe({
      next: (competitions) => this.competitions.data = competitions,
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  getCountryNames(competition: Competition): string {
    return competition.countries.map(country => country.name).join(', ');
  }

  addData(): void {
    this.router.navigate(['competitionForm']); // when used constant gives error???
  }

  async deleteData(competition: Competition): Promise<void> {
    this.competitionService.deleteCompetition(competition.id).subscribe({
      error: (error) => console.error('Error deleting data:', error),
      complete: () => this.fetchCompetitions()
    });
  }

  editData(competition: Competition): void {
    this.competitionService.setCompetition(competition);
    this.router.navigate(['competitionForm']);
  }
}