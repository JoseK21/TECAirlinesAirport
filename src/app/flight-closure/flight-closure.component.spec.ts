import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightClosureComponent } from './flight-closure.component';

describe('FlightClosureComponent', () => {
  let component: FlightClosureComponent;
  let fixture: ComponentFixture<FlightClosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightClosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
