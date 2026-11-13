#!/usr/bin/env bash
# Verificación post-deploy de agentesyrobots.com contra el dist/ local.
# Uso: bash scripts/verify-deploy.sh [https://agentesyrobots.com]
# Compara lo que sirve producción con el build local: rutas, assets con hash,
# meta SEO, og-image y restos del diseño anterior. Sale con 1 si algo falla.
set -u

BASE="${1:-https://agentesyrobots.com}"
DIST="$(cd "$(dirname "$0")/.." && pwd)/dist"
FAILS=0

ok()   { printf '  OK    %s\n' "$1"; }
fail() { printf '  FALLA %s\n' "$1"; FAILS=$((FAILS + 1)); }

status() { curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$1"; }

[ -f "$DIST/index.html" ] || { echo "No existe $DIST/index.html — corre npm run build primero"; exit 1; }

echo "== Verificando $BASE contra $DIST =="

echo "-- Rutas (SPA fallback) --"
for path in / /casos /nosotros /contacto \
  /servicios/bb-one /servicios/coworkers-digitales /servicios/security-testing \
  /servicios/mapyourflow /servicios/agent-visibility /servicios/ai-training; do
  code="$(status "$BASE$path")"
  [ "$code" = "200" ] && ok "$path → 200" || fail "$path → $code (esperado 200)"
done

echo "-- Archivos estáticos --"
for file in robots.txt sitemap.xml og-image.png logo-ar.png favicon.ico; do
  code="$(status "$BASE/$file")"
  [ "$code" = "200" ] && ok "/$file → 200" || fail "/$file → $code (esperado 200)"
done

echo "-- Build servido = build local --"
HTML="$(curl -s --max-time 20 "$BASE/")"
for asset in $(grep -o 'assets/index-[A-Za-z0-9_-]*\.\(js\|css\)' "$DIST/index.html" | sort -u); do
  if printf '%s' "$HTML" | grep -q "$asset"; then
    code="$(status "$BASE/$asset")"
    [ "$code" = "200" ] && ok "$asset referenciado y sirve 200" || fail "$asset referenciado pero responde $code"
  else
    fail "$asset NO está en el index.html de producción (¿sigue el build anterior o hay caché?)"
  fi
done

echo "-- SEO --"
printf '%s' "$HTML" | grep -qi 'noindex' && fail "la home trae noindex" || ok "sin noindex"
printf '%s' "$HTML" | grep -q 'content="index, follow"' && ok "meta robots index, follow" || fail "falta meta robots index, follow"
printf '%s' "$HTML" | grep -q 'og-image.png' && ok "og:image apunta a og-image.png" || fail "og:image no apunta a og-image.png"
urls="$(curl -s --max-time 20 "$BASE/sitemap.xml" | grep -o '<loc>' | wc -l)"
[ "$urls" = "10" ] && ok "sitemap con 10 URLs" || fail "sitemap con $urls URLs (esperado 10)"

echo "-- Restos del diseño anterior --"
# Con cache-bust: hcdn (CDN de Hostinger) puede servir objetos viejos con llave
# insensible al query. Si aún así responde 200, es WARN (residual o caché), no fail duro.
code="$(status "$BASE/hero-bb-node.webp?nocache=$(date +%s)")"
if [ "$code" = "200" ]; then
  echo "  WARN  hero-bb-node.webp responde 200 aun con cache-bust — residual en /public_html o caché hcdn (cosmético: nada lo referencia)"
else
  ok "hero-bb-node.webp ya no se sirve ($code)"
fi

echo "-- HTTPS --"
final="$(curl -s -o /dev/null -w '%{url_effective}' -L --max-time 20 "${BASE/https:/http:}/")"
case "$final" in https://*) ok "http redirige a https" ;; *) fail "http no redirige a https ($final)" ;; esac

echo
if [ "$FAILS" -eq 0 ]; then
  echo "DEPLOY VERIFICADO: todo en orden."
else
  echo "DEPLOY CON $FAILS FALLA(S) — revisar arriba."
  exit 1
fi
