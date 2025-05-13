import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class MayorMenorService {
    constructor(private http: HttpClient) {}
  
    obtenerMazo(): Observable<any> {
      return this.http.get(
        'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
      );
    }
  
    obtenerCarta(mazoId: string): Observable<any> {
      return this.http.get(
        'https://www.deckofcardsapi.com/api/deck/${mazoId}/draw/?count=1',
      );
    }
  
    mezclarCartas(mazoId: string): Observable<any> {
      return this.http.get(
        'https://www.deckofcardsapi.com/api/deck/${mazoId}/shuffle/',
      );
    }
  
    devolverCartas(mazoId: string): Observable<any> {
      return this.http.get(
        'https://www.deckofcardsapi.com/api/deck/${mazoId}/return/',
      );
    }
  }