import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CompetitionComponent } from './competition/competition.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'competitions', component: CompetitionComponent },
];