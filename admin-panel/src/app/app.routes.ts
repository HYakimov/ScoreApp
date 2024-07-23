import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CompetitionTableComponent } from './competition/table.component/competition-table.component';
import { CompetitionFormComponent } from './competition/form.component/competition-form.component';

export const BASE_ROUTE = '';
export const COMPETITIONS_ROUTE = 'competitions';
export const COMPETITION_FORM_ROUTE = 'competitionForm';

export const routes: Routes = [
    { path: BASE_ROUTE, component: LandingComponent },
    { path: COMPETITIONS_ROUTE, component: CompetitionTableComponent },
    { path: COMPETITION_FORM_ROUTE, component: CompetitionFormComponent }
];