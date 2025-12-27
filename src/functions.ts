import type { TLO } from "./types";

export const parseDate = (tlo: any): TLO[] => {
  const newTlo = tlo
    .map((item: any) => ({
      ...item,
      mode: item.mode === "on" ? true : false,
    }))
    .filter(
      (item: any, index: number, arr: TLO[]) =>
        arr.findIndex((i) => i.id === item.id) === index
    );

  return newTlo;
};
export const filterTLO = (
  items: TLO[],
  isActive: boolean,
  isInActive: boolean
): TLO[] => {
  const result = [...items];
  if (isActive && isInActive) return result;
  if (isActive) return result.filter((item) => item.mode);
  if (isInActive) return result.filter((item) => !item.mode);
  return [];
};
const sortTLO = (items: TLO[], isIncrease: boolean) => {
  const result = [...items];
  if (isIncrease) {
    return result.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return result.sort((a, b) => b.name.localeCompare(a.name));
  }
};
export const searchByAttributes = (
  nameText: string,
  addressText: string,
  items: TLO[]
) => {
  let result = [...items];
  if (nameText && nameText.length > 0) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(nameText.toLowerCase())
    );
  }
  if (addressText && addressText.length > 0) {
    result = result.filter((item) =>
      item.address.toLowerCase().includes(addressText.toLowerCase())
    );
  }
  return result;
};
export const updateVisibleItems = (state: TLOState): TLO[] => {
  let result = searchByAttributes(
    state.searchByName,
    state.searchByAddress,
    state.items
  );
  result = filterTLO(result, state.isActive, state.isInActive);
  result = sortTLO(result, state.isIncrease);
  return result;
};
