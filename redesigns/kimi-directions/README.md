# Agentes&Robots · Tres direcciones visuales

Experimento aislado creado con Kimi K3.1 Pro vía OpenRouter. No modifica el portal principal en `src/`.

## Abrir localmente

Desde la raíz del repositorio:

```bash
npm --prefix redesigns/kimi-directions run dev
```

Abrir http://localhost:4173

## Rutas

- Selector: `http://localhost:4173/`
- 01 Sistema vivo: `http://localhost:4173/?v=sistema`
- 02 Firma consultiva: `http://localhost:4173/?v=firma`
- 03 Laboratorio: `http://localhost:4173/?v=lab`

El query `?v=` controla el prototipo y los hashes quedan libres para la navegación interna, por ejemplo `?v=sistema#soluciones`.

## Decisiones

- **Sistema vivo**: sidebar, verde señal, Unbounded + Chivo, mapa de nodos y acordeón de servicios.
- **Firma consultiva**: menú superior, marfil + vino + durazno, Zilla Slab + Atkinson Hyperlegible, caso Konectify y método por tabs.
- **Laboratorio**: dock inferior, tinta + amarillo, Barlow Condensed + Karla + Fira Code, simulador de misión y catálogo por tabs.
- El archivo `public/logo-ar.png` es una copia exacta del isotipo actual, sin recolorear ni alterar.
- Los CTAs abren WhatsApp. No hay formularios falsos ni envíos simulados.

## Verificar

```bash
npm --prefix redesigns/kimi-directions run build
```

La prueba de navegador usa Chrome con CDP en el puerto 9222 y el servidor local en 4173:

```bash
google-chrome --headless --no-sandbox --remote-debugging-port=9222 \
  --remote-allow-origins='*' --user-data-dir=/tmp/ar-cdp about:blank &
node redesigns/kimi-directions/scripts/verify-browser.mjs
```

Cobertura: 3 conceptos × desktop/móvil, overflow del documento y del H1, imágenes, enlaces vacíos, tabs, acordeón, mapa interactivo, simulador y navegación interna.

Las fuentes se cargan desde Google Fonts; hay fallbacks del sistema si no hay conexión.
