# Traffic Light Objects Management App

Это приложение для управления объектами светофоров (TLO). Оно позволяет фильтровать, искать, сортировать и обновлять данные о светофорах с использованием React и TypeScript.

## Функции
- Отображение списка TLO с фильтрацией по статусу (активные/неактивные).
- Поиск по названию.
- Сортировка по различным критериям.
- Оптимизированная производительность с memoization.

## Технологии
- React (с хуками)
- TypeScript

## Установка и запуск
1. Клонируйте репозиторий: `git clone https://github.com/your-username/your-repo-name.git`
2. Установите зависимости: `npm install` (или `yarn install`)
3. Запустите приложение: `npm start`
4. Для сборки: `npm run build`

## Структура проекта
- `src/components/TrafficLightObjects.tsx`: Главный компонент.
- `src/components/MapBox.tsx`: Компонент с картой.
- `src/functions.ts`: Функции для обработки данных.
- `tsconfig.json`: Конфигурация TypeScript.

