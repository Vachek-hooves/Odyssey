
export const TOKEN =
  'pk.eyJ1IjoidmFjaGVrbWFwMSIsImEiOiJjbTR3cHdkZXgwN2xxMmtyMHpkM3J1Ymc4In0.MQ2PHgJ_geG0AdbhlelR2Q';

export const MAPBOX_BASE_URL =
  'https://api.mapbox.com/directions/v5/mapbox/walking/';

export const fetchRoute = async (start, end) => {
  const response = await fetch(
    `${MAPBOX_BASE_URL}${start.longitude},${start.latitude};${end.longitude},${end.latitude}?access_token=${TOKEN}&geometries=geojson`,
  );
  const data = await response.json();
  if (data.routes && data.routes[0]) {
    return data.routes[0];
  } else {
    return [];
  }
};

