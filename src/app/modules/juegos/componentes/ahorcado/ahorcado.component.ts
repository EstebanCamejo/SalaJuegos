import { Component } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../auth.service';


@Component({
  selector: 'app-ahorcado',
  standalone: false,
//  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  
  constructor(private authService: AuthService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  ngOnInit(): void {
    this.reiniciarJuego(); // Esto ya llama a obtenerPalabra()
    const usuario = this.authService.getUsuarioActualValue();
    if (usuario) {
      this.usuarioEmail = usuario.email;
    }

    this.obtenerPuntajes();
  }
  

  alfabeto: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  palabraOculta: string = '';
  letrasIngresadas: string[] = [];
  errores: number = 0;
  maxErrores: number = 6;
  palabraMostrada: string[] = [];
  supabase: SupabaseClient;
  usuarioEmail: string = '';
  puntajes: any[] = [];

  imagenesAhorcado: string[] = [
   '../../../../../assets/ahorcado1.png',
   '../../../../../assets/ahorcado2.png',
   '../../../../../assets/ahorcado3.png',
   '../../../../../assets/ahorcado4.png', 
   '../../../../../assets/ahorcado5.png',
   '../../../../../assets/ahorcado6.png',
   '../../../../../assets/ahorcado7.png',

    // 'assets/ahorcado1.png',
    // 'assets/ahorcado2.png',
    // 'assets/ahorcado3.png',
    // 'assets/ahorcado4.png', 
    // 'assets/ahorcado5.png',
    // 'assets/ahorcado6.png',
    // 'assets/ahorcado7.png',
  
  
  ];

  palabras: string[] = [
    'ANGULAR',
    'TYPESCRIPT',
    'ARCADE',
    'PIXEL',
    'JAVASCRIPT',
    'FIREBASE',
    'SUPABASE',
    'COMPONENTE',
    'RUTEO',
    'STANDALONE',
    'cielo',
    'mariposa',
    'ventana',
    'camino',
    'espejo',
    'montaña',
    'manzana',
    'libro',
    'amigo',
    'esperanza',
    'noche',
    'fuego',
    'tierra',
    'sol',
    'agua',
    'perro',
    'gato',
    'ciudad',
    'bosque',
    'palabra',
    'sueño',
    'silencio',
    'corazon',
    'mundo',
    'felicidad',
    'sonrisa',
    'estrella',
    'lluvia',
    'fuerza',
    'luz',
    'arbol',
    'casa',
    'puente',
    'piedra',
    'flor',
    'rojo',
    'verde',
    'azul',
    'negro',
    'blanco',
    'dulce',
    'fuerte',
    'grande',
    'pequeño',
    'alto',
    'largo',
    'ancho',
    'recto',
    'redondo',
    'claro',
    'oscuro',
    'nuevo',
    'viejo',
    'frio',
    'caliente',
    'tibio',
    'suave',
    'duro',
    'feliz',
    'triste',
    'rapido',
    'lento',
    'peligroso',
    'seguro',
    'sabio',
    'tonto',
    'fresco',
    'serio',
    'vivo',
    'muerto',
    'lento',
    'ligero',
    'fino',
    'grueso',
    'firme',
    'blando',
    'libre',
    'atado',
    'joven',
    'anciano',
    'dorado',
    'plateado',
    'brillante',
    'oscuro',
    'limpio',
    'sucio',
    'lleno',
    'vacio',
    'seco',
    'mojado',
    'rico',
    'pobre',
    'honesto',
    'mentiroso',
    'valiente',
    'miedoso',
    'justo',
    'injusto',
    'sabroso',
    'desagradable',
    'amargo',
    'picante',
    'alegre',
    'enojado',
    'enfermo',
    'sano',
    'hermoso',
    'feo',
    'caro',
    'barato',
    'famoso',
    'desconocido',
    'pesado',
    'ligero',
    'facil',
    'dificil',
    'amable',
    'cruel',
    'gracioso',
    'serio',
    'tranquilo',
    'ruidoso',
    'comodo',
    'incomodo',
    'corto',
    'largo',
    'delgado',
    'gordo',
    'estrecho',
    'ancho',
    'profundo',
    'superficial',
    'antiguo',
    'moderno',
    'fragil',
    'resistente',
    'frontal',
    'trasero',
    'proximo',
    'lejano',
    'abierto',
    'cerrado',
    'facil',
    'dificil',
    'importante',
    'insignificante',
    'perfecto',
    'imperfecto',
    'recto',
    'curvado',
    'redondo',
    'cuadrado',
    'triangular',
    'sincero',
    'hipocrita',
    'orgulloso',
    'humilde',
    'valioso',
    'insignificante',
    'contento',
    'disgustado',
    'maduro',
    'inmaduro',
    'lento',
    'veloz',
    'constante',
    'variable',
    'necesario',
    'innecesario',
    'fuerte',
    'debil',
    'alegre',
    'triste',
    'esperanzado',
    'desesperado',
    'optimista',
    'pesimista',
    'preciso',
    'vago',
    'concreto',
    'abstracto',
    'real',
    'irreal',
    'facil',
    'complicado',
    'amplio',
    'estrecho',
    'comodo',
    'incomodo',
    'firme',
    'flexible',
    'despacio',
    'deprisa',
    'seguro',
    'inseguro',
    'util',
    'inutil',
    'agradable',
    'desagradable',
    'bonito',
    'feo',
    'inteligente',
    'ignorante',
    'atento',
    'distraido',
    'complicado',
    'sencillo',
    'amplio',
    'reducido',
    'conocido',
    'desconocido',
    'barato',
    'caro',
    'normal',
    'extraño',
    'habitual',
    'infrecuente',
    'duro',
    'blando',
    'flexible',
    'rigido',
    'agradable',
    'molesto',
    'importante',
    'trivial',
    'necesario',
    'prescindible',
    'peligroso',
    'seguro',
    'activo',
    'pasivo',
    'creativo',
    'monotono',
    'logico',
    'irracional',
    'feliz',
    'desgraciado',
    'brillante',
    'opaco',
    'rico',
    'pobre',
    'optimista',
    'pesimista',
    'progresivo',
    'regresivo',
    'alegre',
    'melancolico',
    'duro',
    'suave',
    'tranquilo',
    'nervioso',
    'paciente',
    'impaciente',
    'veloz',
    'lento',
    'atento',
    'distraido',
    'clasico',
    'moderno',
    'aburrido',
    'emocionante',
    'positivo',
    'negativo',
    'puntual',
    'tardio',
    'brusco',
    'suave',
    'luminoso',
    'oscuro',
    'energico',
    'agotado',
    'lucido',
    'confuso',
    'sabroso',
    'insipido',
    'amargo',
    'dulce',
    'claro',
    'turbio',
    'entusiasmado',
    'indiferente',
    'calmado',
    'alterado',
    'capaz',
    'inutil',
    'ligero',
    'pesado',
    'distante',
    'cercano',
    'seco',
    'humedo',
    'fresco',
    'caliente',
    'frio',
    'tibio',
    'mojado',
    'seco',
    'ligero',
    'fuerte',
    'tierno',
    'tosco',
    'rapido',
    'lento',
    'horrible',
    'maravilloso',
    'bello',
    'feo',
    'normal',
    'extraordinario',
    'extraño',
    'corriente',
    'cansado',
    'descansado',
    'silencioso',
    'bullicioso',
    'ruidoso',
    'callado',
    'oscuro',
    'luminoso',
    'sereno',
    'tormentoso',
    'tranquilo',
    'alterado',
    'vivo',
    'muerto',
    'sano',
    'enfermo',
    'saludable',
    'malo',
    'bueno',
    'perfecto',
    'defectuoso',
    'limpio',
    'sucio',
    'ordenado',
    'desordenado',
    'hermoso',
    'feo',
    'apasionado',
    'indiferente',
    'ardiente',
    'frio',
    'valiente',
    'cobarde',
    'amable',
    'descortes',
    'sociable',
    'timido',
    'prudente',
    'temerario',
    'sabio',
    'ignorante',
    'alegre',
    'triste',
    'inteligente',
    'tonto',
    'habil',
    'torpe',
    'serio',
    'gracioso',
    'maduro',
    'infantil',
    'generoso',
    'tacaño',
    'humilde',
    'orgulloso',
    'simpatico',
    'antipatico',
    'optimista',
    'pesimista',
    'nervioso',
    'tranquilo',
    'decidido',
    'indeciso',
    'detallista',
    'despreocupado',
    'metodico',
    'improvisador',
    'educado',
    'maleducado',
    'honesto',
    'mentiroso',
    'justo',
    'injusto',
    'pacifico',
    'agresivo',
    'solidario',
    'egoista',
    'tolerante',
    'intolerante',
    'coherente',
    'incoherente',
    'constante',
    'inconstante',
    'valiente',
    'miedoso',
    'prudente',
    'temerario',
    'educado',
    'grosero',
    'tranquilo',
    'nervioso',
    'alegre',
    'melancolico',
    'cordial',
    'frio',
    'positivo',
    'negativo',
    'creativo',
    'conformista',
    'entusiasta',
    'apatico',
    'amable',
    'descortes',
    'ingenioso',
    'aburrido',
    'discreto',
    'indiscreto',
    'abierto',
    'cerrado',
    'fresco',
    'agotado',
    'sano',
    'enfermo',
    'valiente',
    'cobarde',
    'diligente',
    'perezoso',
    'curioso',
  ];

 
  
  obtenerPalabra() {
    const randomIndex = Math.floor(Math.random() * this.palabras.length);
    this.palabraOculta = this.palabras[randomIndex];
  
    // Inicializa la palabra mostrada como "_ _ _"
    this.palabraMostrada = Array(this.palabraOculta.length).fill('_');

  }
  

  getImagenAhorcado(): string {
    //return this.imagenesAhorcado[Math.min(this.errores, this.imagenesAhorcado.length - 1)];
    
      //return `assets/ahorcado${this.errores + 1}.png`;
      return `assets/ahorcado${this.errores}.png`;
    
    
  }
  

  arriesgarLetra(letra: string) {
    
    if (this.letrasIngresadas.includes(letra)) return;

    this.letrasIngresadas.push(letra);
  
    let letraAcertada = false;
  
    for (let i = 0; i < this.palabraOculta.length; i++) {
      if (this.palabraOculta[i].toUpperCase() === letra.toUpperCase()) {
        this.palabraMostrada[i] = this.palabraOculta[i];
        letraAcertada = true;
      }
    }
  
    if (!letraAcertada) {
      this.errores++;
    }

    //Victoria
    if(!this.palabraMostrada.includes('_')) {
      this.registrarPuntaje(true);
      setTimeout(() => {
        alert('¡Ganaste! 🎉 La palabra era: ' + this.palabraOculta);
        this.reiniciarJuego();
      }, 100);
    }
  
    //Derrota
    if (this.errores >= this.maxErrores) {
        this.registrarPuntaje(false);
        setTimeout(() => {
          alert('¡Perdiste! La palabra era: ' + this.palabraOculta);
          this.reiniciarJuego();
        }, 100);
      }
  }

  reiniciarJuego() {
    this.letrasIngresadas = [];
    this.errores = 0;
    this.obtenerPalabra();
  }

  async registrarPuntaje(gano: boolean) {
    const usuario = localStorage.getItem('usuarioEmail') || 'anonimo';
    const puntaje = gano ? 100 : 0;

    const error = await this.supabase.from('puntajes_ahorcado')   
    .insert([{
        email: usuario,
        puntaje: puntaje,
        resultado: gano ? 'ganó' : 'perdió',
        fecha: new Date().toISOString(),
    }]);

    if(error){
      console.error('Error al registrar el puntaje:', error);
    }
  }

  async obtenerPuntajes() {
    const { data, error } = await this.supabase
      .from('puntajes_ahorcado')
      .select('*')
      .order('fecha', { ascending: false })
      .limit(5); // Mostramos los últimos 5
  
    if (error) {
      console.error('Error al obtener puntajes:', error.message);
      return;
    }
  
    this.puntajes = data || [];
  }
  
}