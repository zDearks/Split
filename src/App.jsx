import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { PostWalletData } from './components/postWalletData';
import { MenuButton } from './components/menuButton/MenuButton';
import { HomeTab } from './components/homeTab/HomeTab';
import SwipeItems from './components/homeTab/SwipeItems';
import { useState, useEffect } from 'react';

function App() {
    const [jsonData, setJsonData] = useState('');

    useEffect(() => {
        let webApp = window.Telegram.WebApp;

        webApp.expand();

        const fetchData = async () => {
            const url =
                'https://d5dtsfj4nmbmlsr7uh4n.apigw.yandexcloud.net/api/history/all';
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Initdata: window.Telegram.WebApp.initData,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network error');
                }
                const data = await response.json();
                setJsonData(data);
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        };

        fetchData();
    }, []);

    if (jsonData) {
        jsonData.map((item) => {
            item.hidden = 0;
        });
    }
    return (
        <TonConnectUIProvider manifestUrl="https://hedfkoa.pw/tonconnect-manifest.json">
            <PostWalletData />
            <MenuButton data={jsonData} />
            <HomeTab data={jsonData} />
        </TonConnectUIProvider>
    );
}

export default App;
