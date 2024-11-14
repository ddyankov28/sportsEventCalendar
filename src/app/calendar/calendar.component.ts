import { Component , OnInit} from '@angular/core';
import eventsData from '../../assets/sportData.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent {
  currentMonth: string = '';
  currentYear: number = 0;
  displayedMonthIndex: number = 0;
  daysInMonth: number[] = [];
  firstDayOfMonth: number = 0;
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  eventsByDate: { [key: number]: string[] } = {};

  constructor() { }
  
  ngOnInit(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.displayedMonthIndex = today.getMonth(); // Set initial displayed month index to current month
    this.generateCalendar();
    this.loadEvents();
  }

  loadEvents() {
    this.eventsByDate = {};

    eventsData.events.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate.getFullYear() === this.currentYear && eventDate.getMonth() === this.displayedMonthIndex) {
        const day = eventDate.getDate();
        if (!this.eventsByDate[day]) {
          this.eventsByDate[day] = [];
        }
        const eventDetails = `${event.teams} vs ${event.eventType} at ${event.time}`;
        this.eventsByDate[day].push(eventDetails);
      }
    });
  }

  generateCalendar() {
    // Update month and year display based on displayedMonthIndex and currentYear
    this.currentMonth = new Date(this.currentYear, this.displayedMonthIndex).toLocaleString('default', { month: 'long' });
    
    // First day of the month (adjusted for Monday start)
    const firstDay = new Date(this.currentYear, this.displayedMonthIndex, 1);
    this.firstDayOfMonth = (firstDay.getDay() + 6) % 7;

    // Calculate number of days in the displayed month
    const daysInCurrentMonth = new Date(this.currentYear, this.displayedMonthIndex + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
  }

  getCalendarWeeks(): number[][] {
    const weeks: number[][] = [];
    let week: number[] = [];
  
    // Add empty cells to start the week on Monday
    for (let i = 0; i < this.firstDayOfMonth; i++) {
      week.push(0);
    }

    // Add actual days of the month
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
  
    return weeks;
  }

  changeMonth(offset: number) {
    // Adjust displayed month index and year based on the offset
    this.displayedMonthIndex += offset;

    // Handle month overflow and underflow
    if (this.displayedMonthIndex < 0) {
      this.displayedMonthIndex = 11;
      this.currentYear -= 1;
    } else if (this.displayedMonthIndex > 11) {
      this.displayedMonthIndex = 0;
      this.currentYear += 1;
    }

    this.loadEvents();
    this.generateCalendar();

  }
  hasEvent(day: number): boolean {
    return this.eventsByDate[day] && this.eventsByDate[day].length > 0;
  }
  getEventDetails(day: number): string {
    return this.eventsByDate[day].join('\n');
  }
}