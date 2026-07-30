import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "..", "data");

const mapIdSchema = z.enum([
  "dust2",
  "mirage",
  "inferno",
  "nuke",
  "ancient",
  "anubis",
  "vertigo",
  "overpass",
  "train",
]);

const mapMetaSchema = z.object({
  id: mapIdSchema,
  name: z.string().min(1),
  order: z.number().int().positive(),
  thumbnail: z.string().min(1),
});

const mediaUrlSchema = z
  .string()
  .min(1)
  .refine((val) => val.startsWith("/") || /^https?:\/\//.test(val), {
    message: "debe ser una ruta relativa (empieza con /) o una URL http(s) absoluta",
  });

const lineupMediaSchema = z.object({
  kind: z.enum(["video", "image"]),
  source: z.enum(["external", "upload"]),
  url: mediaUrlSchema,
  thumbnailUrl: mediaUrlSchema.optional(),
});

const lineupSchema = z.object({
  id: z.string().min(1),
  map: mapIdSchema,
  side: z.enum(["CT", "T"]),
  nadeType: z.enum(["smoke", "molotov", "flash", "he"]),
  zone: z.string().min(1),
  title: z.string().min(1),
  position: z.string().min(1),
  movement: z.enum(["stationary", "walking", "running", "jump"]),
  technique: z.enum(["normal", "jumpthrow", "leftclick", "rightclick"]),
  media: lineupMediaSchema,
  notes: z.string().optional(),
  learned: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

let hasErrors = false;

function fail(message: string) {
  hasErrors = true;
  console.error(`✗ ${message}`);
}

function validateMaps() {
  const raw = JSON.parse(readFileSync(join(dataDir, "maps.json"), "utf-8"));
  const result = z.array(mapMetaSchema).safeParse(raw);
  if (!result.success) {
    fail(`maps.json inválido:\n${result.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n")}`);
    return;
  }
  console.log(`✓ maps.json (${result.data.length} mapas)`);
}

function validateLineups() {
  const lineupsDir = join(dataDir, "lineups");
  const files = readdirSync(lineupsDir).filter((f) => f.endsWith(".json"));
  const seenIds = new Map<string, string>();

  for (const file of files) {
    const expectedMapId = file.replace(/\.json$/, "");
    const raw = JSON.parse(readFileSync(join(lineupsDir, file), "utf-8"));
    const result = z.array(lineupSchema).safeParse(raw);

    if (!result.success) {
      fail(`${file} inválido:\n${result.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n")}`);
      continue;
    }

    for (const lineup of result.data) {
      if (lineup.map !== expectedMapId) {
        fail(`${file}: el lineup "${lineup.id}" tiene map="${lineup.map}", se esperaba "${expectedMapId}"`);
      }
      if (seenIds.has(lineup.id)) {
        fail(`id duplicado "${lineup.id}" en ${file} y ${seenIds.get(lineup.id)}`);
      } else {
        seenIds.set(lineup.id, file);
      }
    }

    console.log(`✓ ${file} (${result.data.length} lineups)`);
  }

  return seenIds.size;
}

validateMaps();
const totalLineups = validateLineups();

if (hasErrors) {
  console.error("\nValidación falló.");
  process.exit(1);
} else {
  console.log(`\nOK — ${totalLineups} lineups válidos en total.`);
}
