import { Component , OnInit} from '@angular/core';
import eventsData from '../../assets/sportData.json';
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


export class CalendarComponent implements OnInit{
  currentMonth: string = '';
  currentYear: number = 0;
  displayedMonthIndex: number = 0;
  daysInMonth: number[] = [];
  firstDayOfMonth: number = 0;
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  eventsByDate: EventsByDate = {};
  selectedDate: string = '';

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.displayedMonthIndex = today.getMonth();
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
        this.eventsByDate[day].push({ date: event.date });
      }
    });
  }
  
  

  generateCalendar() {
    this.currentMonth = new Date(this.currentYear, this.displayedMonthIndex).toLocaleString('default', { month: 'long' });
    const firstDay = new Date(this.currentYear, this.displayedMonthIndex, 1);
    this.firstDayOfMonth = (firstDay.getDay() + 6) % 7;
    const daysInCurrentMonth = new Date(this.currentYear, this.displayedMonthIndex + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
  }

  getCalendarWeeks(): number[][] {
    const weeks: number[][] = [];
    let week: number[] = [];
  
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
  
    return weeks;
  }

  changeMonth(offset: number) {
    this.displayedMonthIndex += offset;

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