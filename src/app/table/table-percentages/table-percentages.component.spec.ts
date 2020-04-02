import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePercentagesComponent } from './table-percentages.component';

describe('TablePercentagesComponent', () => {
  let component: TablePercentagesComponent;
  let fixture: ComponentFixture<TablePercentagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePercentagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
