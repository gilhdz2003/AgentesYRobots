import { describe, it, expect } from "vitest";
import { services } from "../services";

const bySlug = (slug: string) => services.find((s) => s.slug === slug);

describe("estructura del catálogo", () => {
  it("tiene las 6 familias en el orden del spec", () => {
    expect(services.map((s) => s.slug)).toEqual([
      "bb-one",
      "coworkers-digitales",
      "security-testing",
      "mapyourflow",
      "agent-visibility",
      "ai-training",
    ]);
  });

  it("slugs únicos entre familias", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("regla: familia con variants no usa campos planos", () => {
    for (const s of services) {
      if (s.variants) {
        expect(s.features, `${s.slug}: familia no debe definir features`).toBeUndefined();
        expect(s.useCase, `${s.slug}: familia no debe definir useCase`).toBeUndefined();
        expect(s.faq, `${s.slug}: familia no debe definir faq`).toBeUndefined();
        expect(s.pricing, `${s.slug}: familia no debe definir pricing`).toBeUndefined();
      } else {
        expect(s.features, `${s.slug}: servicio plano debe definir features`).toBeDefined();
        expect(s.useCase, `${s.slug}: servicio plano debe definir useCase`).toBeDefined();
        expect(s.faq, `${s.slug}: servicio plano debe definir faq`).toBeDefined();
      }
    }
  });

  it("slugs de variants únicos dentro de su familia", () => {
    for (const s of services) {
      if (!s.variants) continue;
      const slugs = s.variants.map((v) => v.slug);
      expect(new Set(slugs).size, `${s.slug}: variants con slug duplicado`).toBe(slugs.length);
    }
  });
});

describe("Coworkers Digitales (familia)", () => {
  it("tiene los 3 sub-tipos en orden", () => {
    expect(bySlug("coworkers-digitales")?.variants?.map((v) => v.slug)).toEqual([
      "chat-agents",
      "voice-agents",
      "agent-workflows",
    ]);
  });

  it("chat y voice conservan pricing tiered; workflows usa quote", () => {
    const fam = bySlug("coworkers-digitales")!;
    const chat = fam.variants!.find((v) => v.slug === "chat-agents")!;
    const voice = fam.variants!.find((v) => v.slug === "voice-agents")!;
    const flows = fam.variants!.find((v) => v.slug === "agent-workflows")!;
    expect(chat.pricing?.model).toBe("tiered");
    expect(voice.pricing?.model).toBe("tiered");
    expect(flows.pricing?.model).toBe("quote");
  });
});

describe("Security Testing (familia)", () => {
  it("tiene los 2 sub-tipos en orden", () => {
    expect(bySlug("security-testing")?.variants?.map((v) => v.slug)).toEqual([
      "agent-security",
      "web-security",
    ]);
  });
});

describe("Agent Visibility (nuevo)", () => {
  it("es servicio plano con pricing tiered", () => {
    const s = bySlug("agent-visibility");
    expect(s?.variants).toBeUndefined();
    expect(s?.pricing?.model).toBe("tiered");
  });
});

describe("sobrevivientes intactos", () => {
  it("bb-one conserva pricing modular", () => {
    expect(bySlug("bb-one")?.pricing?.model).toBe("modular");
  });

  it("mapyourflow y ai-training siguen planos sin pricing", () => {
    expect(bySlug("mapyourflow")?.pricing).toBeUndefined();
    expect(bySlug("ai-training")?.pricing).toBeUndefined();
  });
});
