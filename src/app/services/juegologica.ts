import { Injectable } from '@angular/core';
import {  signal } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class JuegologicaService {

  // Equivalente a: char[][] matriz = new char[6][7]  →  pero con number y 0=vacio, 1=jugador1, 2=jugador2
  tablero = signal<number[][]>([], { equal: () => false });
  private _turnoActual: number = 1;
  juegoTerminado = signal<boolean>(false); // usando variable de tipo signal
  movimientosTotal: number = 0;
  mensajeResultado: string = '';
  private _nombreJugador1: string = '';
  private _nombreJugador2: string = '';
  jugadas1: number = 0;
  jugadas2: number = 0;

  constructor() {
    this.inicializar();
  }

  // Equivalente al metodo rellenar() de Java - llena el tablero con ceros
  inicializar(): void {
    const nuevoTablero: number[][] = [];
    for (let i = 0; i < 6; i++) {
      nuevoTablero[i] = [];
      for (let j = 0; j < 7; j++) {
        if (i == 0) {
          nuevoTablero[i][j] = 3;
        } else {
          nuevoTablero[i][j] = 0; // 0 = vacio (equivale a '_' en Java)
        }
      }
    }
    this.tablero.set(nuevoTablero);
    this._turnoActual = 1;
    this.juegoTerminado.set(false);
    this.movimientosTotal = 0;
    this.mensajeResultado = '';
    this.jugadas1 = 0;
    this.jugadas2 = 0;
  }

  // Equivalente a conteoArribaEncontrando() - busca la fila mas baja disponible en una columna
  conteoArribaEncontrando(columna: number): number {
    for (let i = this.tablero().length - 1; i > -1; i--) {
      if (this.tablero()[i][columna] === 0) {
        return i;
      }
    }
    return -1; // columna llena
  }

  // Equivalente a insertarFicha() de Java
  insertarFicha(columna: number, ficha: number): void {
    const fila = this.conteoArribaEncontrando(columna);
    if (fila !== -1 && this.tablero()[fila][columna] === 0) {
      this.movimientosTotal++;
      this.tablero()[fila][columna] = ficha;
      this.tablero.set(this.tablero()); // notificar a Angular que el tablero cambio
    }
  }

  // ──────────────────────────────────────────────────────
  // HORIZONTAL
  // ──────────────────────────────────────────────────────

  // Equivalente a conteoFrente() - cuenta hacia la derecha
  conteoFrente(fila: number, columna: number, ficha: number): number {
    let salida = 0;
    for (let j = columna; j < 7; j++) {
      if (this.tablero()[fila][j] === ficha) {
        salida++;
      } else {
        break;
      }
    }
    return salida;
  }

  // Equivalente a conteoAtras() - cuenta hacia la izquierda
  conteoAtras(fila: number, columna: number, ficha: number): number {
    let salida = 0;
    for (let j = columna; j > -1; j--) {
      if (this.tablero()[fila][j] === ficha) {
        salida++;
      } else {
        break;
      }
    }
    return salida;
  }

  // Equivalente a ganoHorizontal() - suma derecha + izquierda, si > 4 gano
  ganoHorizontal(fila: number, columna: number, ficha: number): boolean {
    if (this.conteoFrente(fila, columna, ficha) + this.conteoAtras(fila, columna, ficha) > 4) {
      this.mensajeResultado = 'gano de manera Horizontal';
      return true;
    }
    return false;
  }

  // ──────────────────────────────────────────────────────
  // VERTICAL
  // ──────────────────────────────────────────────────────

  // Equivalente a conteoAbajo() - cuenta hacia abajo
  conteoAbajo(fila: number, columna: number, ficha: number): number {
    let salida = 0;
    for (let i = fila; i < 6; i++) {
      if (this.tablero()[i][columna] === ficha) {
        salida++;
      } else {
        break;
      }
    }
    return salida;
  }

  // Equivalente a conteoArriba() - cuenta hacia arriba
  conteoArriba(fila: number, columna: number, ficha: number): number {
    let salida = 0;
    for (let i = fila; i > -1; i--) {
      if (this.tablero()[i][columna] === ficha) {
        salida++;
      } else {
        break;
      }
    }
    return salida;
  }

  // Equivalente a ganoVertical() - suma arriba + abajo, si > 4 gano
  ganoVertical(fila: number, columna: number, ficha: number): boolean {
    if (this.conteoArriba(fila, columna, ficha) + this.conteoAbajo(fila, columna, ficha) > 4) {
      this.mensajeResultado = 'gano de manera vertical';
      return true;
    }
    return false;
  }

  // ──────────────────────────────────────────────────────
  // DIAGONAL PRINCIPAL  ↘ y ↖
  // ──────────────────────────────────────────────────────

  // Equivalente a inclinadoParesAdelante() - diagonal hacia abajo-derecha ↘
  inclinadoParesAdelante(fila: number, columna: number, ficha: number): number {
    let salida = 0;
    for (let i = fila, j = columna; i < 6 && j < 7; i++, j++) {
      if (this.tablero()[i][j] === ficha) {
        salida++;
      } else {
        break;
      }
    }
    return salida;
  }

  // Equivalente a inclinadoParesAtras() - diagonal hacia arriba-izquierda ↖
  inclinadoParesAtras(fila: number, columna: number, ficha: number): number {
    let salida = 0;
    for (let i = fila, j = columna; i > -1 && j > -1; i--, j--) {
      if (this.tablero()[i][j] === ficha) {
        salida++;
      } else {
        break;
      }
    }
    return salida;
  }

  // Equivalente a ganoInclinadoPrincipal()
  ganoInclinadoPrincipal(fila: number, columna: number, ficha: number): boolean {
    if (this.inclinadoParesAdelante(fila, columna, ficha) + this.inclinadoParesAtras(fila, columna, ficha) > 4) {
      this.mensajeResultado = 'gano Diagonal Principal';
      return true;
    }
    return false;
  }

  // ──────────────────────────────────────────────────────
  // DIAGONAL SECUNDARIA  ↙ y ↗
  // ──────────────────────────────────────────────────────

  // Equivalente a conteoAtrasDiagonalSecundaria() - diagonal hacia abajo-izquierda ↙
  conteoAtrasDiagonalSecundaria(fila: number, columna: number, ficha: number): number {
    let salida = 0;
    for (let i = fila, j = columna; i < 6 && j > -1; i++, j--) {
      if (this.tablero()[i][j] === ficha) {
        salida++;
      } else {
        break;
      }
    }
    return salida;
  }

  // Equivalente a conteoAdelanteDiagonalSecundaria() - diagonal hacia arriba-derecha ↗
  conteoAdelanteDiagonalSecundaria(fila: number, columna: number, ficha: number): number {
    let salida = 0;
    for (let i = fila, j = columna; i > -1 && j < 7; i--, j++) {
      if (this.tablero()[i][j] === ficha) {
        salida++;
      } else {
        break;
      }
    }
    return salida;
  }

  // Equivalente a ganoInclinadoSecundario()
  ganoInclinadoSecundario(fila: number, columna: number, ficha: number): boolean {
    if (this.conteoAdelanteDiagonalSecundaria(fila, columna, ficha) + this.conteoAtrasDiagonalSecundaria(fila, columna, ficha) > 4) {
      this.mensajeResultado = 'gano Diagonal Secundaria';
      return true;
    }
    return false;
  }

  // ──────────────────────────────────────────────────────
  // EMPATE Y GANADOR GENERAL
  // ──────────────────────────────────────────────────────

  // Equivalente a evalua() - chequea empate
  evalua(): void { // cuando llamo a una variable signal es con parentesis como un metodo 
    if (!this.juegoTerminado() && this.movimientosTotal === 35) {
      this.mensajeResultado = 'Empataron, vamos de nuevo!';
      this.juegoTerminado.set(true); // para cambiar una varibale de tipo signna se hace .set() y se le pasa el nuevo valor que queremos asignar a esa variable
    }
  }

  // Equivalente a ganadorGeneral() de Java
  ganadorGeneral(columna: number, ficha: number): boolean {
    // Despues de insertar, conteoArribaEncontrando da la fila de arriba.
    // Sumando 1 recuperamos la fila donde se coloco la ficha.
    const fila = 1 + this.conteoArribaEncontrando(columna);

    if (ficha === 1) {
      this.jugadas1++;
    } else {
      this.jugadas2++;
    }

    this.evalua();

    if (
      this.ganoHorizontal(fila, columna, ficha) ||
      this.ganoVertical(fila, columna, ficha) ||
      this.ganoInclinadoPrincipal(fila, columna, ficha) ||
      this.ganoInclinadoSecundario(fila, columna, ficha)
    ) {
      if (ficha === 1) {
        this.mensajeResultado += ` - Gano el jugador ${this.nombreJugador1}`;
          this.juegoTerminado.set(true);
      return true;
      } else {    
      this.mensajeResultado += ` - Gano el jugador ${this.nombreJugador2}`;
      this.juegoTerminado.set(true);
      return true;
      }
    }

    return false;
  }

  // Metodo principal que usa el componente: recibe la columna donde el jugador hizo clic
  soltarFicha(columna: number): void {
    if (this.juegoTerminado()) return;

    const filaDisponible = this.conteoArribaEncontrando(columna);
    if (filaDisponible === -1) return; // columna llena

    const ficha = this._turnoActual;
    this.insertarFicha(columna, ficha);
    this.ganadorGeneral(columna, ficha);

    if (!this.juegoTerminado()) {
      this._turnoActual = this._turnoActual === 1 ? 2 : 1;
    }
  }


  get nombreJugador1(): string {
    return this._nombreJugador1;
  }

  get nombreJugador2(): string {
    return this._nombreJugador2;
  }

  set nombreJugador1(nombre: string) {
    this._nombreJugador1 = nombre;
  } 
  set nombreJugador2(nombre: string) { 
    this._nombreJugador2 = nombre;
  }

  get turnoActual(): number {
    return this._turnoActual;
  }


}



