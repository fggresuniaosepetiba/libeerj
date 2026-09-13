import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const temp =
  process.env.OPCODE_TEMP ??
  join(process.env.USERPROFILE, "AppData", "Local", "Temp", "opencode");
const manifestPath = join(temp, "download_manifest.json");

const manifest = JSON.parse(
  readFileSync(manifestPath, "utf8").replace(/^\uFEFF/, ""),
);

const wikiUrl = (title) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(
    title.replace(/^File:/, "").replace(/ /g, "_"),
  )}`;

const rows = manifest
  .map((entry) => {
    const rel = entry.File.replace(/^\//, "");
    const folder = rel.split("/")[0];
    const name = rel.split("/").pop();
    return [
      `\`/assets/images/${rel}\``,
      folder,
      name,
      `[${entry.Commons}](${wikiUrl(entry.Commons)})`,
      entry.License,
      entry.Artist,
    ];
  })
  .sort((a, b) => a[1].localeCompare(b[1]) || a[2].localeCompare(b[2]));

const out = `# Atribuições de imagem

As fotografias exibidas neste site são licenciadas e foram baixadas
localmente a partir da **Wikimedia Commons**. Nenhum recurso é carregado
por hotlink de terceiros.

> Fotografias: Agência Brasil, Governo do Amapá, Prefeitura de Olinda, Agência
> Brasília, Flickr Commons e acervos públicos — via Wikimedia Commons.
> Licenças CC BY / CC BY-SA.

## Créditos

| Rota local | Pasta | Arquivo | Origem (Commons) | Licença | Autor / Fonte |
| --- | --- | --- | --- | --- | --- |
${rows.map((r) => `| ${r.join(" | ")} |`).join("\n")}

## Notas

- Registros adicionais da memória (Cacique de Ramos, Bafo da Onça,
  Sambódromo etc.) serão incorporados a esta tabela à medida que ficarem
  disponíveis para download.
- O logotipo da LIBEERJ (\`libeerj-logo.jpeg\`) é de propriedade da Liga e o
  seu uso nesta demonstração é meramente institucional.
`;

writeFileSync(join(root, "ATTRIBUTIONS.md"), out, "utf8");
console.log(`wrote ATTRIBUTIONS.md com ${rows.length} entradas`);