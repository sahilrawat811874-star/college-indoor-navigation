import { IntentParserService } from '../../src/modules/ai/services/intent-parser.service';

describe('IntentParserService', () => {
  const parser = new IntentParserService();
  it('detects find location intent', () => {
    expect(parser.parse('Where is the BCA lab?')).toMatchObject({ intent: 'find_location', query: 'bca lab' });
  });
  it('detects navigation intent', () => {
    expect(parser.parse('Take me to A-204')).toMatchObject({ intent: 'navigate_to_location', query: 'a-204' });
  });
  it('detects nearest facility intent', () => {
    expect(parser.parse('Nearest washroom?', true)).toMatchObject({ intent: 'nearest_facility', facilityType: 'WASHROOM', accessible: true });
  });
});
