import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBoxesComponent } from './info-boxes.component';

describe('InfoBoxesComponent', () => {
  let component: InfoBoxesComponent;
  let fixture: ComponentFixture<InfoBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
