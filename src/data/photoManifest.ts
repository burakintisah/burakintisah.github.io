// Photo Manifest - Each photo has a filename and multiple tags
// Tags allow photos to appear under multiple categories (country, city, company, etc.)

export interface PhotoEntry {
  filename: string;
  tags: string[];
}

export type PhotoManifestType = Record<string, PhotoEntry[]>;

export const PHOTO_MANIFEST: PhotoManifestType = {
  korea: [
    { filename: 'hanbok-burak-1.jpeg', tags: ['Korea', 'Seoul', 'Culture'] },
  ],

  japan: [
    { filename: 'kyoto-fushimi_inari-1.jpg', tags: ['Japan', 'Kyoto', 'Temple'] },
  ],

  USA: [
    { filename: 'san-diego-burak-1.jpeg', tags: ['USA', 'San Diego'] },
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
