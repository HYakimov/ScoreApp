import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompetitionFormComponent } from './competition/form.component/competition-form.component';
import { CompetitionTableComponent } from './competition/table.component/competition-table.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompetitionTableComponent, NavbarComponent, CompetitionFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-panel';
}