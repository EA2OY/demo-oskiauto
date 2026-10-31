# Oskiauto — nueva versión web

> **Demo publicada:** <https://ea2oy.github.io/demo-oskiauto/>
> **Repositorio:** <https://github.com/EA2OY/demo-oskiauto>

Rediseño estático de **oskiauto.com** manteniendo el contenido visible del sitio
original (textos de Bienvenida, Servicios, Oski-Consejos, Galería, Contacto y
Política de cookies) y las fotos reales del taller.

El proyecto Joomla original **no se ha modificado**: sigue completo en
`httpdocs/`. Esta carpeta es una versión nueva, independiente y lista para subir.

---

## Ver la web

Abre `index.html` en el navegador. No necesita servidor, base de datos ni
instalación: son HTML, CSS y JavaScript estáticos.

Páginas:

| Archivo | Contenido |
| --- | --- |
| `index.html` | Portada: hero, servicios, galería, vídeos y contacto |
| `bienvenida.html` | Texto de bienvenida y listado de servicios |
| `servicios.html` | Revisión, frenos, embrague y distribución |
| `consejos.html` | Los 7 bloques de Oski-Consejos |
| `galeria.html` | 18 fotos con visor a pantalla completa |
| `contacto.html` | Datos, formulario y mapa |
| `politica-de-cookies.html` | Política de cookies actual |

---

## Cómo publicarla

1. **Haz una copia de seguridad** de `httpdocs/` y de la base de datos antes de
   tocar nada.
2. Sube el contenido de esta carpeta a `httpdocs/` (o a una subcarpeta si
   prefieres probarla antes).
3. Para que la portada nueva se sirva en la raíz, Apache debe priorizar
   `index.html` sobre `index.php`. Tienes dos opciones:
   - añadir `DirectoryIndex index.html` al `.htaccess`, o
   - renombrar el `index.php` de Joomla a `index.php.bak`.
4. Revisa `htaccess-ejemplo.txt`: incluye esa directiva y redirecciones 301 desde
   las URLs antiguas de Joomla para no perder visitas ni posicionamiento.
5. Comprueba en el navegador la home, una página interior, el menú móvil, el
   visor de la galería y el mapa.

> Importante: al ser una web estática, los cambios de contenido se hacen en los
> archivos HTML, no desde el panel de Joomla. Si quieres seguir editando desde
> el administrador de Joomla, habría que portar este diseño a una plantilla de
> Joomla 3.

---

## Qué se ha hecho

- **Sistema visual nuevo**: fondo carbón, papel cálido, naranja de acento,
  tipografía Archivo + Inter + IBM Plex Mono (fuentes autoalojadas, sin
  depender de Google Fonts en el navegador).
- **Navegación y jerarquía nuevas**: cabecera fija, menú móvil a pantalla
  completa, portada editorial, numeración de secciones, botones y estados de
  foco.
- **Secciones reorganizadas**: hero, cinta de servicios, presentación, valores,
  servicios, galería, vídeos, contacto y footer.
- **Fotos optimizadas** a partir de los originales del taller, con `width` /
  `height`, `loading="lazy"` y versiones específicas para móvil.
- **Detalles de interacción**: revelado al hacer scroll, rotador de servicios,
  visor de galería con teclado, carga diferida de YouTube y aviso de cookies.
- **SEO y accesibilidad**: títulos y descripciones por página, `lang="es"`,
  migas de pan, enlace de salto al contenido, `aria-*`, foco visible,
  `prefers-reduced-motion`, sitemap y robots.
- **Mapa**: imagen estática de OpenStreetMap (con atribución) y enlace a Google
  Maps. Se evita cargar el iframe de Google en cada visita.

---

## Cambios funcionales que conviene revisar

- **Formulario de contacto**: ahora abre la aplicación de correo del visitante
  con los datos ya rellenados (`mailto:`). No hay envío desde servidor. Si se
  quiere un formulario real, hay que conectarlo a un script PHP, a un CRM o a
  un servicio de formularios.
- **Mapa**: es una imagen estática; el botón “Abrir mapa” lleva a Google Maps.
  Si se quiere el mapa interactivo incrustado, se puede volver a poner el
  iframe, aceptando la carga de terceros.
- **Cookies**: se mantiene el aviso y la aceptación se guarda en
  `localStorage`. No se ha añadido ninguna analítica nueva.
- **Vídeos**: los tres vídeos de YouTube se cargan solo al pulsar reproducir.
- **Textos**: se conservan los originales. Solo se han corregido tildes en
  títulos/navegación (por ejemplo “Galería”, “AUTOMÓVIL”) y se ha unido una
  palabra que aparecía partida en el texto de Dirección (“presión”). No se ha
  reescrito el contenido de los artículos.

---

## Estructura

```
oskiauto-moderno/
├── index.html
├── bienvenida.html
├── servicios.html
├── consejos.html
├── galeria.html
├── contacto.html
├── politica-de-cookies.html
├── sitemap.xml
├── robots.txt
├── htaccess-ejemplo.txt
├── README.md
└── assets/
    ├── css/
    │   ├── fonts.css
    │   └── style.css
    ├── fonts/
    ├── img/
    └── js/
        └── main.js
```

---

## Siguientes pasos posibles

1. Conectar el formulario a un envío real.
2. Portar el diseño a una plantilla Joomla si se quiere conservar el CMS.
3. Añadir aviso legal y política de privacidad (ahora solo existe la de
   cookies).
4. Revisar los textos con el cliente: hay alguna falta antigua en el contenido
   original que se ha respetado a propósito.
