import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css'
})
export class VerificacionComponent {
  imagenes = [
    { src: 'assets/faro.png', label: 'FARO', alt: 'Faro' },
    { src: 'assets/basurero.png', label: 'BASURERO', alt: 'Basurero' },
    { src: 'assets/avion.png', label: 'AVIÓN', alt: 'Avión' },
    { src: 'assets/balon.png', label: 'BALÓN', alt: 'Balón' },
    { src: 'assets/microscopio.png', label: 'MICROSCOPIO', alt: 'Microscopio' },
    { src: 'assets/microfono.png', label: 'MICRÓFONO', alt: 'Micrófono' },
    { src: 'assets/corazon.png', label: 'CORAZÓN', alt: 'Corazón' },
    { src: 'assets/mariposa.png', label: 'MARIPOSA', alt: 'Mariposa' },
    { src: 'assets/llave.png', label: 'LLAVE', alt: 'Llave' },
    { src: 'assets/paloma.png', label: 'PALOMA', alt: 'Paloma' }
  ];
}
