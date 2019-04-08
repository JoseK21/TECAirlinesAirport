import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningOfFlightComponent } from './opening-of-flight.component';

describe('OpeningOfFlightComponent', () => {
  let component: OpeningOfFlightComponent;
  let fixture: ComponentFixture<OpeningOfFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningOfFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningOfFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
