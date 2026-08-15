import { describe, it, expect } from "vitest";
import { services } from "../services";

describe("catálogo", () => {
  it("exporta un array de servicios", () => {
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
  });
});
