import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaColombiaComponent } from './mapa-colombia.component';

describe('MapaColombiaComponent', () => {
  let component: MapaColombiaComponent;
  let fixture: ComponentFixture<MapaColombiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaColombiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaColombiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
