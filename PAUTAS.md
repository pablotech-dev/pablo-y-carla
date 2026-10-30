# Pautas para terminar la web de Carla

## 1. Cómo escribir (vale para todo)

- **Concreto gana a bonito.** "Me encanta tu risa" se olvida. "Me encanta cómo te ríes con la nariz cuando algo te hace gracia de verdad" se recuerda.
- **Un detalle que solo sepáis vosotros por texto.** Una frase, un sitio, una hora, una canción. Eso es lo que hace que la web sea vuestra y no una plantilla.
- **Alterna risa y emoción.** Una frase graciosa, una sincera. Si todo es emotivo, cansa; si todo es broma, no llega.
- **Frases cortas.** Se lee en el móvil. Si una frase tiene más de dos comas, pártela.
- **Habla con ella, no de ella.** "Tú", no "Carla".
- **Léelo en voz alta.** Si suena a tarjeta de supermercado, cámbialo por cómo lo dirías tú.
- **Evita las frases hechas:** "eres mi todo", "mi media naranja", "contigo hasta el infinito". Mejor tu versión, aunque sea más torpe.

## 2. Qué rellenar

Cada hueco es un texto entre corchetes con la pauta dentro, por ejemplo `[TU TEXTO · 2 frases: …]`. **Sustituye todo, corchetes incluidos, por tu texto** y listo: no hay que tocar nada más del código.

Busca `[` en el editor (Ctrl+F) para ir de uno en uno. Ojo: ya no se ven en amarillo, así que antes de dársela comprueba que no quede ningún corchete.

Tip: abre la web, pulsa F12 → Consola y verás cuántos textos entre corchetes quedan en cada página.

| Sección | Huecos | Consejo |
|---|---|---|
| Historia (index.html) | 9 + el día de la primera cita | 2-3 frases por capítulo. Pon al menos un detalle que ella no sepa. |
| Playlist | 1 | La canción "vuestra" y por qué. |
| Mapa | 5 + nombre del camping | Cortos: un recuerdo por sitio. |
| Galería | 3 pies de foto | Máximo 6-7 palabras. Que hagan gracia. |
| Razones | 10 | La frase de la tarjeta ya da el tema. 1-3 frases cada una. |
| Cupones | 1 cupón vuestro | Algo que solo tenga sentido entre vosotros. |
| Futuro | 2 planes | Uno grande (viaje) y uno pequeño (un domingo cualquiera). |
| Sorpresa final | 1 mensaje secreto | Ideal para una pista de un regalo físico o un plan. |
| Carta (carta.html) | 9 | El párrafo de "algo que nunca le hayas dicho" es el que más importa. Escríbelo el último, con calma. |

Para la carta, la primera frase de cada párrafo ya está escrita para arrancarte. Puedes dejarla, cambiarla o borrarla.

## 3. Datos que tienes que poner

En **script.js**, arriba del todo (`CONFIG`):
- `numeroDeViajes`: cuántas veces os habéis visto viajando uno de los dos. Se usa para calcular los km recorridos.
- `claves`: la contraseña. Ahora es el 22/03 (vale `2203`, `22/03`, `22032026`…). Ojo: es un candado de broma; quien mire el código puede verla.

En **carta.html**: `[TU CIUDAD]` en la fecha de la carta.

En **index.html**:
- Mueve la chincheta del camping cambiando `--x` y `--y` (en %).
- Cambia el enlace de Google Maps del camping (`[NOMBRE+DEL+CAMPING]`).
- `[DOMINIO]` en las etiquetas del `<head>` cuando sepas la dirección final (no es imprescindible).

## 4. Fotos

Crea una carpeta `fotos` al lado de index.html con estos nombres (en .jpg, en vertical queda mejor):

| Archivo | Qué foto |
|---|---|
| foto-01.jpg | Vuestra favorita juntos (portada) |
| foto-02.jpg | Primera cita / Navidad en Alicante |
| foto-03.jpg | Primera visita a Granada (febrero) |
| foto-04.jpg | De cuando empezasteis (marzo) |
| foto-05.jpg | Su primera visita a tu ciudad (abril) |
| foto-06.jpg | Latin Fest |
| foto-07.jpg | Camping |
| foto-08.jpg | Mirador Placeta de Carvajales |
| foto-09.jpg | Comiendo sushi |
| foto-10.jpg | Una graciosa |
| foto-11.jpg | Captura de videollamada |
| foto-12.jpg | Una de ella que te encante |
| foto-13.jpg | Un selfie juntos |

Mientras falte una foto, su hueco muestra el nombre de archivo que va ahí. Reduce las fotos a unos 1200 px de lado para que cargue rápido en el móvil.

## 5. Publicarla y hacer el QR

1. **Súbela gratis:** arrastra la carpeta completa (con `fotos` dentro) a Netlify Drop (app.netlify.com/drop). En un minuto te da un enlace. Otra opción es GitHub Pages.
2. **Pruébala en tu móvil** antes de regalarla: candado, contador, quiz, cupones y carta.
3. **Genera el QR** con ese enlace en cualquier generador de QR gratuito y descárgalo en alta resolución.
4. **Imprímelo** en una tarjeta. Una idea: "Escanéame. Necesitarás nuestra fecha." 😉

La web tiene `noindex`, así que no aparecerá en Google.
