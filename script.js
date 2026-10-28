/* =========================================================
   UN AÑO DE PABLO & CARLA — script.js
   Todo en JavaScript puro, sin librerías.
   ========================================================= */

/* ---------- 0. CONFIGURACIÓN (cambia aquí tus datos) ---------- */
const CONFIG = {
  // Fecha en que empezasteis a salir (contador principal)
  fechaJuntos: new Date(2026, 2, 21, 0, 0, 0),      // 21 de marzo de 2026 (los meses empiezan en 0)
  // Fecha en que os conocisteis
  fechaConocernos: new Date(2025, 10, 1, 0, 0, 0),  // 1 de noviembre de 2025

  // Contraseñas válidas del candado (solo cuentan los números que escriba).
  // OJO: esto es un "candado de broma"; cualquiera que mire el código puede verla.
  claves: ['2103', '21032026', '210326'],

  // Kilómetros entre vuestras casas y número de viajes (de cualquiera de los dos).
  km: 350,
  numeroDeViajes: 3,   // ⚠️ CAMBIA: por lo que me contaste son al menos 3; seguro que son más

  // Tu WhatsApp con prefijo de país y sin espacios, p. ej. '34600111222'.
  // Si lo dejas así, WhatsApp le dejará elegir a quién mandarlo.
  telefono: '[TELÉFONO]'
};

/* ---------- 1. UTILIDADES ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Almacenamiento seguro (puede fallar en modo privado)
const almacen = {
  leer(tipo, clave) {
    try { return window[tipo].getItem(clave); } catch (e) { return null; }
  },
  guardar(tipo, clave, valor) {
    try { window[tipo].setItem(clave, valor); } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }
};

// Enlace de WhatsApp con el mensaje ya escrito
function enlaceWhatsApp(mensaje) {
  const numero = String(CONFIG.telefono).replace(/\D/g, '');
  const base = numero ? `https://wa.me/${numero}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(mensaje)}`;
}

// Lluvia de corazones (y algún sushi, porque sí)
function lluviaDeCorazones(cantidad = 36) {
  if (prefiereMenosMovimiento) return;
  const emojis = ['💗', '💕', '💖', '💗', '🍣', '💞'];
  for (let i = 0; i < cantidad; i++) {
    const el = document.createElement('span');
    el.className = 'lluvia';
    el.setAttribute('aria-hidden', 'true');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.setProperty('--tam', `${18 + Math.random() * 26}px`);
    el.style.setProperty('--dur', `${2.4 + Math.random() * 2.4}s`);
    el.style.setProperty('--giro', `${(Math.random() * 720 - 360).toFixed(0)}deg`);
    el.style.animationDelay = `${Math.random() * .9}s`;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

/* ---------- 2. CANDADO DE ENTRADA ---------- */
(function candado() {
  const caja = $('#candado');
  if (!caja) return;

  const zonas = $$('[data-bloqueable]');
  const form = $('#candado-form');
  const input = $('#candado-input');
  const mensaje = $('#candado-mensaje');
  const pista = $('#candado-pista');
  const tarjeta = $('.candado__caja', caja);

  const fallos = [
    'Mmm, no. ¿Seguro que eres Carla? 🤨',
    'Casi… (mentira, no estás ni cerca)',
    'Piensa en primavera 🌸',
    'Te doy otra pista: es de marzo.',
    'Vale, la pista definitiva: el 21.'
  ];
  let intentos = 0;

  // Ya desbloqueado en esta sesión
  if (almacen.leer('sessionStorage', 'pc-desbloqueado') === '1') {
    caja.remove();
    return;
  }

  // Bloqueamos el resto de la página mientras tanto
  zonas.forEach(z => { z.inert = true; });
  document.body.classList.add('bloqueado');
  setTimeout(() => input.focus(), 150);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valor = input.value.replace(/\D/g, '');

    if (CONFIG.claves.includes(valor)) {
      almacen.guardar('sessionStorage', 'pc-desbloqueado', '1');
      mensaje.textContent = '¡Hola, Carla! 💗';
      zonas.forEach(z => { z.inert = false; });
      document.body.classList.remove('bloqueado');
      caja.classList.add('candado--abierto');
      lluviaDeCorazones(30);
      setTimeout(() => {
        caja.remove();
        const destino = $('#contenido');
        if (destino) { destino.setAttribute('tabindex', '-1'); destino.focus({ preventScroll: true }); }
      }, prefiereMenosMovimiento ? 0 : 700);
    } else {
      mensaje.textContent = fallos[Math.min(intentos, fallos.length - 1)];
      intentos++;
      tarjeta.classList.remove('temblor');
      void tarjeta.offsetWidth; // reinicia la animación
      tarjeta.classList.add('temblor');
      input.select();
    }
  });

  pista.addEventListener('click', () => {
    mensaje.textContent = 'Pista: el día en que lo hicimos oficial. Formato DDMM.';
    input.focus();
  });
})();

