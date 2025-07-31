import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_ENDPOINTS} from '../../enviornments/enviornment';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class Tournament {
  constructor(private http: HttpClient,
              private userService: User) {
  }

  createTournament(body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-user-id': this.userService.getUserId(),
    });
    return this.http.post(`${API_ENDPOINTS.TOURNAMENTS}`, body, {headers: headers})
  }

  getAllTournaments() {
    return this.http.get<TournamentResponse[]>(`${API_ENDPOINTS.TOURNAMENTS}`)
  }

  deleteTournament(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-user-id': this.userService.getUserId(),
    });
    return this.http.delete(`${API_ENDPOINTS.TOURNAMENTS}/${id}`, {headers: headers})
  }
}

export interface TournamentResponse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}
