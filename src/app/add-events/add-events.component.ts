import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Event {
  id: number;
  date: string;
  time: string;
  eventType: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  city: string;
  country: string;
  competition: string;
  arenaCapacity: number;
}

@Component({
  selector: 'app-add-event',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddEventsComponent {
  applyForm = new FormGroup({
    eventDate: new FormControl('', Validators.required),
    eventTime: new FormControl('', Validators.required),
    eventType: new FormControl('', Validators.required),
    homeTeam: new FormControl('', Validators.required),
    awayTeam: new FormControl('', Validators.required),
    eventLocation: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    competition: new FormControl('', Validators.required),
    arenaCapacity: new FormControl(0, [Validators.required, Validators.min(1)]),
  });


  constructor(private router: Router) {}

  submitEvent() {
    const storedData = JSON.parse(localStorage.getItem('calendarData')!)
    const events = storedData;; 
    const eventsLength = JSON.parse(localStorage.getItem('calendarData') || '0').length;
    const lastId = JSON.parse(localStorage.getItem('calendarData') || '0')[eventsLength - 1].id; 
    console.log('Last ID:', lastId);
    const newEvent: Event = {
      id: lastId + 1,
      date: this.applyForm.value.eventDate ?? '',
      time: this.applyForm.value.eventTime ?? '',
      eventType: this.applyForm.value.eventType ?? '',
      homeTeam: this.applyForm.value.homeTeam ?? '',
      awayTeam: this.applyForm.value.awayTeam ?? '',
      location: this.applyForm.value.eventLocation ?? '',
      city: this.applyForm.value.city ?? '',
      country: this.applyForm.value.country ?? '',
      competition: this.applyForm.value.competition ?? '',
      arenaCapacity: this.applyForm.value.arenaCapacity ?? 0,
    };
    
    events.push(newEvent);
    storedData.events = events;
    localStorage.setItem('calendarData', JSON.stringify(storedData));
    //console.log('Updated calendarData:', JSON.parse(localStorage.getItem('calendarData') || '{}'));
    this.router.navigate(['/']);
  }
}
