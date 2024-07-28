import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CompetitionTableComponent } from './competition/table.component/competition-table.component';
import { CompetitionFormComponent } from './competition/form.component/competition-form.component';
import { AuthGuard } from '../auth.guard';

export const BASE_ROUTE = '';
export const COMPETITIONS_ROUTE = 'competitions';
export const COMPETITION_FORM_ROUTE = 'competitionForm';
export const EDIT_COMPETITION_ROUTE = 'competitionForm/:id';

export const routes: Routes = [
    { path: BASE_ROUTE, component: LandingComponent },
    { path: COMPETITIONS_ROUTE, component: CompetitionTableComponent, canActivate: [AuthGuard] },
    { path: COMPETITION_FORM_ROUTE, component: CompetitionFormComponent, canActivate: [AuthGuard] },
    { path: EDIT_COMPETITION_ROUTE, component: CompetitionFormComponent, canActivate: [AuthGuard] }
];