/* ---------- 3. MENÚ HAMBURGUESA ---------- */
(function menu() {
  const boton = $('#menu-toggle');
  const nav = $('#menu');
  if (!boton || !nav) return;

  const abrir = (abierto) => {
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('abierto', abierto);
    document.body.style.overflow = abierto ? 'hidden' : '';
  };

  boton.addEventListener('click', () => abrir(boton.getAttribute('aria-expanded') !== 'true'));

  // Cerrar al pulsar un enlace
  $$('a', nav).forEach(a => a.addEventListener('click', () => abrir(false)));

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') {
      abrir(false);
      boton.focus();
    }
  });

  // Si se pasa a escritorio con el menú abierto, lo reseteamos
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches) abrir(false); });

  // Borde de la cabecera al hacer scroll
  const cabecera = $('#cabecera');
  const alScroll = () => cabecera && cabecera.classList.toggle('con-borde', window.scrollY > 10);
  window.addEventListener('scroll', alScroll, { passive: true });
  alScroll();
})();

/* ---------- 4. FOTOS QUE FALTAN ---------- */
// Si una foto no existe todavía, el hueco muestra qué foto va ahí.
(function fotos() {
  $$('.foto img').forEach(img => {
    const marcar = () => img.closest('.foto').classList.add('sin-foto');
    if (img.complete && img.naturalWidth === 0) marcar();
    img.addEventListener('error', marcar);
  });
})();

/* ---------- 5. ANIMACIONES AL HACER SCROLL ---------- */
(function reveal() {
  const elementos = $$('[data-reveal]');
  if (!('IntersectionObserver' in window) || prefiereMenosMovimiento) {
    elementos.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  elementos.forEach(el => obs.observe(el));
})();

/* ---------- 6. CONTADOR EN VIVO ---------- */
(function contador() {
  const reloj = $('#reloj');
  const diasCinta = $$('[data-dias]');
  if (!reloj && !diasCinta.length) return;

  const dia = 864e5;
  const unidades = reloj ? {
    dias: $('[data-unidad="dias"]', reloj),
    horas: $('[data-unidad="horas"]', reloj),
    minutos: $('[data-unidad="minutos"]', reloj),
    segundos: $('[data-unidad="segundos"]', reloj)
  } : null;
  const fmt = new Intl.NumberFormat('es-ES');

  function tic() {
    const diff = Math.max(0, Date.now() - CONFIG.fechaJuntos.getTime());
    const d = Math.floor(diff / dia);
    const h = Math.floor(diff / 36e5) % 24;
    const m = Math.floor(diff / 6e4) % 60;
    const s = Math.floor(diff / 1e3) % 60;

    diasCinta.forEach(el => { el.textContent = fmt.format(d); });
    if (!unidades) return;
    unidades.dias.textContent = fmt.format(d);
    unidades.horas.textContent = String(h).padStart(2, '0');
    unidades.minutos.textContent = String(m).padStart(2, '0');
    unidades.segundos.textContent = String(s).padStart(2, '0');

    // pequeño latido en los segundos
    unidades.segundos.classList.remove('latido');
    void unidades.segundos.offsetWidth;
    unidades.segundos.classList.add('latido');
  }
  tic();
  setInterval(tic, 1000);

  // Datos que cuentan hacia arriba al verse
  const desde = $('[data-desde-conocernos]');
  const km = $('[data-km]');
  const objetivos = [];
  if (desde) objetivos.push([desde, Math.floor((Date.now() - CONFIG.fechaConocernos.getTime()) / dia)]);
  if (km) objetivos.push([km, CONFIG.numeroDeViajes * CONFIG.km * 2]);

  const animar = (el, final) => {
    if (prefiereMenosMovimiento) { el.textContent = fmt.format(final); return; }
    const inicio = performance.now();
    const dur = 1400;
    const paso = (t) => {
      const p = Math.min(1, (t - inicio) / dur);
      const suave = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt.format(Math.round(final * suave));
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        const par = objetivos.find(([el]) => el === e.target);
        if (par) animar(par[0], par[1]);
        obs.unobserve(e.target);
      });
    }, { threshold: .5 });
    objetivos.forEach(([el]) => obs.observe(el));
  } else {
    objetivos.forEach(([el, n]) => { el.textContent = fmt.format(n); });
  }
})();

