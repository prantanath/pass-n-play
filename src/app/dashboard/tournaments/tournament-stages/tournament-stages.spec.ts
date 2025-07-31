import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentStages } from './tournament-stages';

describe('TournamentStages', () => {
  let component: TournamentStages;
  let fixture: ComponentFixture<TournamentStages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentStages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentStages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
