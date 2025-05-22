import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css',
})
export class VerificacionComponent implements OnInit {
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
    { src: 'assets/paloma.png', label: 'PALOMA', alt: 'Paloma' },
  ];

  preguntasUsuario: any[] = [];
  preguntaActual: any = null;
  respuestaIngresada: string = '';
  intentosFallidos: number = 0;
  imagenSeleccionada: string = '';
  usuarioId: number = 0;

  respuestaCorrecta: boolean | null = null;
  mensajeError: string = '';
  imagenEsCorrecta: boolean | null = null;
  nombreUsuario: string = '';

  imagenSeleccionadaNombre: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    const id = localStorage.getItem('usuarioId');
    if (id) {
      this.usuarioService.obtenerDetalle(+id).subscribe((detalle) => {
        this.nombreUsuario = detalle.username;
        this.preguntasUsuario = detalle.preguntas;
        this.seleccionarPreguntaAleatoria();
        this.usuarioId = parseInt(id, 10);

        // Barajar las imágenes al iniciar sesión
        this.imagenes = this.shuffleArray(this.imagenes);
      });
    }
  }

  // Función para barajar un array
  private shuffleArray(array: any[]): any[] {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  seleccionarPreguntaAleatoria(): void {
    const preguntasRestantes = this.preguntasUsuario.filter(
      (p) => p !== this.preguntaActual
    );
    this.preguntaActual =
      preguntasRestantes.length > 0
        ? preguntasRestantes[
            Math.floor(Math.random() * preguntasRestantes.length)
          ]
        : this.preguntasUsuario[
            Math.floor(Math.random() * this.preguntasUsuario.length)
          ];

    this.respuestaIngresada = '';
    this.intentosFallidos = 0;
    this.respuestaCorrecta = null;
    this.mensajeError = '';
    this.imagenEsCorrecta = null;
  }

  verificarRespuestaTiempoReal(): void {
    if (this.respuestaIngresada.trim() === '') {
      this.respuestaCorrecta = null;
      this.mensajeError = '';
      return;
    }

    this.respuestaCorrecta =
      this.preguntaActual?.respuesta === this.respuestaIngresada.trim();
    this.mensajeError = this.respuestaCorrecta
      ? ''
      : 'Por favor, responda correctamente a la pregunta de seguridad';

    // Validar nuevamente imagen si ya fue seleccionada
    if (this.imagenSeleccionadaNombre) {
      this.validarImagenDesdeClick(this.imagenSeleccionadaNombre);
    }
  }

  seleccionarImagenDesdeSrc(src: string): void {
    const nombre = src.split('/').pop();
    this.imagenSeleccionada = src;
    this.imagenSeleccionadaNombre = nombre ?? '';
    this.validarImagenDesdeClick(this.imagenSeleccionadaNombre);
  }

  validarImagenDesdeClick(nombre: string): void {
    if (!nombre || !this.usuarioId) return;

    this.usuarioService.validarImagen(this.usuarioId, nombre).subscribe({
      next: (resp) => {
        this.imagenEsCorrecta = resp.includes('correcta');
      },
      error: () => {
        this.imagenEsCorrecta = false;
      },
    });
  }

  validarImagen(): void {
    if (!this.respuestaCorrecta) {
      Swal.fire({
        icon: 'warning',
        title: 'Pregunta de seguridad',
        text: 'Debe responder correctamente la pregunta de seguridad.',
        confirmButtonColor: '#2e7d32',
      });
      return;
    }

    if (!this.imagenEsCorrecta) {
      Swal.fire({
        icon: 'error',
        title: 'Imagen incorrecta',
        text: 'La imagen seleccionada no es válida.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    localStorage.setItem('imagenValidada', 'true');
    this.router.navigate(['/estado-cuenta']);
  }
}
