# Simple Archive

Система электронного архивного хранения документов.

## Возможности

### Пользователь

- Просмотр стеллажей
- Просмотр полок
- Просмотр ячеек
- Поиск документа
- Просмотр карточки документа
- Отправление запроса на выдачу документа
- Получение документа
- Возвращение документа
- Просмотр истории выдачи
- Просмотр активных выдач

### Администратор

- Добавление новых документов
- Удаление старых документов
- Просмотр статистики по архиву
- Обработка заявок на выдачу

# Технологии
## Frontend

1. React
2. React Router
3. Axios
4. Vite

## Backend

1. Node.js
2. Express
3. Prisma ORM
4. JWT Authentication
5. Multer
6. Ghostscript

## Database

1. PostgreSQL

# Установка проекта
## Клонирование репозитория

```
git clone <url репозитория>
cd <ваша папка с клонированным проектом>
```

## Настройка сервера

1. Перейти в папку сервера
```
cd server
```
2. Установить зависимости
```
npm install
```
3. Создать файл `.env` (в нем укажите поля DATABASE_URL, JWT_SECRET, REFRESH_SECRET, PORT):
```
DATABASE_URL=
JWT_SECRET=
REFRESH_SECRET=
PORT=
```
4. Применить миграции prisma:
```
npx prisma migrate dev
```
5. Сгенерировать Prisma Client:
```
npx prisma generate
```
6. Запустить сервер
```
npm run dev
```

## Настройка клиента

1. Перейти в папку клиента
```
cd client
```
2. Установить зависимости
```
npm install
```
3. Запустить клиент
```
npm run dev
```

### Сайт будет доступен по ссылке `http://localhost:5173`

# Структура проекта

## Сервер

- [server](/server)
- [config](/server/config)
- [controllers](/server/controllers)
- [middleware](/server/middleware/)
- [prisma](/server/prisma)
- [routers](/server/routers)
- [services](/server/services)
- [src](/server/src)
- [uploads](/server/uploads)
- [utils](/server/utils)
- [validation](/server/validation)

## Клиент

- [client](/client)
- [src](/client/src)
- [api](/client/src/api)
- [styles](/client/src/assets/styles)
- [components](/client/src/components)
- [context](/client/src/context)
- [hooks](/client/src/hooks)
- [layout](/client/src/layout)
- [pages](/client/src/pages)
- [router](/client/src/router)
- [services](/client/src/services)

# Авторизация

Для авторизации используется JWT.<br>
Токен хранится в LocalStorage, при этом каждый запрос автоматически получает заголовок с токеном.<br>

# Роли

1. User
2. Admin

# API

Присутствует документация Swagger через /api-docs.