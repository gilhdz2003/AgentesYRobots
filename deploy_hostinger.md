# Deploy agentesyrobots.com en Hostinger

> **Fecha**: 25 de Abril, 2026 · **Actualizada**: 13 de Nov, 2026 (diseño Lab; paquete .zip + `scripts/verify-deploy.sh`; prod ya corre una versión previa indexable del sitio — este deploy la reemplaza)
> **Plan**: Hostinger Business (Apache + cPanel)
> **Metodo**: Build local → Subir dist/ via File Manager
> **Tiempo estimado**: 10-15 minutos
> **Ruta del proyecto**: `~/Documents/Proyectos Claude Code/Proyectos 2026/Core Business/AgentesYRobots/agentesyrobots/`

---

## Requisitos Previos

- [x] Hostinger Business plan activo
- [x] Dominio `agentesyrobots.com` apuntando a Hostinger (DNS configurado)
- [x] Proyecto compilado (`dist/` generado)
- [x] `.htaccess` incluido en `dist/`

---

## Paso 1: Generar el Build

En tu terminal local, dentro de la carpeta del proyecto:

```bash
cd "/home/gilbertohernandez/Documents/Proyectos Claude Code/Proyectos 2026/Core Business/AgentesYRobots/agentesyrobots"

# Generar build de produccion
npm run build
```

Esto crea/actualiza la carpeta `dist/` con los archivos finales:

```
dist/
├── .htaccess          # SPA routing + cache + security headers (OCULTO)
├── index.html         # Entry point (sin noindex — indexable)
├── favicon.ico        # Favicon legacy
├── favicon-32.png     # Favicon PNG
├── apple-touch-icon.png  # iOS home screen
├── icon-192.png       # PWA/Android
├── icon-512.png       # PWA/Android
├── og-image.png       # Tarjeta social 1200x630 (og:image / twitter:image)
├── logo-ar.png        # Logo completo
├── robots.txt         # SEO crawlers (incluye AI bots para GEO)
├── sitemap.xml        # 10 URLs: home, casos, nosotros, contacto + 6 servicios
└── assets/            # JS/CSS con hash (cache busting)
```

> **Nota**: Los hashes en los nombres de archivos cambian con cada build. Eso es intencional — Vite los genera para "cache busting" (los navegadores siempre cargan la versión más reciente).

---

## Paso 2: Acceder al File Manager de Hostinger

