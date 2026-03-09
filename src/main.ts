import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)// pasamos la configuración de la aplicación osea que superpoderres tienes la app "Trae la configuración (rutas, detecciones de cambios, etc.) porque la voy a necesitar para que el motor arranque bien".
  .catch((err) => console.error(err));
