import { Component, OnInit } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: "app-admin-navbar",
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: "./admin-navbar.component.html",
  styleUrls: ["./admin-navbar.component.css"]
})
export class AdminNavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}