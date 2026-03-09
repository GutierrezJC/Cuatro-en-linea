import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Footer } from './components/footer/footer';
import { TableroComponent } from './components/TableroComponent/tablero';
import { MatDialog } from '@angular/material/dialog';
import { ModalGeneral } from './components/forms/modal-general/modal-general';

@Component({
  selector: 'app-root',
  imports: [Footer, TableroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    initFlowbite();
  }

  llamadainserciondedatosjugadores() {
    const dialogRef = this.dialog.open(ModalGeneral, {
      width: '400px',
      maxHeight: '100vh',
      data: { contador: 0 },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.open(ModalGeneral, {
        width: '400px',
        maxHeight: '100vh',
        data: { contador: 1 },
        disableClose: true
      });
    });
  }


}