1. Ir a **[hpanel.hostinger.com](https://hpanel.hostinger.com)**
2. Seleccionar el plan donde está `agentesyrobots.com`
3. Ir a **Archivos → File Manager** (o usar cPanel → File Manager)
4. Navegar a la carpeta raíz del dominio:
   ```
   /public_html/
   ```
   > Si el dominio es un **addon domain** o **subdominio**, la carpeta puede ser diferente (ej: `/public_html/agentesyrobots/` o `/domains/agentesyrobots.com/public_html/`). Verificalo en **Dominios → Zone Editor** o en la sección de dominios del hPanel.

---

## Paso 3: Limpiar la Carpeta Destino

**IMPORTANTE**: Antes de subir, elimina los archivos anteriores del sitio.

En el File Manager:

1. Seleccionar **todos** los archivos dentro de `/public_html/` (o la carpeta del dominio)
2. **NO eliminar** la carpeta `.well-known/` si existe (la usa Hostinger/SSL)
3. Click **Delete**
4. Confirmar

---

## Paso 4: Subir los Archivos

### Opcion A0: Un solo .zip (lo más rápido)

```bash
# Empaqueta el contenido de dist/ (incluye el .htaccess oculto)
cd dist && zip -r ../agentesyrobots-deploy.zip . && cd ..
```

1. File Manager → `/public_html/` → **Upload** → subir `agentesyrobots-deploy.zip`
2. Click derecho sobre el zip → **Extract** → destino `/public_html/`
3. Borrar el `.zip` del servidor
4. Activar "Show Hidden Files" y confirmar que `.htaccess` quedó en `/public_html/`

### Opcion A: File Manager (archivo por archivo)

1. En el File Manager, navegar a `/public_html/`
2. Click en **Upload** (botón arriba)
3. Subir **todo el contenido** de la carpeta `dist/` local
   - En Fedora: abre tu explorador de archivos, ve a la carpeta `dist/` del proyecto
   - Arrastra los archivos al área de upload de Hostinger
4. Asegurarte de que la estructura quede asi:

```
/public_html/
├── .htaccess          ← SIEMPRE incluir este (archivo oculto!)
├── index.html
├── favicon.ico + favicon-32.png + apple-touch-icon.png + icon-192/512.png
├── og-image.png
├── logo-ar.png
├── robots.txt
├── sitemap.xml
├── assets/
│   └── (JS/CSS con hash)
└── .well-known/       ← (existente de Hostinger, no tocar)
```

> **CRITICO**: El `.htaccess` es un archivo oculto (empieza con punto). Asegurate de que:
> 1. Se subio correctamente (verifica en File Manager con "Show Hidden Files" activado)
> 2. No se sobreescribio por uno default de Hostinger

### Opcion B: FTP/SFTP (Si prefieres terminal)

Hostinger soporta SFTP. Desde tu terminal:

```bash
# Conectar via SFTP (reemplaza USER con tu usuario de Hostinger)
sftp USER@agentesyrobots.com

# Navegar a la carpeta del sitio
cd public_html

# Subir todo el contenido de dist/
put -r "/home/gilbertohernandez/Documents/Proyectos Claude Code/Proyectos 2026/Core Business/AgentesYRobots/agentesyrobots/dist/"*
```

### Opcion C: Git Deploy (Para actualizaciones futuras)

Si prefieres automatizarlo, puedes clonar el repo en Hostinger y hacer build ahi:

1. Hostinger Business incluye **SSH access** — activarlo en hPanel
2. Conectar via SSH: `ssh USER@agentesyrobots.com`
3. Instalar Node.js si no está (puede que ya esté disponible)
4. Clonar repo y hacer build:

```bash
cd ~
git clone TU_REPO_URL agentes-robots-deploy
cd agentes-robots-deploy
npm install
npm run build
cp -r dist/* ~/public_html/
```

Luego para updates futuros solo haces `git pull && npm run build && cp -r dist/* ~/public_html/`.

---

## Paso 5: Verificar SSL (HTTPS)

1. En hPanel ir a **Seguridad → SSL**
2. Verificar que SSL esté **activo** para `agentesyrobots.com`
3. Si no lo está, activar **Let's Encrypt** (gratis, un click)
4. Forzar HTTPS: en **SSL → Force HTTPS** → Activar

> El `.htaccess` ya tiene security headers. El SSL de Hostinger se encarga del resto.

---

## Paso 6: Verificar el Deploy

Verificación automática (HTTP, assets, meta, headers) desde la carpeta del proyecto:

```bash
bash scripts/verify-deploy.sh
```

Y a ojo en el navegador:

| URL | Que verificar |
|-----|---------------|
| `https://agentesyrobots.com` | Home Lab: hero "MENOS PROMESAS. MÁS AGENTES TRABAJANDO.", dock inferior, simulador y catálogo responden |
| `https://agentesyrobots.com/casos` | Caso **pentesting-konectify** visible (nuevo 23-Sep) |
| `https://agentesyrobots.com/nosotros` | Pagina "Nosotros" carga (NO error 404) |
| `https://agentesyrobots.com/contacto` | Pagina "Contacto" carga |
| `https://agentesyrobots.com/servicios/bb-one` | Pagina de servicio carga |
| `https://agentesyrobots.com/servicios/security-testing#agent-security` | UseCase pentest Konectify visible |
| `https://agentesyrobots.com/robots.txt` | Muestra el archivo robots.txt |
| `https://agentesyrobots.com/sitemap.xml` | Muestra el sitemap (10 URLs) |

### Checklist post-deploy

- [ ] Home carga correctamente
- [ ] Navegacion entre paginas funciona (dock inferior + links del footer)
- [ ] **Recarga directa** en sub-rutas funciona (ej: entrar directamente a `/contacto` NO da 404)
- [ ] Imagenes e iconos cargan (favicon, logo)
- [ ] Interacciones responden (simulador de misión, tabs del catálogo, acordeones FAQ)
- [ ] CTAs abren WhatsApp con texto precargado
- [ ] HTTPS activo (candado en browser)
- [ ] Fonts cargan (Barlow Condensed, Karla, Fira Code)
- [ ] Si ves el diseño anterior: recarga forzada (Ctrl+Shift+R) — `index.html` puede venir de caché

### Si las sub-rutas dan 404:

El `.htaccess` no se subio o no se aplico. Solucion:

1. File Manager → Show Hidden Files
2. Verificar que `.htaccess` existe en `/public_html/`
3. Si no existe, subirlo manualmente
4. Si existe pero no funciona, agregar al inicio del archivo:
   ```apache
   Options -MultiViews
   ```

---

## Paso 7: Registrar en Google (SEO)

> **CONTEXTO (verificado 13-Nov-2026 con curl)**: prod YA corre una versión previa del sitio real, indexable (`index, follow`, sub-rutas 200) — el coming-soon con `noindex` ya no existe. Este deploy **reemplaza el diseño anterior por el diseño Lab**. De paso corrige las tarjetas sociales: `og-image.png` respondía 422 en prod.

### Checklist del deploy Lab

- [ ] `view-source:https://agentesyrobots.com` sin `noindex` (debe decir `index, follow`)
- [ ] La home muestra el diseño Lab (no el hero anterior con imagen)
- [ ] Caso pentesting-konectify visible en `/casos`
- [ ] UseCase Konectify en `/servicios/security-testing#agent-security`
- [ ] `https://agentesyrobots.com/og-image.png` responde 200 (antes 422)
- [ ] Archivos del diseño anterior fuera del servidor (`hero-bb-node.webp`, JS/CSS viejos en `assets/`)
- [ ] **Search Console**: confirmar propiedad + sitemap enviado (ver abajo)
- [ ] Opcional: URL Inspection → Request Indexing en home para acelerar el refresco del snippet

1. Ir a **[Google Search Console](https://search.google.com/search-console)**
2. Agregar propiedad → `agentesyrobots.com`
3. Verificar propiedad (Hostinger tiene verificacion automatica en hPanel → SEO)
4. Enviar sitemap: `https://agentesyrobots.com/sitemap.xml`
5. Solicitar indexacion de las paginas principales

> El `robots.txt` ya permite explicitamente bots de IA (ChatGPT, Perplexity, ClaudeBot, etc.) para **GEO (Generative Engine Optimization)**.

---

## Actualizaciones Futuras (Workflow)

Cuando hagas cambios al proyecto:

```bash
# 1. Hacer cambios en el codigo localmente
# 2. Build de produccion
cd "/home/gilbertohernandez/Documents/Proyectos Claude Code/Proyectos 2026/Core Business/AgentesYRobots/agentesyrobots"
npm run build

# 3. Subir contenido de dist/ a Hostinger (reemplazar archivos existentes)
#    - Via File Manager: subir y sobreescribir
#    - Via SFTP: put -r dist/*
#    - Via Git deploy: git pull && npm run build && cp -r dist/* ~/public_html/

# 4. Listo — los hashes en los nombres de archivo aseguran que los navegadores
#    no usen cache viejo
```

---

## Estructura de DNS (Referencia)

Si el dominio no apunta a Hostinger, configura estos DNS:

| Tipo | Nombre | Valor |
|------|--------|-------|
| A | `@` | IP de Hostinger (ver en hPanel) |
| A | `www` | IP de Hostinger |
| CNAME | `www` | `agentesyrobots.com` |

> Si el dominio fue comprado en Hostinger, esto ya esta configurado automaticamente.

---

## Resumen Rapido

```
npm run build → Subir dist/* a /public_html/ → Verificar HTTPS → Probar rutas → Done
```

**Un solo concepto**: Es un sitio estatico. No necesitas Node.js en el servidor. Solo copias los archivos y ya.

---

*Guia creada para Hostinger Business plan con cPanel.*
