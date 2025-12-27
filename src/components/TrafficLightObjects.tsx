import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../redux/store";
import {
  changeLocation,
  searchByAddress,
  searchByName,
  setActiveFilter,
  setInactiveFilter,
  setSortTLO,
} from "../redux/TrafficLightSlice";
import styles from "./../assets/styles/tlo.module.scss";
import CIRCLE_GREEN from "./../assets/img/greenCircle.svg";
import CIRCLE_GREY from "./../assets/img/greyCircle.svg";
import type { FormData } from "../types";

const TrafficLightObjects: React.FC = () => {
  const dispatch = useAppDispatch();
  const { visibleItems, isActive, isInActive, isIncrease } = useSelector(
    (state: RootState) => state.tlo || []
  );
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const { register } = useForm<FormData>({
    defaultValues: {
      searchByName: "",
      searchByAddress: "",
      on: false,
      off: false,
    },
  });
  const handleSort = useCallback(() => {
    dispatch(setSortTLO(!isIncrease));
  }, [dispatch, isIncrease]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, attribute: string) => {
      if (attribute === "searchByName") {
        dispatch(searchByName(e.target.value));
      } else {
        dispatch(searchByAddress(e.target.value));
      }
    },
    [dispatch]
  );

  const handleCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = e.target;
      if (id === "on") {
        dispatch(setActiveFilter(checked));
      } else {
        dispatch(setInactiveFilter(checked));
      }
    },
    [dispatch]
  );

  const handleCangeLocation = (id: string, coords: number[]) => {
    setCurrentItem(id);
    dispatch(changeLocation(coords));
  };
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.tlo_title}>Светофорные объекты</h2>
        <form className={styles.tlo_filters}>
          <input
            type="text"
            className={styles.tlo_search}
            placeholder="Поиск по названию"
            {...register("searchByName", {
              onChange: (e) => handleSearch(e, "searchByName"),
            })}
          />
          <input
            type="text"
            className={styles.tlo_search}
            placeholder="Поиск по адресу"
            {...register("searchByAddress", {
              onChange: (e) => handleSearch(e, "searchByAddress"),
            })}
          />
          <label htmlFor="on" className={styles.tlo_checkbox_label}>
            <input
              id="on"
              type="checkbox"
              checked={isActive}
              className={styles.tlo_checkbox_input}
              {...register("on", {
                onChange: (e) => handleCheckbox(e),
              })}
            />
            Активные
          </label>
          <label htmlFor="off" className={styles.tlo_checkbox_label}>
            <input
              id="off"
              type="checkbox"
              checked={isInActive}
              className={styles.tlo_checkbox_input}
              {...register("off", {
                onChange: (e) => handleCheckbox(e),
              })}
            />
            Неактивные
          </label>
        </form>
        <button
          className={styles.tlo_sort_button}
          onClick={() => {
            handleSort();
          }}
        >
          <span>
            Сортировать по номеру
            <br />
            {isIncrease ? "(по убыванию)" : "(по возрастанию)"}
          </span>
        </button>
      </div>
      <ul className={styles.tlo_list} aria-label="Список объектов светофоров">
        {visibleItems.map(({ name, id, address, mode, coords }) => (
          <li
            key={id}
            className={
              currentItem === id
                ? styles.tlo_list_item_active
                : styles.tlo_list_item
            }
            onClick={() => handleCangeLocation(id, coords)}
          >
            <div className={styles.tlo_list_item_title}>
              <img
                className={styles.tlo_circle_icon}
                src={mode ? CIRCLE_GREEN : CIRCLE_GREY}
                alt={mode ? "Зелёный круг" : "Серый круг"}
              />
              <span
                className={
                  currentItem === id
                    ? styles.tlo_list_item_name_active
                    : styles.tlo_list_item_name
                }
              >
                {name}
              </span>
            </div>
            <span
              className={
                currentItem === id
                  ? styles.tlo_list_item_address_active
                  : styles.tlo_list_item_address
              }
            >
              {address}
            </span>
            <span
              className={
                currentItem === id
                  ? styles.tlo_list_item_status_active
                  : styles.tlo_list_item_status
              }
            >
              Статус: {mode ? "Активен" : "Неактивен"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficLightObjects;
