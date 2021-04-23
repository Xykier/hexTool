import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexNotesComponent } from './hex-notes.component';

describe('HexNotesComponent', () => {
  let component: HexNotesComponent;
  let fixture: ComponentFixture<HexNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HexNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HexNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
