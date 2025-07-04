import React from "react";

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

function Map({ latitude, longitude, ...rest }: MapProps) {
  return (
    <div
      {...rest}
      style={{ backgroundColor: "red", ...rest.style }}
      ref={(el) => {
        if (!el) return;
        console.log("window.kakao", window.kakao);
        const kakao = window.kakao;
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 5,
        };
        new kakao.maps.Map(el, options);
      }}
    />
  );
}

export default Map;
