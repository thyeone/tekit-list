import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type GeolocationState = {
  data?: GeolocationData;
  error?: CustomGeoLocationError;
  loading: boolean;
};

export enum GeolocationErrorCode {
  NOT_SUPPORTED = 0,
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3,
}

const GeolocationBehaviorOptions = {
  MOUNT: 'MOUNT',
  WATCH: 'WATCH',
} as const;

type GeolocationData = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
};

export class CustomGeoLocationError extends Error {
  code: number;

  constructor({ code, message }: { message: string; code: number }) {
    super(message);
    this.name = 'CustomGeoLocationError';
    this.code = code;
  }
}

type Options = {
  behavior?:
    | (typeof GeolocationBehaviorOptions)[keyof typeof GeolocationBehaviorOptions]
    | undefined;
} & PositionOptions;

export function useGeolocation(options?: Options) {
  const [state, setState] = useState<GeolocationState>({
    data: undefined,
    error: undefined,
    loading: options?.behavior === GeolocationBehaviorOptions.WATCH,
  });

  const watchId = useRef<number | null>(null);

  const onSuccess = useCallback((position: GeolocationPosition) => {
    const { coords } = position;

    setState({
      data: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        altitude: coords.altitude,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
        timestamp: position.timestamp,
      },
      loading: false,
    });
  }, []);

  const onError = useCallback((error: GeolocationPositionError) => {
    setState((prev) => ({
      ...prev,
      loading: false,
      error: new CustomGeoLocationError({
        code: error.code,
        message: error.message,
      }),
    }));
  }, []);

  console.log(state);

  const checkGeolocationSupport = useCallback(() => {
    if (typeof window === 'undefined' || navigator.geolocation === undefined) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: new CustomGeoLocationError({
          code: GeolocationErrorCode.NOT_SUPPORTED,
          message: '위치를 사용할 수 없는 환경입니다.',
        }),
      }));

      return false;
    }

    return true;
  }, []);

  const geolocationOptions = useMemo(() => {
    return {
      enableHighAccuracy: options?.enableHighAccuracy,
      timeout: options?.timeout,
      maximumAge: options?.maximumAge,
    };
  }, [options?.enableHighAccuracy, options?.timeout, options?.maximumAge]);

  const getCurrentPosition = useCallback(() => {
    if (!checkGeolocationSupport()) {
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      geolocationOptions,
    );
  }, [checkGeolocationSupport, onSuccess, onError, geolocationOptions]);

  const startWatching = useCallback(() => {
    if (!checkGeolocationSupport()) {
      return;
    }

    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
    }

    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    watchId.current = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      geolocationOptions,
    );
  }, [onSuccess, onError, checkGeolocationSupport, geolocationOptions]);

  useEffect(() => {
    if (options?.behavior === GeolocationBehaviorOptions.WATCH) {
      startWatching();
    } else {
      console.log('getCurrentPosition');
      getCurrentPosition();
    }

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);

        watchId.current = null;
      }
    };
  }, [getCurrentPosition, options?.behavior, startWatching]);

  return {
    state,
    getCurrentPosition,
  };
}
