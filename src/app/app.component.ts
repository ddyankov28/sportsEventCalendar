import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CalendarComponent } from './calendar/calendar.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { AboutProjectComponent } from './about-project/about-project.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CalendarComponent, AboutMeComponent, AboutProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sportsEventCalendar';
}
