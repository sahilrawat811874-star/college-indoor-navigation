import fs from 'node:fs';

describe('API contract checks', () => {
  it('exposes core modules through AppModule', () => {
    const app = fs.readFileSync('src/app.module.ts', 'utf8');
    for (const moduleName of ['AuthModule', 'NavigationModule', 'AdminModule', 'AiModule', 'MapModule']) {
      expect(app).toContain(moduleName);
    }
  });
});
