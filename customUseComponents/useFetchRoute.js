import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {fetchRoute} from '../utils/MapUtils';

const useFetchRoute = (start,end) => {
  const [route, setRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);

  const fetchRouteData = async (start, end) => {
    const data = await fetchRoute(start, end);
    setRoute(data);
    setRouteCoordinates(data.routes[0].geometry.coordinates);
  };

  useEffect(() => {
    fetchRouteData(start, end);
  }, [start, end]);

  return {route, isLoading, error, routeCoordinates};
};

export default useFetchRoute;

const styles = StyleSheet.create({});
