import { Routes } from '@angular/router';
import {Login} from './auth/login/login';
import {Dashboard} from './dashboard/dashboard';
import {TournamentList} from './dashboard/tournaments/tournament-list/tournament-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'tournaments', pathMatch: 'full' },
      { path: 'tournaments', component: TournamentList },
      // { path: 'teams', component: TeamList },
      // { path: 'players', component: PlayerList },
      // { path: 'settings', component: Settings },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
