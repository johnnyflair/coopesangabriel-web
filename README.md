# Coope San Gabriel: sitio nuevo

Sitio estático (HTML, CSS y JS) sin dependencias ni paso de compilación.

## Páginas
- `index.html`: inicio, con la calculadora CrédiCash, el menú por necesidad, los planes, las preguntas frecuentes y la Tiendita
- `credicash.html`: producto, requisitos y todas las preguntas frecuentes
- `proteccion.html`: comparación de planes
- `nosotros.html`
- `contacto.html`
- `robots.txt` y `sitemap.xml`: el sitio queda indexable por Google

## Cómo editar
Casi todo se cambia en **`assets/config.js`**:
- El WhatsApp oficial, el teléfono, el correo, la dirección y el horario
- El monto mínimo y máximo (máximo confirmado: ₡690.000), el plazo y la tasa de CrédiCash
- `mostrarTasa: true` muestra la tasa en el sitio. Activarlo solo cuando la tasa esté confirmada.
- Los requisitos, los planes (coberturas y precios) y las preguntas frecuentes

Todo lo que falta confirmar está marcado con `PENDIENTE` en ese archivo.

## Marca
El sitio usa la identidad actual de Coope San Gabriel:
- Tipografía **Outfit**, la misma del sitio actual
- Verde institucional `#009245`, verde oscuro `#00853E` y verde lima `#8CC63F` (del techo del logo)
- Rojo `#E31E24`, naranja `#F36F21` y amarillo `#F3AB00` (las letras C, S y G del logo)

Los colores están en las variables al inicio de `assets/styles.css`.

**Logo:** `assets/logo-csg.png` (versión web) y `assets/logo-csg-original.png` (versión grande).

## Falta agregar
- Fotos reales del equipo u oficina (reemplazar los bloques `.photo-pending`)
- `assets/og.jpg` (1200×630), la imagen que aparece al compartir el enlace en redes

## Probar localmente
```
python3 -m http.server 8000
```
Luego abrir http://localhost:8000

## Pasos de CrédiCash
Se muestran como tres pantallas de celular dibujadas con HTML y CSS: el chat de WhatsApp, la firma digital y la notificación del depósito. El monto de las pantallas se actualiza con lo que la persona elige en la calculadora. Si la cooperativa usa otro proceso de firma, hay que ajustar la segunda pantalla en `index.html`.
