import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-calendar-element',
  templateUrl: './calendar-element.component.html',
  styleUrls: ['./calendar-element.component.scss']
})
export class CalendarElementComponent implements OnInit, AfterViewInit {

  $calendar: any;

  calendarOptions: any = {
    // isRTL: true,
    locale: 'de',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    buttonIcons: { // note the space at the beginning
      prev: ' fa fa-caret-left',
      next: ' fa fa-caret-right'
    },
    buttonText: {
      today: 'heute',
      month: 'monat',
      week: 'woche',
      day: 'tag'
    },
    editable: true,
    droppable: true,
    eventClick: this.eventClick.bind(this),
    dayClick: this.dayClick.bind(this)
  };

  calendarEvents: Array<any> = [];
  selectedEvent = null;

  // reference to the calendar element
  @ViewChild('fullcalendar') fullcalendar: ElementRef;

  constructor() {
    this.calendarOptions.events = this.calendarEvents;
  }

  ngOnInit() {
    console.log(this.fullcalendar);
    this.$calendar = $(this.fullcalendar.nativeElement);
  }

  ngAfterViewInit() {
    // init calendar plugin
    this.$calendar.fullCalendar(this.calendarOptions);
  }

  eventClick(calEvent, jsEvent, view) {

    this.selectedEvent = {
      title: calEvent.title,
      start: calEvent.start,
      url: calEvent.url || ''
    };

    console.log('Event: ' + calEvent.title);
    console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    console.log('View: ' + view.name);

  }

  dayClick(date, jsEvent, view) {
    this.selectedEvent = {
      date: date.format()
    };
  }

}

