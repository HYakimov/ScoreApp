import { Component, OnInit } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: "navbar",
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}