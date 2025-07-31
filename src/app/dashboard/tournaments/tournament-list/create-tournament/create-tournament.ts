import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Tournament, TournamentResponse} from '../../../../services/tournament';
import {Modal} from '../../../../services/modal/modal';

@Component({
  selector: 'app-create-tournament',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-tournament.html',
  standalone: true,
  styleUrl: './create-tournament.css'
})
export class CreateTournament implements OnInit {
  @Input() tournamentForm!: FormGroup;
  @Output() tournamentCreated = new EventEmitter();
  showModal: boolean = false;

  constructor(private tournamentService: Tournament,
              private modalService: Modal) {
  }

  ngOnInit() {
    this.modalService.createModalOpen$.subscribe(state => {
      this.showModal = state;
    })
  }

  onClickSubmit() {
    if (this.tournamentForm.invalid) return;

    const {name, startDate, endDate} = this.tournamentForm.value;
    const payload = {
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    }
    this.tournamentService.createTournament(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.tournamentCreated.emit(true);
        this.showToast('Tournament created successfully');
      },
      error: (err) => {
        this.showToast('Error creating tournament', 'error');
      }
    });
    this.tournamentForm.reset();
    this.closeModal();
  }

  closeModal() {
    this.modalService.closeCreateModal();
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    alert(message);
  }
}
