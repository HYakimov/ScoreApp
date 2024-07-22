import { Component, ViewChild } from '@angular/core';
import { CompetitionService } from './competition.service';
import { Competition } from './competition.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent {

  constructor(private competitionService: CompetitionService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  competitions = new MatTableDataSource<Competition>();
  displayedColumns: string[] = ['id', 'name'];

  ngOnInit(): void {
    this.fetchCompetitions();
  }

  ngAfterViewInit(): void {
    this.competitions.paginator = this.paginator;
  }

  fetchCompetitions(): void {
    this.competitionService.getCompetitions().subscribe(competitions => {
      this.competitions.data = competitions;
    });
  }

  addData(): void { }
  removeData(): void { }
  editData(): void { }
}