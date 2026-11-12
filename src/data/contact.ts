/**
 * Canal de conversión del sitio: WhatsApp (decisión del concepto Lab —
 * "CTAs abren WhatsApp; sin formularios falsos").
 * Única fuente de verdad del número y del texto precargado.
 */
import { services } from "./services";

export const WA_NUMBER = "5218117991300";

/** Mensaje por defecto cuando no se especifica servicio. */
const DEFAULT_TEXT = "Me interesa conocer más sobre sus servicios de IA";

/** Construye el enlace de WhatsApp con texto precargado para un servicio (por slug) o genérico. */
export function waLink(serviceSlug?: string): string {
  const selected = services.find((s) => s.slug === serviceSlug);
  const text = selected
    ? `Me interesa conocer más sobre ${selected.title}`
    : DEFAULT_TEXT;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