/* ---------- 7. MAPA DE LUGARES ---------- */
(function mapa() {
  const pins = $$('.pin');
  if (!pins.length) return;
  const vacio = $('#lugar-vacio');

  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const id = pin.dataset.lugar;
      pins.forEach(p => p.setAttribute('aria-pressed', String(p === pin)));
      $$('.lugar[id^="lugar-"]').forEach(art => { art.hidden = art.id !== `lugar-${id}`; });
      if (vacio) vacio.hidden = true;

      // En móvil, llevamos la vista a la tarjeta del lugar
      if (window.innerWidth < 960) {
        const panel = $(`#lugar-${id}`);
        if (panel) panel.scrollIntoView({ behavior: prefiereMenosMovimiento ? 'auto' : 'smooth', block: 'nearest' });
      }
    });
  });
})();

/* ---------- 8. RAZONES (tarjetas que se giran) ---------- */
(function razones() {
  $$('.razon').forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
      const girada = tarjeta.getAttribute('aria-pressed') === 'true';
      tarjeta.setAttribute('aria-pressed', String(!girada));
    });
  });
})();

/* ---------- 9. QUIZ "¿CUÁNTO SABES DE NOSOTROS?" ---------- */
(function quiz() {
  const caja = $('#quiz-caja');
  if (!caja) return;

  // Puedes cambiar o añadir preguntas. "c" es el índice de la respuesta correcta (empieza en 0).
  const PREGUNTAS = [
    {
      p: '¿Dónde fue nuestro primer beso?',
      o: ['En la puerta del cine', 'En la azotea del Plaza Mar', 'En la playa del Postiguet', 'En el mirador de Carvajales'],
      c: 1,
      bien: '¡Eso es! Antes de entrar al cine. La peli fue lo de menos.',
      mal: 'Nop: fue en la azotea del Plaza Mar, antes del cine.'
    },
    {
      p: '¿Cuántos kilómetros nos separan?',
      o: ['250 km', '350 km', '450 km', 'Ninguno, vivo en tu corazón'],
      c: 1,
      bien: '350 exactos. Me los sé de memoria (y de gasolina).',
      mal: 'Precioso, pero no: son 350 km exactos.'
    },
    {
      p: '¿Quién conoció antes a los padres del otro?',
      o: ['Pablo, el 11 de abril', 'Carla, el 25 de abril', 'Los dos el mismo día', 'Todavía nadie'],
      c: 0,
      bien: 'Correcto: yo fui el valiente primero. Tú, dos semanas después.',
      mal: 'Fui yo, el 11 de abril. Tú viniste el 25 a conocer a los míos.'
    },
    {
      p: '¿A quién viste en directo en el Latin Fest?',
      o: ['Bad Bunny', 'Omar Courtz', 'Myke Towers', 'Rauw Alejandro'],
      c: 1,
      bien: '¡Omar Courtz! Todavía me duelen los oídos de tus gritos.',
      mal: '¿Cómo que no? ¡Omar Courtz! Tu cantante favorito.'
    },
    {
      p: '¿Cuál es la comida oficial de esta pareja?',
      o: ['Pizza', 'Hamburguesa', 'Sushi', 'Lo que diga Carla'],
      c: 2,
      bien: 'Sushi, obviamente. 🍣',
      mal: 'Sushi. Siempre sushi. (Aunque lo de "lo que diga Carla" también es bastante cierto.)'
    },
    {
      p: '¿Cuántos días estuvimos de camping con tu familia?',
      o: ['5 días', '7 días', '10 días', '15 días'],
      c: 2,
      bien: 'Diez, del 7 al 16 de agosto. Sobrevivimos.',
      mal: 'Fueron diez: del 7 al 16 de agosto.'
    },
    {
      p: '¿En qué mes fui a Granada por primera vez?',
      o: ['Enero', 'Febrero', 'Marzo', 'Abril'],
      c: 1,
      bien: 'Febrero, del 6 al 8. Los primeros 350 km.',
      mal: 'Fue en febrero, del 6 al 8.'
    },
    {
      p: '¿Qué día empezamos a salir oficialmente?',
      o: ['1 de noviembre', '14 de febrero', '21 de marzo', '25 de abril'],
      c: 2,
      bien: '21 de marzo. Es tu contraseña, así que me lo esperaba 😏',
      mal: '¡El 21 de marzo! Si hasta lo usaste para entrar en la web…'
    }
  ];

  const paso = $('#quiz-paso');
  const pregunta = $('#quiz-pregunta');
  const opciones = $('#quiz-opciones');
  const feedback = $('#quiz-feedback');
  const siguiente = $('#quiz-siguiente');
  const progreso = $('#quiz-progreso');
  const letras = ['A', 'B', 'C', 'D'];
  let actual = 0;
  let aciertos = 0;

  function pintar() {
    const q = PREGUNTAS[actual];
    paso.textContent = `Pregunta ${actual + 1} de ${PREGUNTAS.length}`;
    pregunta.textContent = q.p;
    feedback.textContent = '';
    siguiente.hidden = true;
    progreso.style.width = `${(actual / PREGUNTAS.length) * 100}%`;
    opciones.innerHTML = '';

    q.o.forEach((texto, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'quiz__opcion';
      b.innerHTML = `<span class="quiz__letra" aria-hidden="true">${letras[i]}</span><span></span>`;
      b.lastChild.textContent = texto;
      b.addEventListener('click', () => responder(i, b));
      opciones.appendChild(b);
    });
  }

  function responder(i, boton) {
    const q = PREGUNTAS[actual];
    const botones = $$('.quiz__opcion', opciones);
    botones.forEach(b => { b.disabled = true; });
    botones[q.c].classList.add('correcta');

    if (i === q.c) {
      aciertos++;
      feedback.textContent = `✅ ${q.bien}`;
    } else {
      boton.classList.add('incorrecta');
      feedback.textContent = `❌ ${q.mal}`;
    }
    siguiente.textContent = actual === PREGUNTAS.length - 1 ? 'Ver mi nota →' : 'Siguiente →';
    siguiente.hidden = false;
    siguiente.focus();
  }

  function resultado() {
    progreso.style.width = '100%';
    paso.textContent = 'Resultado final';
    feedback.textContent = '';
    siguiente.hidden = true;

    let titulo, texto;
    if (aciertos === PREGUNTAS.length) {
      titulo = 'Matrícula de honor 🏆';
      texto = 'Sabes más de nosotros que yo. Premio: un beso (canjeable en persona).';
      lluviaDeCorazones(40);
    } else if (aciertos >= 6) {
      titulo = 'Notable alto';
      texto = 'Te perdono los fallos si me invitas a sushi. Bueno, aunque no me invites.';
    } else if (aciertos >= 3) {
      titulo = 'Aprobado raspado';
      texto = 'Hay que repasar. ¿Te parece si repasamos en persona?';
    } else {
      titulo = '¿Seguro que eres Carla? 🤨';
      texto = 'Es broma. O no. Repite el examen, que esto no puede quedar así.';
    }

    pregunta.textContent = titulo;
    opciones.innerHTML = '';
    const res = document.createElement('div');
    res.className = 'quiz__resultado';
    res.innerHTML = `<p class="quiz__nota">${aciertos}/${PREGUNTAS.length}</p><p></p>`;
    res.lastChild.textContent = texto;

    const repetir = document.createElement('button');
    repetir.type = 'button';
    repetir.className = 'btn btn--rosa';
    repetir.textContent = 'Repetir el examen';
    repetir.addEventListener('click', () => { actual = 0; aciertos = 0; pintar(); pregunta.focus(); });
    res.appendChild(repetir);
    opciones.appendChild(res);
    pregunta.focus();
  }

  siguiente.addEventListener('click', () => {
    actual++;
    if (actual < PREGUNTAS.length) { pintar(); pregunta.focus(); } else { resultado(); }
  });

  pintar();
})();

