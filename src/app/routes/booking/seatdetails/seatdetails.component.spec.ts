import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatdetailsComponent } from './seatdetails.component';

describe('SeatdetailsComponent', () => {
  let component: SeatdetailsComponent;
  let fixture: ComponentFixture<SeatdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
