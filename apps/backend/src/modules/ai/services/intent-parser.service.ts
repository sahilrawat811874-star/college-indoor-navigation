import { Injectable } from '@nestjs/common';
export type ParsedIntent = { intent: 'find_location' | 'navigate_to_location' | 'nearest_facility'; query: string; facilityType?: string; accessible?: boolean };
@Injectable()
export class IntentParserService {
  parse(input: string, accessible = false): ParsedIntent {
    const q = input.trim().toLowerCase();
    const nearest = q.match(/nearest|closest/);
    const facilityMap: Record<string,string> = { washroom:'WASHROOM', bathroom:'WASHROOM', toilet:'WASHROOM', canteen:'CANTEEN', library:'LIBRARY', auditorium:'AUDITORIUM', elevator:'ELEVATOR', staircase:'STAIRCASE', stairs:'STAIRCASE' };
    const facility = Object.entries(facilityMap).find(([k]) => q.includes(k));
    if (nearest && facility) return { intent:'nearest_facility', query: input, facilityType: facility[1], accessible };
    const navWords = ['take me','navigate','go to','reach','how do i get','directions'];
    const intent = navWords.some(w => q.includes(w)) ? 'navigate_to_location' : 'find_location';
    let cleaned = q.replace(/where is|take me to|navigate to|go to|find|show me|how do i reach|how do i get to|directions to|the/g,' ').replace(/[?.,]/g,' ').replace(/\s+/g,' ').trim();
    return { intent, query: cleaned || input, accessible };
  }
}
