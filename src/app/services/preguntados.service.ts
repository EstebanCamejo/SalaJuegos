// src/app/services/preguntados.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}
  /**
   * Obtiene una pregunta aleatoria de la API de Rick and Morty.
   * @returns Un observable que emite un objeto con la imagen, opciones y respuesta correcta.
   * {
      imagen: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      opciones: ["Rick Sanchez", "Morty Smith", "Beth Smith", "Mr. Poopybutthole"],
      correcta: "Rick Sanchez"
    }
   */
  obtenerPregunta(): Observable<{ imagen: string, opciones: string[], correcta: string }> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(res => {
        const personajes = res.results;
        const correctoIndex = Math.floor(Math.random() * personajes.length);
        const personajeCorrecto = personajes[correctoIndex];

        const incorrectos = personajes
          .filter((_: any, i: number) => i !== correctoIndex) // Filtra todos los personajes excepto el correcto
          .sort(() => 0.5 - Math.random())// Mezcla aleatoriamente la lista
          .slice(0, 3)// Selecciona solo 3 personajes incorrectos
          .map((p: { name: any; }) => p.name); // Extrae sus nombres

        // Crea un array de opciones que incluye el personaje correcto y los incorrectos y los mezcla
        const opciones = [...incorrectos, personajeCorrecto.name].sort(() => 0.5 - Math.random());

        // Retorna el objeto con la imagen del personaje correcto, las opciones y la respuesta correcta
        return {
          imagen: personajeCorrecto.image,
          opciones,
          correcta: personajeCorrecto.name
        };
      })
    );
  }
}
