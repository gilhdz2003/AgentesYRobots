# Deploy agentesyrobots.com en Hostinger

> **Fecha**: 25 de Abril, 2026
> **Plan**: Hostinger Business (Apache + cPanel)
> **Metodo**: Build local → Subir dist/ via File Manager
> **Tiempo estimado**: 10-15 minutos

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
cd "/home/gilbertohernandez/Documents/Proyectos Claude Code/Proyectos 2026/ProjectJarvis/Agentes&Robots"

# Generar build de produccion
npm run build
```

Esto crea/actualiza la carpeta `dist/` con los archivos finales:

```
dist/
├── .htaccess          # SPA routing + cache + security headers
├── index.html         # Entry point
├── favicon.svg
├── robots.txt         # SEO crawlers (incluye AI bots)
├── sitemap.xml        # Sitemap para Google
└── assets/
    ├── index-93VngHlX.js    # JS bundle (~455 KB)
    └── index-CBH3Io9N.css   # CSS (~33 KB)
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

### Opcion A: File Manager (Recomendado para primera vez)

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
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── index-93VngHlX.js
│   └── index-CBH3Io9N.css
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
put -r /home/gilbertohernandez/Documents/Proyectos\ Claude\ Code/Proyectos\ 2026/ProjectJarvis/Agentes\&Robots/dist/*
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

Abrir navegador y probar:

| URL | Que verificar |
|-----|---------------|
| `https://agentesyrobots.com` | Landing page carga completo, animaciones funcionan |
| `https://agentesyrobots.com/nosotros` | Pagina "Nosotros" carga (NO error 404) |
| `https://agentesyrobots.com/contacto` | Pagina "Contacto" carga |
| `https://agentesyrobots.com/servicios/bb-one` | Pagina de servicio carga |
| `https://agentesyrobots.com/robots.txt` | Muestra el archivo robots.txt |
| `https://agentesyrobots.com/sitemap.xml` | Muestra el sitemap |

### Checklist post-deploy

- [ ] Home carga correctamente
- [ ] Navegacion entre paginas funciona (click en links del navbar)
- [ ] **Recarga directa** en sub-rutas funciona (ej: entrar directamente a `/contacto` NO da 404)
- [ ] Imagenes e iconos cargan (favicon, logos)
- [ ] Animaciones se ejecutan (scroll animations, hovers)
- [ ] HTTPS activo (candado verde en browser)
- [ ] Fonts cargan (Playfair Display, Space Grotesk, Inter)

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
cd "/home/gilbertohernandez/Documents/Proyectos Claude Code/Proyectos 2026/ProjectJarvis/Agentes&Robots"
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