/* ---------- 10. CUPONES CANJEABLES ---------- */
(function cupones() {
  const lista = $$('.cupon');
  if (!lista.length) return;

  let canjeados = [];
  try { canjeados = JSON.parse(almacen.leer('localStorage', 'pc-cupones') || '[]'); } catch (e) { canjeados = []; }

  const marcar = (cupon) => {
    cupon.classList.add('canjeado');
    if (!$('.cupon__marca', cupon)) {
      const sello = document.createElement('span');
      sello.className = 'cupon__marca';
      sello.textContent = 'Canjeado';
      cupon.appendChild(sello);
    }
    const btn = $('.cupon__btn', cupon);
    btn.textContent = 'Volver a pedirlo';
  };

  lista.forEach(cupon => {
    const id = cupon.dataset.cupon;
    if (canjeados.includes(id)) marcar(cupon);

    $('.cupon__btn', cupon).addEventListener('click', () => {
      const titulo = $('.cupon__titulo', cupon).textContent.replace(/^\s*✏️\s*/, '').trim();
      const texto = `Pablo, canjeo mi cupón: «${titulo}» 💌\n¿Cuándo lo hacemos?`;
      window.open(enlaceWhatsApp(texto), '_blank', 'noopener');

      if (!canjeados.includes(id)) {
        canjeados.push(id);
        almacen.guardar('localStorage', 'pc-cupones', JSON.stringify(canjeados));
      }
      marcar(cupon);
      lluviaDeCorazones(14);
    });
  });
})();

