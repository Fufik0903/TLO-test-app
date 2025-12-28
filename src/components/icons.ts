import L from "leaflet";
import greenSvg from "./../assets/img/markerGreen.svg?raw";
import greySvg from "./../assets/img/markerGrey.svg?raw";

export const ICON_GREEN = L.divIcon({
  html: greenSvg,
  className: "custom-marker",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

export const ICON_GREY = L.divIcon({
  html: greySvg,
  className: "custom-marker",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});
