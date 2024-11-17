import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventDetailsComponent } from './event-details/event-details.component';

export const routes: Routes = [
    {path: 'about-me', component: AboutMeComponent},
    {path: 'about-project', component: AboutProjectComponent},
    {path: '', component: CalendarComponent},
    {path: 'events/:date', component: EventDetailsComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
