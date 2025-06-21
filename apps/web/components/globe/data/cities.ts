import { CityData } from '../types';

// Major cities data (reduced list - key global cities only)
export const MAJOR_CITIES: CityData[] = [
  // Asia - Major hubs
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, population: 37400000, type: 'megacity' },
  { name: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737, population: 28500000, type: 'megacity' },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, population: 21700000, type: 'megacity' },
  { name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, population: 9700000, type: 'capital' },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, population: 11000000, type: 'capital' },
  // Europe - Key cities
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, population: 9500000, type: 'capital' },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, population: 11000000, type: 'capital' },
  { name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, population: 3700000, type: 'capital' },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6176, population: 12500000, type: 'capital' },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, population: 15500000, type: 'megacity' },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964, population: 4300000, type: 'capital' },

  // North America - Major hubs
  { name: 'New York', country: 'United States of America', lat: 40.7128, lng: -74.0060, population: 18800000, type: 'megacity' },
  { name: 'Los Angeles', country: 'United States of America', lat: 34.0522, lng: -118.2437, population: 12400000, type: 'major' },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, population: 6200000, type: 'major' },

  // South America - Key cities
  { name: 'São Paulo', country: 'Brazil', lat: -23.5558, lng: -46.6396, population: 22400000, type: 'megacity' },
  { name: 'Buenos Aires', country: 'Argentina', lat: -34.6118, lng: -58.3960, population: 15200000, type: 'capital' },

  // Africa - Major hubs
  { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, population: 15400000, type: 'megacity' },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, population: 21300000, type: 'capital' },

  // Oceania
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, population: 5400000, type: 'major' },
];
