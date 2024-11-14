import { Component , OnInit} from '@angular/core';
import eventsData from '../../assets/sportData.json.json';
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

  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.displayedMonthIndex = today.getMonth(); // Set initial displayed month index to current month
    this.generateCalendar();
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

    // Regenerate the calendar for the updated month and year
    this.generateCalendar();
  }
}