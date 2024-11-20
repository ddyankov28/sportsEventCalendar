import { Component } from '@angular/core';
import * as sportData from '../../assets/sportData.json';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


interface Event {
  date: string;
}

interface EventsByDate {
  [date: string]: Event[];
}
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})


export class CalendarComponent{
  currentYear: number = 0;
  currentMonth: string = '';
  displayedMonthIndex: number = 0;
  daysInMonth: number[] = [];
  firstDayOfMonth: number = 0;
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  eventsByDate: EventsByDate = {};
  selectedDate: string = '';

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    const today = new Date();
    console.log('Today:', today);
    this.currentYear = today.getFullYear();
    console.log('Current year:', this.currentYear);
    this.displayedMonthIndex = today.getMonth();
    console.log('Current month index:', this.displayedMonthIndex);
    this.currentMonth = new Date(this.currentYear, this.displayedMonthIndex).toLocaleString('default', { month: 'long' });
    console.log('Current month:', this.currentMonth);
    localStorage.setItem('calendarData', JSON.stringify(sportData));
    console.log('Data:', sportData);
    this.generateCalendar();
    this.loadEvents();
  }
  
  generateCalendar() {
    this.currentMonth = new Date(this.currentYear, this.displayedMonthIndex).toLocaleString('default', { month: 'long' });
    this.firstDayOfMonth  = (new Date(this.currentYear, this.displayedMonthIndex, 1).getDay() + 6) % 7;
    // move to the next month and 0 means last day of the previous month
    const daysInCurrentMonth = new Date(this.currentYear, this.displayedMonthIndex + 1, 0).getDate();
    console.log('Days in current month:', daysInCurrentMonth);
    this.daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
  }
  
  getCalendarWeeks(): number[][] {
    const weeks: number[][] = [];
    let week: number[] = [];
  
    // Initialize empty days for the first week if needed
    for (let i = 0; i < this.firstDayOfMonth; i++) {
      week.push(0);
    }
    this.daysInMonth.forEach(day => {
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
    });
    if (week.length > 0) {
      weeks.push(week);
    }
    //console.log('Weeks:', weeks);
    return weeks;
  }
  
  loadEvents() {
    const retrievedData = localStorage.getItem('calendarData');
    const parsedData = JSON.parse(retrievedData!);
    console.log('Events:', parsedData.events);
    parsedData.events.forEach((event: Event) => {
      const eventDate = new Date(event.date);
      if (eventDate.getFullYear() === this.currentYear && eventDate.getMonth() === this.displayedMonthIndex){
        const day = eventDate.getDate();
        if (!this.eventsByDate[day]) {
          this.eventsByDate[day] = [];
        }
        this.eventsByDate[day].push({ date: event.date });
      }
    });
    console.log('Events by date:', this.eventsByDate);
  }

  changeMonth(direction: number) {
    this.displayedMonthIndex += direction;
    if (this.displayedMonthIndex < 0) {
      this.displayedMonthIndex = 11;
      this.currentYear -= 1;
    } else if (this.displayedMonthIndex > 11) {
      this.displayedMonthIndex = 0;
      this.currentYear += 1;
    }
    console.log('Current month index:', this.displayedMonthIndex);
    this.generateCalendar();
    this.loadEvents();

  }
  
  hasEvent(day: number): boolean {
    return this.eventsByDate[day]?.length > 0;
  }
  
  
  getEventDetails(day: number): string {
    return this.eventsByDate[day].join('\n');
  }

  isCurrentDay(day: number): boolean {
    const today = new Date();
    return day === today.getDate() && this.displayedMonthIndex === today.getMonth() && this.currentYear === today.getFullYear();
  }

  goToEventDetail(day: number): void {
    const selectedDate = `${this.currentYear}-${(this.displayedMonthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    console.log('Navigating to:', selectedDate);
    this.router.navigate(['/events', selectedDate]);
  }
}