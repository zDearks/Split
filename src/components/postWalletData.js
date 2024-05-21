import { useTonAddress } from '@tonconnect/ui-react';

export function PostWalletData() {
    const wallet = useTonAddress();
    const postData = async () => {
        try {
            console.log('wallet try');
            const response = await fetch(
                'https://d5dtsfj4nmbmlsr7uh4n.apigw.yandexcloud.net/api/history/wallet',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Initdata: window.Telegram.WebApp.initData,
                        Wallet: wallet,
                    },
                }
            );
            console.log('response ok');
            if (response.ok) {
                console.log('Success');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    postData();
    console.log(wallet);

    return null;
}
