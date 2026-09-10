import fs from 'node:fs';
const required = [
 'apps/backend/Dockerfile',
 'apps/frontend/Dockerfile',
 'apps/frontend/nginx.conf',
 'docker-compose.prod.yml',
 '.env.production.example',
 '.github/workflows/ci.yml',
 'scripts/deploy-production.sh',
 'scripts/migrate-production.sh',
 'docs/deployment/production-deployment.md',
 'apps/backend/src/modules/ai/ai.module.ts',
 'apps/backend/src/modules/admin/admin.module.ts',
 'apps/frontend/src/three/CampusCanvas.tsx'
];
let ok = true;
for (const f of required) if (!fs.existsSync(f)) { console.error('missing '+f); ok = false; }
const compose = fs.readFileSync('docker-compose.prod.yml','utf8');
for (const token of ['frontend:', 'backend:', 'postgres:', 'restart: unless-stopped']) if (!compose.includes(token)) { console.error('compose missing '+token); ok = false; }
if (!ok) process.exit(1);
console.log('Phase 12 static checks passed; existing Phase 1-11 files preserved.');
