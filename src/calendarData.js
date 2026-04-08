export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export const DAYS_SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

// Curated Unsplash images per month - nature/landscape theme
export const MONTH_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=800&q=80', theme: 'winter', palette: '#1a3a5c' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', theme: 'snow', palette: '#2c4a6e' },
  { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80', theme: 'spring', palette: '#3d6e3d' },
  { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc9d?w=800&q=80', theme: 'blossom', palette: '#8b3a6b' },
  { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', theme: 'mountain', palette: '#2d5a6e' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', theme: 'summer', palette: '#c1440e' },
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', theme: 'sea', palette: '#1a6b8a' },
  { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', theme: 'forest', palette: '#3d6e3d' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', theme: 'autumn', palette: '#8b4e0f' },
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80', theme: 'fall', palette: '#c1440e' },
  { url: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=800&q=80', theme: 'late-autumn', palette: '#5a3e28' },
  { url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80', theme: 'winter', palette: '#1a3a5c' },
];

// Better curated images
export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=900&q=85',  // Jan - snowy mountain
  'https://images.unsplash.com/photo-1478827387698-1527781a4887?w=900&q=85',  // Feb - frozen lake
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=85',  // Mar - spring field
  'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&q=85',  // Apr - cherry blossom
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85',  // May - green mountain
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',  // Jun - alpine
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85',  // Jul - coast
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85',  // Aug - forest
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=85',  // Sep - canyon
  'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=85',  // Oct - autumn forest
  'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=900&q=85', // Nov - foggy trees
  'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&q=85',  // Dec - snow
];

export const MONTH_THEMES = [
  { accent: '#4a7fa5', bg: '#0d1f2d', label: 'Frost Blue' },
  { accent: '#7a9bb5', bg: '#1a2633', label: 'Ice White' },
  { accent: '#6b9e6b', bg: '#1a2a1a', label: 'Spring Green' },
  { accent: '#c77ab0', bg: '#2d1a2d', label: 'Blossom Pink' },
  { accent: '#5e9e7e', bg: '#1a2d22', label: 'Meadow Teal' },
  { accent: '#c85c28', bg: '#2d1a0d', label: 'Ember Orange' },
  { accent: '#2a9bc4', bg: '#0d2233', label: 'Ocean Blue' },
  { accent: '#4e8c4e', bg: '#1a2a1a', label: 'Forest Green' },
  { accent: '#c47d3a', bg: '#2d1e0d', label: 'Canyon Gold' },
  { accent: '#c1440e', bg: '#2d1205', label: 'Autumn Red' },
  { accent: '#8a6a4a', bg: '#1f1a14', label: 'Bark Brown' },
  { accent: '#4a7fa5', bg: '#0d1a2d', label: 'Winter Blue' },
];

// US Holidays
export const HOLIDAYS = {
  '1-1': "New Year's Day",
  '1-15': 'MLK Day',
  '2-19': "Presidents' Day",
  '5-27': 'Memorial Day',
  '6-19': 'Juneteenth',
  '7-4': 'Independence Day',
  '9-2': 'Labor Day',
  '10-14': 'Columbus Day',
  '11-11': 'Veterans Day',
  '11-28': 'Thanksgiving',
  '12-25': 'Christmas Day',
};

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  // 0=Mon, 6=Sun mapping
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

export function isInRange(date, start, end) {
  if (!start || !end || !date) return false;
  const [s, e] = start <= end ? [start, end] : [end, start];
  return date > s && date < e;
}

export function formatDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getDaysBetween(start, end) {
  if (!start || !end) return 0;
  return Math.abs(Math.round((end - start) / (1000 * 60 * 60 * 24)));
}
