// cartas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartasService {

  private baseUrl = 'https://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) {}

  obtenerMazo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/new/shuffle/?deck_count=1`);
  }

  obtenerCarta(mazoId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${mazoId}/draw/?count=1`);
  }
}
