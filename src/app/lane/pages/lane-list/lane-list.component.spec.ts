import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaneListComponent } from './lane-list.component';

describe('LaneListComponent', () => {
  let component: LaneListComponent;
  let fixture: ComponentFixture<LaneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaneListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
