export interface TLO {
  id: string;
  name: string;
  address: string;
  coords: [number, number];
  mode: boolean;
}
export interface TLOState {
  items: TLO[];
  visibleItems: TLO[];
  isActive: boolean;
  isInActive: boolean;
  isIncrease: boolean;
  searchByName: string;
  searchByAddress: string;
  selectedObject: [number, number];
}
export type FormData = {
  searchByName: string;
  searchByAddress: string;
  on: boolean;
  off: boolean;
};
