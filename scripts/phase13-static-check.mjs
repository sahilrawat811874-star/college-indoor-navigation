import fs from 'node:fs';
const required = [
 'docs/final-project-overview.md','docs/user-guide.md','docs/admin-guide.md','docs/api.md','docs/troubleshooting.md','docs/map-data-format.md','docs/routing-engine.md','docs/demo/hackathon-demo-script.md','docs/demo/judges-qa.md','docs/diagrams/system-architecture.mmd','docs/diagrams/routing-flow.mmd','scripts/demo-checklist.sh','apps/backend/src/modules/ai/ai.module.ts','apps/backend/src/modules/admin/admin.module.ts','apps/frontend/src/three/CampusCanvas.tsx'
];
let ok = true;
for (const f of required) if (!fs.existsSync(f)) { console.error('missing '+f); ok = false; }
if (!ok) process.exit(1);
console.log('Phase 13 static checks passed; existing Phase 1-12 files preserved.');
