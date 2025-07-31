import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Modal {
  private _createModalOpen = new BehaviorSubject<boolean>(false);
  createModalOpen$ = this._createModalOpen.asObservable();

  openCreateModal() {
    this._createModalOpen.next(true);
  }

  closeCreateModal() {
    this._createModalOpen.next(false);
  }
}
