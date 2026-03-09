import { Component, inject } from '@angular/core';
import { JuegologicaService } from '../../../services/juegologica';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-resultado',
  imports: [],
  templateUrl: './modal-resultado.html',
  styleUrl: './modal-resultado.css',
})

export class ModalResultado {

constructor(private logica: JuegologicaService) {
}
dialogRef = inject(MatDialogRef<ModalResultado>);// para la refefencia a mi mismo dialogo

get mensaje(): string {
    return this.logica.mensajeResultado;
}


  cerrar(): void {
    this.dialogRef.close();// con la referencia a mi mismo dialogo puedo cerrarlo con esta linea de codigo
    this.logica.inicializar(); // reiniciar el juego al cerrar el modal 
  }
}
