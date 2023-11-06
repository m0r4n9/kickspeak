# Клиентская часть

---
## Стек технологий

----

## Архитектура проекта (Client side)

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

---

## Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit. По возможности переиспользуемые сущности необходимо
нормализовать с помощью EntityAdapter


Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл)
используется [DynamicModuleLoader](src/shared/lib/components/DynamicModuleLoader.tsx)

---

## Сущности (entities)

## Фичи (features)
