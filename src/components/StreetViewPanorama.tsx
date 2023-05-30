import React, { useEffect } from "react";

export const StreetViewPanorama = () => {
  useEffect(() => {
    const streetViewExample = { lat: 54.913793, lng: 9.7790408 };

    const initPano = () => {
      new window.google.maps.StreetViewPanorama(
        document.getElementById("map") as HTMLElement,

        {
          position: streetViewExample,
          addressControlOptions: {
            position: window.google.maps.ControlPosition.BOTTOM_CENTER,
          },
          linksControl: false,
          panControl: false,
          enableCloseButton: false,
          disableDefaultUI: false,
          zoomControl: false,
        }
      );
    };

    initPano();
  }, []);

  return <div id="map" style={{ width: "700px", height: "500px" }} />;
};
