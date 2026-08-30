// Photo Manifest - Each photo has a filename and multiple tags
// Tags allow photos to appear under multiple categories (country, city, company, etc.)

export interface PhotoEntry {
  filename: string;
  tags: string[];
  wide?: boolean;
}

export type PhotoManifestType = Record<string, PhotoEntry[]>;

export const PHOTO_MANIFEST: PhotoManifestType = {
  korea: [
    { filename: 'hanbok-burak-1.jpeg', tags: ['Korea', 'Seoul', 'Culture'] },
    { filename: 'seoul-hanbok-2.jpg', tags: ['Korea', 'Seoul', 'Culture'] },
    { filename: 'seoul-starfield-library-1.jpg', tags: ['Korea', 'Seoul'] },
    { filename: 'seoul-gentle-monster-1.jpg', tags: ['Korea', 'Seoul'] },
  ],

  japan: [
    { filename: 'kyoto-fushimi_inari-1.jpg', tags: ['Japan', 'Kyoto', 'Temple'] },
    { filename: 'osaka-dotonbori-burak-1.png', tags: ['Japan', 'Osaka'] },
    { filename: 'tokyo-hokusai-1.jpg', tags: ['Japan', 'Tokyo', 'Culture'] },
    { filename: 'tokyo-imperial-palace-1.jpg', tags: ['Japan', 'Tokyo'] },
  ],

  USA: [
    { filename: 'san-diego-burak-1.jpeg', tags: ['USA', 'San Diego'] },
    { filename: 'newyork-times-square-1.jpg', tags: ['USA', 'New York'] },
    { filename: 'newyork-six-musical-1.jpg', tags: ['USA', 'New York'] },
    { filename: 'losangeles-santa-monica-pier-1.jpg', tags: ['USA', 'Los Angeles'] },
    { filename: 'anaheim-disneyland-1.jpg', tags: ['USA', 'Los Angeles'] },
  ],

  canada: [
    { filename: 'montreal-notre-dame-1.jpg', tags: ['Canada', 'Montreal'] },
    { filename: 'montreal-old-town-1.jpg', tags: ['Canada', 'Montreal'] },
    { filename: 'niagara-falls-boat-1.jpg', tags: ['Canada', 'Niagara Falls'], wide: true },
  ],

  cherry: [
    { filename: 'cappadocia-1.jpg', tags: ['Turkey', 'Cappadocia', 'Cherry'] },
    { filename: 'cappadocia-scene-1.jpg', tags: ['Turkey', 'Cappadocia', 'Cherry', 'Scenery'] },
    { filename: 'cappadocia-scene-2.jpg', tags: ['Turkey', 'Cappadocia', 'Cherry', 'Scenery'] },
    { filename: 'cappadocia-team-1.jpg', tags: ['Turkey', 'Cappadocia', 'Cherry', 'Team'] },
    { filename: 'cappadocia-team-2.jpg', tags: ['Turkey', 'Cappadocia', 'Cherry', 'Team'] },
    { filename: 'usa-losangeles-1.jpg', tags: ['USA', 'Los Angeles', 'Cherry', 'Team'] },
    { filename: 'usa-losangeles-2.jpg', tags: ['USA', 'Los Angeles', 'Cherry', 'Team'] },
    { filename: 'usa-losangeles-3.jpg', tags: ['USA', 'Los Angeles', 'Cherry', 'Scenery'] },
    { filename: 'usa-losangeles-4.jpg', tags: ['USA', 'Los Angeles', 'Cherry', 'Scenery'] },
    { filename: 'usa-losangeles-5.jpg', tags: ['USA', 'Los Angeles', 'Cherry', 'Team'] },
    { filename: 'usa-losangeles-6.jpg', tags: ['USA', 'Los Angeles', 'Cherry'] },
    { filename: 'usa-miami-how-to-solve-issues.jpg', tags: ['USA', 'Miami', 'Cherry'] },
    { filename: 'usa-orlando-epcot-1.jpg', tags: ['USA', 'Orlando', 'Cherry'] },
    { filename: 'usa-orlando-onlydevs.jpg', tags: ['USA', 'Orlando', 'Cherry', 'Team'] },
    { filename: 'usa-lasvegas-gordon-ramsay-team-1.jpg', tags: ['USA', 'Las Vegas', 'Cherry', 'Team'] },
    { filename: 'usa-lasvegas-caesars-fountain-1.jpg', tags: ['USA', 'Las Vegas', 'Cherry'] },
    { filename: 'usa-lasvegas-fiveguys-board-1.jpg', tags: ['USA', 'Las Vegas', 'Cherry'] },
    { filename: 'usa-lasvegas-liberty-statue-1.jpg', tags: ['USA', 'Las Vegas', 'Cherry'] },
    { filename: 'usa-lasvegas-team-retreat-1.jpg', tags: ['USA', 'Las Vegas', 'Cherry', 'Team'] },
  ],

  trendyol: [
    { filename: 'istanbul-meetup-2022.jpg', tags: ['Turkey', 'Istanbul', 'Trendyol', 'Team'] },
    { filename: 'istanbul-trendyol-campus-1.jpg', tags: ['Turkey', 'Istanbul', 'Trendyol', 'Campus'] },
    { filename: 'istanbul-trendyol-campus-outside.jpg', tags: ['Turkey', 'Istanbul', 'Trendyol', 'Campus'] },
    { filename: 'istanbul-trendyol-campus-team-1.jpg', tags: ['Turkey', 'Istanbul', 'Trendyol', 'Team'] },
    { filename: 'istanbul-trendyol-fest-1.jpg', tags: ['Turkey', 'Istanbul', 'Trendyol'] },
    { filename: 'istanbul-trendyol-fest-2.jpg', tags: ['Turkey', 'Istanbul', 'Trendyol'] },
    { filename: 'ankara-trendyol-go-meetup.jpg', tags: ['Turkey', 'Ankara', 'Trendyol', 'Meetup'] },
  ],
};
