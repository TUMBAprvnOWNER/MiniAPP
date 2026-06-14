# 🚀 Быстрый старт PRVN Token Tracker

## ✅ Что уже сделано:

1. ✅ Создана структура проекта
2. ✅ Установлены все зависимости
3. ✅ Настроен Telegram бот
4. ✅ Создано мини-приложение с графиком
5. ✅ Реализован рыночный стакан
6. ✅ Добавлены кнопки навигации

## 📋 Следующие шаги:

### 1. Получите токен бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду: `/newbot`
3. Введите имя: `PRVN Token Tracker`
4. Введите username: `prvn_tracker_bot` (или любой доступный)
5. Скопируйте полученный токен

### 2. Настройте .env файл

Откройте файл `.env` и замените `your_bot_token_here` на ваш токен:

```env
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
WEBAPP_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

### 3. Запустите проект

Откройте **два терминала** в папке проекта:

**Терминал 1 - Бот:**
```bash
npm run dev:bot
```

**Терминал 2 - Веб-приложение:**
```bash
npm run dev:webapp
```

Или запустите всё одной командой:
```bash
npm run dev
```

### 4. Протестируйте

1. Откройте вашего бота в Telegram
2. Отправьте `/start`
3. Нажмите "📊 Открыть трекер"
4. Мини-приложение откроется!

## 📱 Что вы увидите:

- **Тикер и цена** - PRVN Token с актуальной ценой
- **Свечной график** - интерактивный график цены
- **Рыночный стакан** - заявки на покупку и продажу
- **Кнопки** - канал, поддержка, администратор

## 🔧 Интеграция с реальным TON API

Сейчас используются mock данные. Для подключения реального API:

1. Получите API ключ от [TON Center](https://toncenter.com/)
2. Добавьте в `.env`:
```env
TON_API_KEY=your_api_key
TOKEN_ADDRESS=your_token_address
```
3. Замените mock данные в `bot/index.js` на реальные запросы

## 🌐 Деплой в продакшн

### Веб-приложение (Vercel):
```bash
cd webapp
npm run build
vercel --prod
```

### Бот (Heroku/VPS):
```bash
# Heroku
heroku create prvn-bot
heroku config:set BOT_TOKEN=your_token
git push heroku main

# VPS с PM2
pm2 start bot/index.js --name prvn-bot
pm2 startup
pm2 save
```

## 📚 Документация

- `README.md` - Полная документация
- `SETUP.md` - Детальная инструкция по настройке

## 🆘 Помощь

Если что-то не работает:

1. Проверьте, что BOT_TOKEN правильный
2. Убедитесь, что оба сервера запущены
3. Проверьте консоль на ошибки
4. Откройте DevTools в мини-приложении (F12)

## 📞 Контакты

- Канал: https://t.me/prvn_oficial
- Поддержка: https://t.me/prvn_oficial
- Администратор: https://t.me/PRVN_admin

---

**Готово к запуску!** 🎉
