import { describe, expect, it } from 'vitest';
import fs from 'node:fs';

describe('frontend phase 11 checks', () => {
  it('keeps navigation and admin UI wired', () => {
    expect(fs.readFileSync('src/components/layout/MapControlPanel.tsx', 'utf8')).toContain('NavigationPanel');
    expect(fs.readFileSync('src/app/App.tsx', 'utf8')).toContain('AdminDashboardPage');
  });
});
