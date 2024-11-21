import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Event {
  id: number;
  date: string;
  time: string;
  eventType: string;
  teams: string;
  location: string;
  city: string;
  competition: string;
  country: string;
}

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit{
  date: string = '';
  events: Event[] = [];
  month: number = 0;
  year: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const date = this.route.snapshot.paramMap.get('date');
    this.month = Number(this.route.snapshot.queryParamMap.get('month'));
    this.year = Number(this.route.snapshot.queryParamMap.get('year'));
    console.log('dateFromParam', date);
    if (date) {
      this.date = date;
      this.loadEventsForDate();
    }
  }
  
  loadEventsForDate(): void {
    const retrievedData = localStorage.getItem('calendarData');
    const parsedData = JSON.parse(retrievedData!);
    //console.log('Parsed data:', parsedData.events);
    this.events = parsedData.events.filter((event: Event) => event.date === this.date);
    //console.log('Events:', this.events);
  }

  goBack(): void {
    this.router.navigate([''], {
      queryParams: { month: this.month, year: this.year },
    });
  }
}