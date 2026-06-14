# PRVN Token Tracker - Telegram Mini App

Мини-приложение для отслеживания цены токена PRVN в сети TON с интеграцией в Telegram бот.

## Возможности

- 📊 Свечной график в реальном времени
- 📖 Рыночный стакан (Order Book)
- 💰 Актуальная цена токена
- 📱 Полная интеграция с Telegram
- 🔗 Быстрый доступ к каналу, поддержке и администратору

## Установка

### 1. Клонирование и установка зависимостей

```bash
# Установка зависимостей для бота
npm install

# Установка зависимостей для веб-приложения
cd webapp
npm install
cd ..
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
cp .env.example .env
```

Заполните следующие переменные:

```env
# Telegram Bot Configuration
BOT_TOKEN=your_bot_token_here          # Токен от @BotFather
WEBAPP_URL=https://your-domain.com     # URL вашего веб-приложения

# TON API Configuration
TON_API_KEY=your_ton_api_key_here      # API ключ для TON
TOKEN_ADDRESS=your_token_address_here   # Адрес токена в TON

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Получение токена бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Скопируйте полученный токен в `.env`

### 4. Настройка Web App

1. Отправьте команду `/mybots` в @BotFather
2. Выберите вашего бота
3. Выберите "Bot Settings" → "Menu Button"
4. Настройте URL вашего веб-приложения

## Запуск

### Режим разработки

```bash
# Запуск бота и веб-приложения одновременно
npm run dev

# Или запуск по отдельности:
npm run dev:bot      # Только бот
npm run dev:webapp   # Только веб-приложение
```

### Продакшн

```bash
# Сборка веб-приложения
npm run build

# Запуск бота
npm start
```

## Структура проекта

```
PRVN/
├── bot/
│   └── index.js           # Telegram бот и API сервер
├── webapp/
│   ├── index.html         # HTML страница мини-приложения
│   ├── main.js            # Логика приложения
│   ├── package.json       # Зависимости веб-приложения
│   └── vite.config.js     # Конфигурация Vite
├── .env                   # Переменные окружения (не в git)
├── .env.example           # Пример переменных окружения
├── .gitignore
├── package.json           # Зависимости проекта
└── README.md
```

## Деплой

### Вариант 1: Vercel (для веб-приложения)

1. Установите Vercel CLI: `npm i -g vercel`
2. Перейдите в папку webapp: `cd webapp`
3. Запустите: `vercel`
4. Следуйте инструкциям

### Вариант 2: Heroku (для бота)

1. Создайте приложение на Heroku
2. Добавьте переменные окружения
3. Деплой:
```bash
git push heroku main
```

### Вариант 3: VPS

1. Установите Node.js на сервере
2. Клонируйте репозиторий
3. Установите зависимости
4. Настройте PM2 для автозапуска:
```bash
npm install -g pm2
pm2 start bot/index.js --name prvn-bot
pm2 startup
pm2 save
```

## API Endpoints

### GET /api/token-data
Получение данных о токене

**Response:**
```json
{
  "ticker": "PRVN",
  "name": "PRVN Token",
  "price": {
    "open": 0.0245,
    "close": 0.0251,
    "high": 0.0255,
    "low": 0.0243,
    "change": 2.45,
    "changePercent": "+2.45%"
  },
  "volume24h": 125000,
  "marketCap": 1250000,
  "lastUpdate": "2026-05-22T11:30:00.000Z"
}
```

### GET /api/chart-data
Получение данных для графика

**Query Parameters:**
- `interval` - интервал свечей (1h, 4h, 1d)
- `limit` - количество свечей (по умолчанию 100)

**Response:**
```json
[
  {
    "time": 1716379800000,
    "open": "0.025000",
    "high": "0.025500",
    "low": "0.024300",
    "close": "0.025100",
    "volume": "7500.00"
  }
]
```

### GET /api/orderbook
Получение данных рыночного стакана

**Response:**
```json
{
  "bids": [
    {
      "price": "0.025000",
      "amount": "5000.00",
      "total": "125.00"
    }
  ],
  "asks": [
    {
      "price": "0.025100",
      "amount": "4500.00",
      "total": "112.95"
    }
  ]
}
```

## Команды бота

- `/start` - Запуск бота и открытие мини-приложения
- `/help` - Справка по использованию
- `/tracker` - Открыть трекер токена

## Интеграция с TON API

Для получения реальных данных о токене необходимо:

1. Получить API ключ от TON API провайдера (например, TON Center)
2. Заменить mock данные в `bot/index.js` на реальные запросы к API
3. Добавить обработку ошибок и кэширование

Пример интеграции:

```javascript
const axios = require('axios');

async function getRealTokenData() {
  const response = await axios.get(
    `https://toncenter.com/api/v2/getTokenData`,
    {
      params: { address: process.env.TOKEN_ADDRESS },
      headers: { 'X-API-Key': process.env.TON_API_KEY }
    }
  );
  return response.data;
}
```

## Безопасность

- Никогда не коммитьте файл `.env`
- Используйте HTTPS для продакшн деплоя
- Валидируйте все входящие данные
- Ограничьте rate limiting для API

## Поддержка

- Канал: https://t.me/prvn_oficial
- Поддержка: https://t.me/prvn_oficial
- Администратор: https://t.me/PRVN_admin

## Лицензия

MIT
