export function locationToString(locationObject) {
  if (!locationObject) return 'No location data';

  return `${locationObject.country}, ${locationObject.region}, ${locationObject.name}`;
}

export const _ = '?';
