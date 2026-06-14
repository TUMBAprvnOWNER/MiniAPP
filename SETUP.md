# PRVN Token Tracker - Инструкция по запуску

## Быстрый старт

### 1. Настройка переменных окружения

Создайте файл `.env` в корне проекта и заполните его:

```env
BOT_TOKEN=YOUR_BOT_TOKEN_FROM_BOTFATHER
WEBAPP_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

### 2. Получение токена бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Введите имя бота (например: PRVN Token Tracker)
4. Введите username бота (например: prvn_tracker_bot)
5. Скопируйте полученный токен в `.env` файл

### 3. Запуск приложения

Откройте два терминала:

**Терминал 1 - Запуск бота:**
```bash
npm run dev:bot
```

**Терминал 2 - Запуск веб-приложения:**
```bash
npm run dev:webapp
```

Или запустите всё одной командой:
```bash
npm run dev
```

### 4. Тестирование

1. Откройте вашего бота в Telegram
2. Отправьте команду `/start`
3. Нажмите кнопку "📊 Открыть трекер"
4. Мини-приложение должно открыться с графиком и данными

## Настройка для продакшн

### Шаг 1: Деплой веб-приложения

Рекомендуется использовать Vercel, Netlify или GitHub Pages:

**Vercel:**
```bash
cd webapp
npm run build
vercel --prod
```

После деплоя вы получите URL (например: `https://your-app.vercel.app`)

### Шаг 2: Обновление конфигурации бота

Обновите `.env`:
```env
WEBAPP_URL=https://your-app.vercel.app
```

### Шаг 3: Настройка Menu Button в BotFather

1. Откройте @BotFather
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Выберите "Bot Settings" → "Menu Button"
5. Выберите "Edit menu button URL"
6. Введите URL вашего веб-приложения

### Шаг 4: Деплой бота

**Вариант A - Heroku:**
```bash
heroku create prvn-bot
heroku config:set BOT_TOKEN=your_token
heroku config:set WEBAPP_URL=your_webapp_url
git push heroku main
```

**Вариант B - VPS с PM2:**
```bash
# На сервере
git clone your-repo
cd PRVN
npm install
npm install -g pm2

# Создайте .env файл
nano .env

# Запустите бота
pm2 start bot/index.js --name prvn-bot
pm2 startup
pm2 save
```

## Интеграция с реальным TON API

Замените mock данные в `bot/index.js` на реальные запросы:

```javascript
const axios = require('axios');

// Получение данных токена
app.get('/api/token-data', async (req, res) => {
  try {
    const response = await axios.get(
      'https://tonapi.io/v2/jettons/YOUR_TOKEN_ADDRESS',
      {
        headers: {
          'Authorization': `Bearer ${process.env.TON_API_KEY}`
        }
      }
    );
    
    const data = {
      ticker: response.data.symbol,
      name: response.data.name,
      price: {
        open: response.data.price.open,
        close: response.data.price.close,
        // ... остальные данные
      }
    };
    
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
```

## Проверка работы

1. Бот должен отвечать на команды `/start`, `/help`, `/tracker`
2. Кнопка "Открыть трекер" должна открывать мини-приложение
3. В мини-приложении должны отображаться:
   - Тикер и название токена
   - Текущая цена
   - Свечной график
   - Рыночный стакан
   - Кнопки навигации

## Устранение проблем

**Бот не отвечает:**
- Проверьте правильность BOT_TOKEN в `.env`
- Убедитесь, что бот запущен (`npm run dev:bot`)

**Мини-приложение не открывается:**
- Проверьте WEBAPP_URL в `.env`
- Убедитесь, что веб-приложение запущено (`npm run dev:webapp`)
- Проверьте настройки Menu Button в @BotFather

**Ошибки CORS:**
- Убедитесь, что в `bot/index.js` включен CORS
- Проверьте, что API доступен по указанному URL

**График не отображается:**
- Откройте консоль браузера (F12)
- Проверьте наличие ошибок
- Убедитесь, что API возвращает данные

## Контакты

- Канал: https://t.me/prvn_oficial
- Поддержка: https://t.me/prvn_oficial
- Администратор: https://t.me/PRVN_admin
