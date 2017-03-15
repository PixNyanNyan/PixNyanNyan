import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './thread/thread.component';
import { StatusComponent } from './status/status.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'thread/:id', component: ThreadComponent },
    { path: 'status', component: StatusComponent },
    { path: '**', redirectTo: '' }
];
