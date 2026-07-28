import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'README.md',
  'LICENSE',
  'SECURITY.md',
  'docs/case-study.md',
  'docs/demo-walkthrough.md',
  'docs/portfolio-release.md',
  'docs/screenshots/home-desktop.png',
  'docs/screenshots/home-mobile.png',
  'docs/screenshots/solutions-desktop.png',
];

const forbiddenPatterns = [
  { label: 'endpoint externo de formulário', pattern: /formsubmit\.co/i },
  { label: 'configuração de e-mail operacional', pattern: /mail-config|smtp[_-]?pass/i },
  { label: 'referência de infraestrutura privada', pattern: /192\.168\.|C:\\Users\\/i },
];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`arquivo obrigatório ausente: ${file}`);
  }
}

for (const directory of ['src', 'scripts']) {
  for (const file of walk(join(root, directory))) {
    if (!/\.(?:js|jsx|mjs|ps1)$/i.test(file)) continue;
    if (file.endsWith('verify-portfolio-release.mjs')) continue;
    const content = readFileSync(file, 'utf8');
    for (const { label, pattern } of forbiddenPatterns) {
      if (pattern.test(content)) {
        failures.push(`${label}: ${relative(root, file)}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error('Falha na validação da cópia pública:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Cópia pública validada: ${requiredFiles.length} evidências presentes; integrações operacionais ausentes.`);
