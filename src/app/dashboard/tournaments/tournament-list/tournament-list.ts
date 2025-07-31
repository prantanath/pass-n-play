import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Tournament, TournamentResponse} from '../../../services/tournament';
import {CreateTournament} from './create-tournament/create-tournament';
import {Modal} from '../../../services/modal/modal';

@Component({
  selector: 'app-tournament-list',
  imports: [
    DatePipe,
    CreateTournament,
    FormsModule,
  ],
  templateUrl: './tournament-list.html',
  standalone: true,
  styleUrl: './tournament-list.css'
})
export class TournamentList implements OnInit {
  tournamentForm: FormGroup;
  tournaments: TournamentResponse [] = [];
  showModal: boolean = false;
  tournamentId!: string;

  constructor(private fb: FormBuilder,
              private tournamentService: Tournament,
              private modalService: Modal) {
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadTournaments();
  }

  loadTournaments() {
    this.tournamentService.getAllTournaments().subscribe({
      next: (res) => {
        this.tournaments = res;
      }
    });
  }


  openCreateModal() {
    this.modalService.openCreateModal();
  }

  viewTournament(tournament: any) {
    console.log('View', tournament);
  }

  editTournament(tournament: any) {
    console.log('Edit', tournament);
  }

  deleteTournament(id: string) {
    this.tournamentId = id;
    const modalCheckbox = document.getElementById('delete-confirm-modal') as HTMLInputElement;
    if (modalCheckbox) modalCheckbox.checked = true;
  }

  cancelDelete() {
    this.showModal = false;
    this.tournamentId = '';
  }

  confirmDelete() {
    if (!this.tournamentId) return;

    this.tournamentService.deleteTournament(this.tournamentId).subscribe({
      next: () => {
        this.tournaments = this.tournaments.filter(t => t.id !== this.tournamentId);
        this.showToast('Tournament deleted successfully');
        this.cancelDelete();
      },
      error: () => {
        this.showToast('Error deleting tournament', 'error');
        this.cancelDelete();
      }
    });
  }

  onTournamentCreated(tournament: Tournament) {
    this.loadTournaments();
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    alert(message);
  }
}
