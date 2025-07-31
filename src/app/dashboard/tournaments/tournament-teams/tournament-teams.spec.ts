import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentTeams } from './tournament-teams';

describe('TournamentTeams', () => {
  let component: TournamentTeams;
  let fixture: ComponentFixture<TournamentTeams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentTeams]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentTeams);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
