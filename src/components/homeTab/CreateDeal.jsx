import { useState } from 'react';
import './createdeal.css';

export function CreateDeal({ zaza }) {
    const [spenderName, setSpenderName] = useState('');
    const [placeName, setPlaceName] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('usd');

    const handleNameChange = (e) => {
        setSpenderName(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handlePlaceChange = (e) => {
        setPlaceName(e.target.value);
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const endpointUrl =
        'https://d5dtsfj4nmbmlsr7uh4n.apigw.yandexcloud.net/api/history/add';
    // Function to send data to the server
    const sendDataToServer = async (data) => {
        try {
            const response = await fetch(endpointUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Initdata: window.Telegram.WebApp.initData,
                    Transaction: JSON.stringify(data),
                },
            });
            const responseData = await response.json();
            console.log('Server Response:', responseData);
            console.log(data);
            console.log(JSON.stringify(data));
            zaza();
        } catch (error) {
            console.error('Error sending data:', error);
            console.log(data);
            console.log(JSON.stringify(data));
        }
    };

    const handleButtonClick = () => {
        const dataToSend = { spenderName, amount, currency };
        sendDataToServer(dataToSend);

        let items = document.getElementsByTagName('input');
        for (const element of items) {
            element.value = '';
        }
    };

    function addSpender() {
        let spenderContainer = document.getElementById('spenderContainer');
        let newSpender = document.createElement('div');
        newSpender.className = 'spender';
        newSpender.innerHTML =
            '<input type="text" class="spenderName" placeholder="spender name" name="spender' +
            (spenderContainer.children.length + 1) +
            '"><br>';
        spenderContainer.appendChild(newSpender);
    }

    function removeSpender() {
        let spenderContainer = document.getElementById('spenderContainer');
        if (spenderContainer.children.length > 1) {
            spenderContainer.removeChild(spenderContainer.lastChild);
        }
    }

    return (
        <div className="create-deal-container">
            <button className="back-button" onClick={() => zaza('home')}>
                back
            </button>

            <form id="paymentForm">
                <div id="spenderContainer">
                    <div className="spender">
                        <input
                            type="text"
                            className="placeName"
                            placeholder="name of the place"
                            value={placeName}
                            onChange={handlePlaceChange}
                        />
                        <input
                            type="text"
                            className="spenderName"
                            placeholder="spender name"
                            value={spenderName}
                            onChange={handleNameChange}
                        />
                        <input
                            type="number"
                            className="spenderAmount"
                            placeholder="amount"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        <select
                            id="currencyType"
                            value={currency}
                            onChange={handleCurrencyChange}
                            required
                        >
                            <option value="usd">USD</option>
                            <option value="ton">TON</option>
                        </select>
                    </div>
                </div>

                <div className="button-container">
                    <button
                        type="button"
                        className="add-spender"
                        onClick={addSpender}
                    >
                        add another spender
                    </button>
                    <button
                        type="button"
                        className="remove-spender"
                        onClick={removeSpender}
                    >
                        remove spender
                    </button>
                </div>
                <button
                    type="button"
                    className="submit-button"
                    onClick={handleButtonClick}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