/* ---------- 11. ENLACES DE WHATSAPP GENÉRICOS ---------- */
(function whatsapp() {
  $$('[data-whatsapp]').forEach(a => { a.href = enlaceWhatsApp(a.dataset.whatsapp); });
})();

/* ---------- 12. SORPRESA FINAL: EL BOTÓN QUE HUYE ---------- */
(function sorpresa() {
  const zona = $('#sorpresa-zona');
  const boton = $('#sorpresa-btn');
  const secreto = $('#sorpresa-secreto');
  if (!zona || !boton || !secreto) return;

  const textos = ['No pulses este botón', 'Te he dicho que no 🙈', 'Qué cabezota eres…', 'Vale, tú ganas. Pulsa.'];
  const huidasMax = 3;
  let huidas = 0;

  function huir() {
    if (huidas >= huidasMax) return;
    huidas++;
    boton.textContent = textos[huidas];
    if (prefiereMenosMovimiento) return;

    const zz = zona.getBoundingClientRect();
    const bb = boton.getBoundingClientRect();
    const margenX = (bb.width / 2 + 12) / zz.width * 100;
    const margenY = (bb.height / 2 + 12) / zz.height * 100;
    const x = margenX + Math.random() * (100 - margenX * 2);
    const y = margenY + Math.random() * (100 - margenY * 2);
    boton.style.left = `${x}%`;
    boton.style.top = `${y}%`;
  }

  // En ordenador huye al acercar el ratón
  boton.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') huir(); });

  boton.addEventListener('click', () => {
    if (huidas < huidasMax) { huir(); return; }
    secreto.hidden = false;
    boton.textContent = 'Lo sabía 💗';
    boton.disabled = true;
    lluviaDeCorazones(60);
    secreto.focus({ preventScroll: true });
    secreto.scrollIntoView({ behavior: prefiereMenosMovimiento ? 'auto' : 'smooth', block: 'center' });
  });
})();

/* ---------- 13. CARTA: ABRIR EL SOBRE ---------- */
(function sobre() {
  const boton = $('#sobre-boton');
  const carta = $('#carta');
  if (!boton || !carta) return;

  boton.addEventListener('click', () => {
    if (boton.classList.contains('abierto')) {
      carta.scrollIntoView({ behavior: prefiereMenosMovimiento ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    boton.classList.add('abierto');
    boton.setAttribute('aria-expanded', 'true');

    setTimeout(() => {
      carta.hidden = false;
      carta.classList.add('visible');
      lluviaDeCorazones(24);
      carta.focus({ preventScroll: true });
      carta.scrollIntoView({ behavior: prefiereMenosMovimiento ? 'auto' : 'smooth', block: 'start' });
    }, prefiereMenosMovimiento ? 0 : 650);
  });
})();

/* ---------- 14. AVISO PARA PABLO: TEXTOS PENDIENTES ---------- */
(function pendientes() {
  const n = $$('.pendiente').length;
  if (n) console.info(`✏️ Quedan ${n} textos por escribir en esta página. Búscalos por la clase "pendiente" y bórrala al terminar cada uno.`);
})();
