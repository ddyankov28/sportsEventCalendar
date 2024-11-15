import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CalendarComponent } from './calendar/calendar.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { FooterComponent } from './footer/footer.component';
import { injectSpeedInsights } from '@vercel/speed-insights';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CalendarComponent, AboutMeComponent, AboutProjectComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sports Event Calendar';
}


injectSpeedInsights();