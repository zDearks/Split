import './menuButton.css';
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { TonConnectButton } from '@tonconnect/ui-react';

export function MenuButton({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tgId, setTgId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [activeTab, setActiveTab] = useState('');

    let jsonData = data;

    useEffect(() => {
        let webApp = window.Telegram.WebApp;

        if (webApp?.initDataUnsafe?.user) {
            setTgId(webApp.initDataUnsafe.user.id);
            setFirstName(webApp.initDataUnsafe.user.username);
            console.log(tgId);
        } else {
            setFirstName('User');
        }
        setActiveTab('main');
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActiveTab('main');
    };

    function copyUserName() {
        navigator.clipboard.writeText(firstName);
        alert('Copied');
    }

    const openHistory = () => {
        setActiveTab('history');
        console.log(`${activeTab} -> history`);
    };

    return (
        <div className="container" id="mbc">
            <button className="menu-button" onClick={openModal}>
                menu
            </button>

            <Modal isOpen={isModalOpen} handleClose={closeModal}>
                {activeTab === 'main' && (
                    <div className="profile-container">
                        <button
                            className="username"
                            onClick={() => copyUserName}
                            id="user__name"
                        >
                            your id:
                            <br />
                            <u>
                                <p>{firstName}</p>
                            </u>
                        </button>
                        <TonConnectButton />
                        <button
                            className="history-button"
                            onClick={openHistory}
                        >
                            history
                        </button>
                    </div>
                )}
                {activeTab === 'history' &&
                    jsonData?.map((item, index) =>
                        item?.status && item.hidden ? null : item.type ===
                              'debt' && item.status === 'yes' ? (
                            <div className="debt-item" key={index + 0}>
                                {item['debtor']} owes you {item['amount']}{' '}
                                {item['currency']}
                                <button className={`button-${item.status}`}>
                                    {item.status === 'yes' ? 'Paid' : 'Unpaid'}
                                </button>
                            </div>
                        ) : (
                            item.status === 'yes' && (
                                <div className="debt-item" key={index + 0}>
                                    You owe {item['amount']} {item['currency']}{' '}
                                    to {item['debtor']}
                                    <button
                                        className={`button-${item.status}`}
                                        onClick={
                                            item.status === 'yes'
                                                ? null
                                                : () => console.log(index)
                                        }
                                    >
                                        {item.status === 'yes' ? 'Paid' : 'Pay'}
                                    </button>
                                </div>
                            )
                        )
                    )}
            </Modal>
        </div>
    );
}
