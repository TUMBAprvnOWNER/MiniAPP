import { createChart } from 'lightweight-charts';
import WebApp from '@twa-dev/sdk';

// Инициализация Telegram Web App
WebApp.ready();
WebApp.expand();

// Настройка темы
if (WebApp.colorScheme === 'dark') {
    document.body.style.setProperty('--tg-theme-bg-color', '#1a1a1a');
    document.body.style.setProperty('--tg-theme-text-color', '#ffffff');
    document.body.style.setProperty('--tg-theme-secondary-bg-color', '#2a2a2a');
}

// API URL (замените на ваш реальный URL)
const API_URL = 'http://localhost:3000/api';

// Создание графика
let chart = null;
let candlestickSeries = null;

function initChart() {
    const chartContainer = document.getElementById('chart');
    
    chart = createChart(chartContainer, {
        width: chartContainer.clientWidth,
        height: 300,
        layout: {
            background: { color: 'transparent' },
            textColor: WebApp.themeParams.text_color || '#000000',
        },
        grid: {
            vertLines: { color: 'rgba(197, 203, 206, 0.2)' },
            horzLines: { color: 'rgba(197, 203, 206, 0.2)' },
        },
        crosshair: {
            mode: 1,
        },
        rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 0.5)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.5)',
            timeVisible: true,
            secondsVisible: false,
        },
    });

    candlestickSeries = chart.addCandlestickSeries({
        upColor: '#10b981',
        downColor: '#ef4444',
        borderDownColor: '#ef4444',
        borderUpColor: '#10b981',
        wickDownColor: '#ef4444',
        wickUpColor: '#10b981',
    });

    // Адаптивность
    window.addEventListener('resize', () => {
        chart.applyOptions({ width: chartContainer.clientWidth });
    });
}

// Загрузка данных токена
async function loadTokenData() {
    try {
        const response = await fetch(`${API_URL}/token-data`);
        const data = await response.json();

        // Обновление header
        document.getElementById('ticker').textContent = data.ticker;
        document.getElementById('tokenName').textContent = data.name;
        document.getElementById('currentPrice').textContent = `$${data.price.close}`;
        
        const priceChangeEl = document.getElementById('priceChange');
        priceChangeEl.textContent = data.price.changePercent;
        priceChangeEl.className = 'price-change ' + (data.price.change >= 0 ? 'positive' : 'negative');

        return data;
    } catch (error) {
        console.error('Error loading token data:', error);
        showError('Ошибка загрузки данных токена');
    }
}

// Загрузка данных графика
async function loadChartData() {
    try {
        const response = await fetch(`${API_URL}/chart-data?interval=1h&limit=100`);
        const data = await response.json();

        const chartData = data.map(candle => ({
            time: candle.time / 1000, // конвертируем в секунды
            open: parseFloat(candle.open),
            high: parseFloat(candle.high),
            low: parseFloat(candle.low),
            close: parseFloat(candle.close),
        }));

        candlestickSeries.setData(chartData);
        chart.timeScale().fitContent();

        return chartData;
    } catch (error) {
        console.error('Error loading chart data:', error);
        showError('Ошибка загрузки графика');
    }
}

// Загрузка order book
async function loadOrderBook() {
    try {
        const response = await fetch(`${API_URL}/orderbook`);
        const data = await response.json();

        // Отображение bids
        const bidsContainer = document.getElementById('bids');
        bidsContainer.innerHTML = data.bids.slice(0, 10).map(bid => `
            <div class="orderbook-row">
                <span class="orderbook-price bid">${bid.price}</span>
                <span class="orderbook-amount">${bid.amount}</span>
            </div>
        `).join('');

        // Отображение asks
        const asksContainer = document.getElementById('asks');
        asksContainer.innerHTML = data.asks.slice(0, 10).map(ask => `
            <div class="orderbook-row">
                <span class="orderbook-price ask">${ask.price}</span>
                <span class="orderbook-amount">${ask.amount}</span>
            </div>
        `).join('');

        return data;
    } catch (error) {
        console.error('Error loading orderbook:', error);
        showError('Ошибка загрузки стакана');
    }
}

// Показать ошибку
function showError(message) {
    const container = document.querySelector('.container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    container.insertBefore(errorDiv, container.firstChild);

    setTimeout(() => errorDiv.remove(), 5000);
}

// Обработчики кнопок
document.getElementById('channelBtn').addEventListener('click', (e) => {
    e.preventDefault();
    WebApp.openTelegramLink('https://t.me/prvn_oficial');
});

document.getElementById('supportBtn').addEventListener('click', (e) => {
    e.preventDefault();
    WebApp.openTelegramLink('https://t.me/prvn_oficial');
});

document.getElementById('adminBtn').addEventListener('click', (e) => {
    e.preventDefault();
    WebApp.openTelegramLink('https://t.me/PRVN_admin');
});

// Инициализация приложения
async function init() {
    try {
        // Показываем loader
        WebApp.MainButton.setText('Загрузка...');
        WebApp.MainButton.show();

        // Инициализируем график
        initChart();

        // Загружаем данные
        await Promise.all([
            loadTokenData(),
            loadChartData(),
            loadOrderBook()
        ]);

        // Скрываем loader
        WebApp.MainButton.hide();

        // Обновляем данные каждые 10 секунд
        setInterval(async () => {
            await Promise.all([
                loadTokenData(),
                loadChartData(),
                loadOrderBook()
            ]);
        }, 10000);

    } catch (error) {
        console.error('Initialization error:', error);
        showError('Ошибка инициализации приложения');
        WebApp.MainButton.hide();
    }
}

// Запуск приложения
init();
