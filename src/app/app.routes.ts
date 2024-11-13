import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { AboutProjectComponent } from './about-project/about-project.component';

export const routes: Routes = [
    {path: 'about-me', component: AboutMeComponent},
    {path: 'about-project', component: AboutProjectComponent}
];
