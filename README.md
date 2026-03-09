# 4 en Línea

Juego de **4 en Línea** (Connect Four) implementado en Angular 20, usando Angular Signals para el manejo reactivo del estado.

## ¿Cómo jugar?

1. Haz click en **"Iniciar partida"** para ingresar los nombres de los jugadores.
2. Los jugadores se turnan haciendo click en una columna para soltar su ficha.
3. El primero en conectar **4 fichas en línea** (horizontal, vertical o diagonal) gana.
4. Si se llenan las 35 celdas sin ganador, el juego termina en empate.

## Tecnologías

- **Angular 20** (componentes standalone)
- **TypeScript 5.8**
- **Angular Signals** (reactividad sin zones)
- **Angular Material** (diálogos)
- **Tailwind CSS 4** + **Flowbite**

## Estructura del proyecto

```
src/app/
├── components/
│   ├── TableroComponent/     # Tablero de juego — renderiza la grilla 6x7
│   ├── forms/
│   │   ├── modal-general/    # Modal para ingresar nombres de jugadores
│   │   └── modal-resultado/  # Modal de resultado (ganador / empate)
│   └── footer/
└── services/
    └── juegologica.ts        # Lógica central: tablero, turnos, detección de ganador
```

## Detección de ganador

El `JuegologicaService` evalúa 4 direcciones después de cada movimiento:

- Horizontal
- Vertical
- Diagonal ↘ / ↖
- Diagonal ↙ / ↗

## Correr localmente

```bash
npm install
ng serve -o
```

Requiere [Node.js](https://nodejs.org/) y [Angular CLI](https://angular.dev/tools/cli).
