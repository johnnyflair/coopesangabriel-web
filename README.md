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

## Fotos de los pasos (Pexels, licencia libre para uso comercial)
- Paso 1: docente con celular, foto de Tima Miroshnichenko (pexels.com/photo/5427999)
- Paso 2: profesional de salud con celular, foto de Tessy Agbonome (pexels.com/photo/19963176)
- Paso 3: funcionario con gafete, foto de Mizuno K (pexels.com/photo/12898967)

Se cargan desde el CDN de Pexels. Para no depender de Pexels, descargarlas y guardarlas como `assets/paso-1.jpg`, `assets/paso-2.jpg` y `assets/paso-3.jpg`, y cambiar `data-photo` en `index.html`. Lo ideal es reemplazarlas por fotos reales de asociados, con su permiso.
