import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './thread/thread.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'thread', component: ThreadComponent },
    { path: '**', redirectTo: '' }
];
