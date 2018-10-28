import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/app', pathMatch: 'full' },
    { path: 'app', component: AppComponent }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { enableTracing: true, useHash: false });