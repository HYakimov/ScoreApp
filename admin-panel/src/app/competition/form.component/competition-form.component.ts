import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CompetitionService } from '../competition.service';
import { Country } from '../country.model';
import { Router } from '@angular/router';
import { Competition } from '../competition.model';

@Component({
  selector: 'app-competition-form-component',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './competition-form.component.html',
  styleUrl: './competition-form.component.css'
})
export class CompetitionFormComponent implements OnInit {

  form: FormGroup;
  countries: Country[] = [];
  competition: Competition | null = null;

  constructor(
    private fb: FormBuilder,
    private competitionService: CompetitionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      countryIds: [[], Validators.required],
    });
  }

  async fetchCountries(): Promise<void> {
    this.competitionService.getCountries().subscribe({
      next: (countries) => this.countries = countries,
      error: (error) => console.error('Error fetching countries:', error)
    });
  }

  ngOnInit(): void {
    this.fetchCountries();
    this.competition = this.competitionService.getCompetition();
    if (this.competition) {
      this.populateForm(this.competition);
    }
  }

  populateForm(competition: Competition): void {
    this.form.patchValue({
      name: competition.name,
      countryIds: competition.countries.map(country => country.id),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      if (this.competition) {
        this.competitionService.updateCompetition(this.competition.id, this.form.value).subscribe({
          error: (error) => console.error('Error updating data:', error)
        });
      } else {
        this.competitionService.postCompetition(this.form.value).subscribe({
          error: (error) => console.error('Error posting data:', error)
        });
      }
      this.router.navigate(['/competitions']);
    } else {
      console.log('Form is invalid');
    }
  }

  cancel(): void {
    this.router.navigate(['competitions']);
  }
}