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
| Galería | 3 pies de foto (los otros 9 ya tienen frase; cámbiala si quieres) | Máximo 6-7 palabras. Que hagan gracia. |
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

Ya están todas en la carpeta `fotos`, recortadas y reducidas. La primera cita no tiene foto: en su lugar hay una entrada de cine dibujada. Si algún día quieres cambiar una foto, sustituye el archivo por otro con el mismo nombre (en vertical, unos 1200 px de alto).

Dónde va cada una:

| Archivo | Sección | Foto |
|---|---|---|
| foto-01 | Portada | Beso de noche junto al mar |
| foto-03 | Febrero, Granada | Cepillos de dientes en el espejo |
| foto-04 | 22 de marzo | Al hombro frente al espejo |
| foto-05 | Tú en mi zona (abril) | Piscina en Orihuela |
| foto-14 | Conozco a tus padres | Paseo de fiestas con su madre |
| foto-06 | Latin Fest | Selfie con gafas en el estadio |
| foto-07 | Camping | Playa, tumbados en las toallas |
| foto-08 … foto-20 | Galería (12 fotos) | Mirador de Granada, sushi ×2, gorros, cena, ella en la cala, selfie desde arriba, mascarilla, fiesta de verano, granizados con su madre, atardecer y escaleras de la cala |

## 5. Publicarla y hacer el QR

1. **Súbela gratis:** arrastra la carpeta completa (con `fotos` dentro) a Netlify Drop (app.netlify.com/drop). En un minuto te da un enlace. Otra opción es GitHub Pages.
2. **Pruébala en tu móvil** antes de regalarla: candado, contador, quiz, cupones y carta.
3. **Genera el QR** con ese enlace en cualquier generador de QR gratuito y descárgalo en alta resolución.
4. **Imprímelo** en una tarjeta. Una idea: "Escanéame. Necesitarás nuestra fecha." 😉

La web tiene `noindex`, así que no aparecerá en Google.
