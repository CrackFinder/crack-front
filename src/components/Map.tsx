import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  latitude: number;
  longitude: number;
}

const INITIAL_LEVEL = 5;

function Map({ latitude, longitude, ...rest }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const kakaoRef = useRef(window.kakao);
  const mapRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const kakao = kakaoRef.current;
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: INITIAL_LEVEL,
    };
    mapRef.current = new kakao.maps.Map(el, options);
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude),
    });

    marker.setMap(mapRef.current);
  }, [latitude, longitude]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div {...rest} style={{ width: "100%", height: "100%", ...rest.style }} ref={ref} />
      <button
        onClick={() => {
          mapRef.current?.setCenter(new kakaoRef.current.maps.LatLng(latitude, longitude));
          mapRef.current?.setLevel(INITIAL_LEVEL);
        }}
        style={{ position: "absolute", top: 0, right: 0, zIndex: 1000, backgroundColor: "white" }}
      >
        지도 위치 복원
      </button>
    </div>
  );
}

export default Map;
