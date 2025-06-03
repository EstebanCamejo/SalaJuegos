// src/app/services/emoji-game.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para generar un tablero de emojis para el juego "¿Cuál es diferente?".
 * El tablero es una matriz de emojis donde uno de ellos es diferente al resto.
 * {
    tablero: [
        ['😀','😀','😀'],
        ['😀','😃','😀'],
        ['😀','😀','😀']
    ],
    diferente: { fila: 1, columna: 1 },
    emojiDiferente: '😃'
    }
 */
export class EmojiService {

  private emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉'];

  constructor() {}

  /**
   * 
    - Define un método generarTablero que recibe un nivel y devuelve un objeto con:
    - tablero: Una matriz de emojis.
    - diferente: La posición del emoji diferente.
    - emojiDiferente: El emoji distinto al resto.
   */
  generarTablero(nivel: number): { tablero: string[][], diferente: { fila: number, columna: number }, emojiDiferente: string } {
    //- Calcula el tamaño del tablero, que empieza en 3x3 y crece con el nivel hasta un máximo de 8x8.
    const size = Math.min(3 + nivel, 8); 
    //- baseEmoji: Se selecciona un emoji aleatorio que será el predeterminado en el tablero.
    const baseEmoji = this.getEmojiAleatorio();
    //- emojiDiferente: Se selecciona otro emoji aleatorio que será el diferente al resto.
    let emojiDiferente = this.getEmojiAleatorio();

    // - Asegura que emojiDiferente no sea igual al baseEmoji.
    //- Si es igual, vuelve a seleccionar otro hasta que sean diferentes.
    
    while (emojiDiferente === baseEmoji) {
      emojiDiferente = this.getEmojiAleatorio();
    }

    //- Crea un tablero de tamaño size x size lleno del baseEmoji.
    const tablero: string[][] = Array(size).fill('').map(() => Array(size).fill(baseEmoji));
    //- Selecciona una posición aleatoria dentro del tablero para colocar el emojiDiferente.
    //- Utiliza Math.random() para obtener una fila y columna aleatorias.
    const filaDiferente = Math.floor(Math.random() * size);
    //- Asegura que la fila y columna seleccionadas estén dentro del rango del tablero.
    const columnaDiferente = Math.floor(Math.random() * size);


    //- Coloca el emojiDiferente en la posición aleatoria seleccionada.
    tablero[filaDiferente][columnaDiferente] = emojiDiferente;

    return {
      tablero,
      diferente: { fila: filaDiferente, columna: columnaDiferente },
      emojiDiferente
    };
  }

  /**
   * Método privado para obtener un emoji aleatorio de la lista de emojis.
   * @returns Un emoji aleatorio.
   */
  private getEmojiAleatorio(): string {
    //- Utiliza Math.random() para seleccionar un emoji aleatorio de la lista.
    const index = Math.floor(Math.random() * this.emojis.length);
    return this.emojis[index];
  }
}
