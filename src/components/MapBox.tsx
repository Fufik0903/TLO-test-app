import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import "leaflet/dist/leaflet.css";
import styles from "./../assets/styles/map.module.scss";
import { ICON_GREEN, ICON_GREY } from "./icons";
import type { LatLngTuple } from "leaflet";

const MapController: React.FC = () => {
  const map = useMap();
  const selectedObject = useSelector(
    (state: RootState) => state.tlo.selectedObject
  );

  useEffect(() => {
    if (
      selectedObject &&
      Array.isArray(selectedObject) &&
      selectedObject.length === 2
    ) {
      map.flyTo([selectedObject[0], selectedObject[1]], 15);
    }
  }, [selectedObject, map]);

  return null;
};

const MapBox = () => {
  const { selectedObject, visibleItems } = useSelector(
    (state: RootState) => state.tlo || []
  );

  const center = useMemo((): LatLngTuple => {
    if (visibleItems.length > 0 && visibleItems[0]?.coords) {
      return visibleItems[0].coords;
    }
    // +- центр Москвы (как моковые данные, что бы отобразилась карта, если данные не придут)
    return selectedObject || [55.7558, 37.6173];
  }, [selectedObject, visibleItems]);
  return (
    <div className={styles.container}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapController />
        {visibleItems.map(({ name, coords, mode, address, id }) => (
          <Marker
            key={id}
            position={[coords[0], coords[1]]}
            icon={mode ? ICON_GREEN : ICON_GREY}
          >
            <Popup>
              <strong className={styles.popup_name}>{name}</strong>
              <span className={styles.popup_address}>{address}</span>
              <span className={styles.popup_status}>
                Статус: {mode ? "Активен" : "Неактивен"}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapBox;
