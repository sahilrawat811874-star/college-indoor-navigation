import fs from 'node:fs';

describe('Security hardening source checks', () => {
  it('enables helmet and strict validation', () => {
    const main = fs.readFileSync('src/main.ts', 'utf8');
    expect(main).toContain('helmet()');
    expect(main).toContain('forbidNonWhitelisted: true');
  });
  it('protects admin routes with jwt and role guards', () => {
    const admin = fs.readFileSync('src/modules/admin/admin.controller.ts', 'utf8');
    expect(admin).toContain('JwtAuthGuard');
    expect(admin).toContain('RolesGuard');
    expect(admin).toContain('MAP_EDITOR');
  });
});
