import { Component, inject} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';
import { JuegologicaService } from '../../../services/juegologica';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-general',
  imports: [],
  templateUrl: './modal-general.html',
  styleUrl: './modal-general.css',
})
export class ModalGeneral {
  dialogRef = inject(MatDialogRef<ModalGeneral>);// para la refefencia a mi mismo dialogo
 
  private data = inject(MAT_DIALOG_DATA);// datos que se pasan al abrir el modal desde se decaran aqui pero se padan en el cuerp del invocador del modal 
  constructor(private logica: JuegologicaService) {}

  
  enviar(nombre: string):void{
    if (this.data.contador == 0) {
      this.logica.nombreJugador1 = nombre;
    } else {
      this.logica.nombreJugador2 = nombre;
    }
  

    this.dialogRef.close();
  }
}
