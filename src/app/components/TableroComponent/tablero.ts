import { Component } from '@angular/core';
import { effect } from '@angular/core';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { JuegologicaService } from '../../services/juegologica';
import { ModalResultado } from '../forms/modal-resultado/modal-resultado';

@Component({
  selector: 'app-tablero',
  imports: [],
  templateUrl: './tablero.html',
  styleUrl: './tablero.css',
})
export class TableroComponent {
  private readonly dialog = inject(MatDialog);
  columnaHover: number = -1;

  constructor(private logica: JuegologicaService) {// Inicializar el tablero con ceros y ademas en el contructoe puedo hacer todo lo que ocupo que angular haga de una vez  , y ahi llamo tambien a los servicios que ocupo para el juego 
    effect(() => {
      if (this.logica.juegoTerminado()) {// voy a vigilar a juego terminaldo
        // levanta un modal  se haec con estas linas de MatDiolog y se le pasa el componente del modal que quiero abrir, en este caso ModalResultado, y ademas se le pueden pasar otras opciones como el tamaño del modal, si se puede cerrar o no, etc.
          this.dialog.open(ModalResultado, {
          });

      }
    });
  }
  // getter directo a la logica del juego para obtener el tablero y mostrarlo en el html
  get tablero(): number[][] {// angular sabe por el nombre que tiene que aqui esta tablero yque tablero es de tipo signal porque es un getter y ademas es de tipo number[][] porque el tablero es una matriz de numeros, entonces angular sabe que cuando se llame a tablero en el html tiene que llamar a este getter y devolver el valor del tablero que esta en la logica del juego, y ademas como es un signal angular sabe que tiene que actualizar el html cada vez que el tablero cambie
    return this.logica.tablero();
  }

  

  getClase(valor: number, esColumnaHover: boolean = false): string {// aqui en ts primero se pasa el valor y despues el tipo de dato
    if (valor === 3 && esColumnaHover) {// valor 3 solo existe en fila 0 — si es la columna hover, se pinta del color del turno
      return this.logica.turnoActual === 1 ? 'ficha jugador1' : 'ficha jugador2';
    }
    if (valor === 1) return 'ficha jugador1';
    if (valor === 2) return 'ficha jugador2';
    if (valor === 3) return 'ficha neutral';
    return 'ficha vacia';
  }

  alguienClickeo(columna: number) { // (click, input, etc.), se le puede poner el nombre que se quiera pero es importante que se le pase el parametro de la columna para saber en que columna se hizo click y asi poder colocar la ficha del jugador en esa columna
    this.logica.soltarFicha(columna);
    // Aqui se puede agregar la logica para colocar la ficha del jugador en la columna correspondiente
  }

  get juegoTerminado(): boolean { // regitro de tipo get de una variable que es una signal para que el html pueda actualizarse automaticamente cuando esta variable cambie, en este caso es para saber si el juego termino o no y asi mostrar el modal de resultado
    return this.logica.juegoTerminado();
  }
  get turnoActual(): number { 
    return this.logica.turnoActual;
  }



}
