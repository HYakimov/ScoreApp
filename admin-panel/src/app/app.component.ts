import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompetitionComponent } from './competition/competition.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompetitionComponent, AdminNavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-panel';
}