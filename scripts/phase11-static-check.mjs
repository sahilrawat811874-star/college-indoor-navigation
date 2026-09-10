import fs from 'node:fs';
const required = [
 'apps/backend/test/unit/astar.spec.ts',
 'apps/backend/test/unit/intent-parser.spec.ts',
 'apps/backend/test/security/security-check.spec.ts',
 'apps/backend/test/e2e/api-contract.spec.ts',
 'apps/backend/src/common/middleware/security-headers.middleware.ts',
 'apps/backend/src/common/interceptors/performance-logging.interceptor.ts',
 'apps/frontend/src/__tests__/phase11-static.spec.ts',
 'apps/backend/src/modules/ai/ai.module.ts',
 'apps/backend/src/modules/admin/admin.module.ts',
 'apps/backend/src/modules/navigation/navigation.module.ts'
];
let ok = true;
for (const f of required) if (!fs.existsSync(f)) { console.error('missing '+f); ok = false; }
const main = fs.readFileSync('apps/backend/src/main.ts','utf8');
for (const token of ['helmet()','forbidNonWhitelisted: true','PerformanceLoggingInterceptor']) if (!main.includes(token)) { console.error('main missing '+token); ok = false; }
const admin = fs.readFileSync('apps/backend/src/modules/admin/admin.controller.ts','utf8');
for (const token of ['JwtAuthGuard','RolesGuard','MAP_EDITOR']) if (!admin.includes(token)) { console.error('admin missing '+token); ok = false; }
if (!ok) process.exit(1);
console.log('Phase 11 static checks passed; existing Phase 1-10 files preserved.');
