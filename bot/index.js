require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEBAPP_URL;
const port = process.env.PORT || 3000;

// Создаем бота
const bot = new TelegramBot(token, { polling: true });

// Создаем Express сервер для API
const app = express();
app.use(cors());
app.use(express.json());

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'пользователь';

  bot.sendMessage(
    chatId,
    `Привет, ${firstName}! 👋\n\nДобро пожаловать в PRVN Token Tracker.\n\nНажмите кнопку ниже, чтобы открыть мини-приложение и отслеживать цену токена в реальном времени.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '📊 Открыть трекер',
              web_app: { url: webAppUrl }
            }
          ],
          [
            {
              text: '📢 Канал',
              url: 'https://t.me/prvn_oficial'
            },
            {
              text: '💬 Поддержка',
              url: 'https://t.me/prvn_oficial'
            }
          ],
          [
            {
              text: '👨‍💼 Администратор',
              url: 'https://t.me/PRVN_admin'
            }
          ]
        ]
      }
    }
  );
});

// Обработчик команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    `📖 Помощь по использованию бота:\n\n` +
    `🔹 /start - Запустить бота и открыть мини-приложение\n` +
    `🔹 /help - Показать это сообщение\n` +
    `🔹 /tracker - Открыть трекер токена\n\n` +
    `Для отслеживания цены токена используйте кнопку "Открыть трекер".`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '📊 Открыть трекер',
              web_app: { url: webAppUrl }
            }
          ]
        ]
      }
    }
  );
});

// Обработчик команды /tracker
bot.onText(/\/tracker/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    '📊 Откройте мини-приложение для отслеживания токена:',
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '📊 Открыть трекер',
              web_app: { url: webAppUrl }
            }
          ]
        ]
      }
    }
  );
});

// API эндпоинт для получения данных о токене
app.get('/api/token-data', async (req, res) => {
  try {
    // Здесь будет логика получения данных из TON API
    // Пока возвращаем mock данные
    const mockData = {
      ticker: 'PRVN',
      name: 'PRVN Token',
      price: {
        open: 0.0245,
        close: 0.0251,
        high: 0.0255,
        low: 0.0243,
        change: 2.45,
        changePercent: '+2.45%'
      },
      volume24h: 125000,
      marketCap: 1250000,
      lastUpdate: new Date().toISOString()
    };

    res.json(mockData);
  } catch (error) {
    console.error('Error fetching token data:', error);
    res.status(500).json({ error: 'Failed to fetch token data' });
  }
});

// API эндпоинт для получения данных графика
app.get('/api/chart-data', async (req, res) => {
  try {
    const { interval = '1h', limit = 100 } = req.query;
    
    // Mock данные для свечного графика
    const mockCandles = [];
    const now = Date.now();
    const intervalMs = 3600000; // 1 час

    for (let i = limit - 1; i >= 0; i--) {
      const time = now - (i * intervalMs);
      const basePrice = 0.025;
      const volatility = 0.002;
      
      const open = basePrice + (Math.random() - 0.5) * volatility;
      const close = open + (Math.random() - 0.5) * volatility;
      const high = Math.max(open, close) + Math.random() * volatility;
      const low = Math.min(open, close) - Math.random() * volatility;
      const volume = Math.random() * 10000 + 5000;

      mockCandles.push({
        time: time,
        open: open.toFixed(6),
        high: high.toFixed(6),
        low: low.toFixed(6),
        close: close.toFixed(6),
        volume: volume.toFixed(2)
      });
    }

    res.json(mockCandles);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
});

// API эндпоинт для получения данных order book
app.get('/api/orderbook', async (req, res) => {
  try {
    // Mock данные для order book
    const mockOrderBook = {
      bids: [],
      asks: []
    };

    const basePrice = 0.025;
    
    // Генерируем bids (заявки на покупку)
    for (let i = 0; i < 15; i++) {
      const price = basePrice - (i * 0.0001);
      const amount = Math.random() * 10000 + 1000;
      mockOrderBook.bids.push({
        price: price.toFixed(6),
        amount: amount.toFixed(2),
        total: (price * amount).toFixed(2)
      });
    }

    // Генерируем asks (заявки на продажу)
    for (let i = 0; i < 15; i++) {
      const price = basePrice + (i * 0.0001);
      const amount = Math.random() * 10000 + 1000;
      mockOrderBook.asks.push({
        price: price.toFixed(6),
        amount: amount.toFixed(2),
        total: (price * amount).toFixed(2)
      });
    }

    res.json(mockOrderBook);
  } catch (error) {
    console.error('Error fetching orderbook:', error);
    res.status(500).json({ error: 'Failed to fetch orderbook' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`✅ API сервер запущен на порту ${port}`);
});

console.log('✅ Telegram бот запущен');
