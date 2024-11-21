import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import eventsData from '../../assets/sportData.json';
import { CommonModule } from '@angular/common';

export interface Event {
  id: number;
  date: string;
  time: string;
  teams: string;
  eventType: string;
  location: string;
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

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const date = this.route.snapshot.paramMap.get('date');
    console.log('dateFromParam', date);
    if (date) {
      this.date = date;
      this.loadEventsForDate();
    }
  }
  
  loadEventsForDate(): void {
    this.events = eventsData.events.filter(event => event.date === this.date);
    console.log('Filtered events:', this.events);
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}