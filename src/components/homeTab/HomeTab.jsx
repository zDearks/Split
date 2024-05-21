import { useEffect, useState } from 'react';
import './homeTab.css';
import { CreateDeal } from './CreateDeal';
import Modal from '../menuButton/Modal';
import SwipeItems from './SwipeItems';

export function HomeTab({ data }) {
    const [activeTab, setActiveTab] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        setActiveTab('home');
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setActiveTab('home');
    };

    function handleTabChange(tabName) {
        setActiveTab(tabName);
    }

    function handlePayButton(index) {
        setIsModalOpen(true);
    }

    const zaza = () => {
        setActiveTab('home');
    };

    let jsonData = data;

    return (
        <div className="container">
            {jsonData?.[0] && <SwipeItems ready={1} />}
            {!jsonData && <div className="loader" />}
            <div className="debt-container">
                {activeTab === 'home' &&
                    jsonData?.[0] &&
                    jsonData.map((item, index) =>
                        item?.status && item.hidden ? null : item.type ===
                          'debt' ? (
                            <div
                                className={`debt-item${
                                    item.status === 'no' ? ' unpaid' : ''
                                }`}
                                key={index + 0}
                            >
                                <span className="debt-text">
                                    {' '}
                                    {item['debtor']} owes you {item['amount']}{' '}
                                    {item['currency']}
                                    <br />
                                    Location
                                </span>

                                <button className={`button-${item.status}`}>
                                    {item.status === 'yes' ? 'Paid' : 'Unpaid'}
                                </button>
                            </div>
                        ) : (
                            <div className="debt-item" key={index + 0}>
                                <span className="debt-text">
                                    {' '}
                                    You owe {item['amount']} {item['currency']}{' '}
                                    to {item['debtor']}
                                    <br />
                                    Location
                                </span>
                                <button
                                    className={`button-${item.status}`}
                                    onClick={
                                        item.status === 'yes'
                                            ? null
                                            : () => handlePayButton(index)
                                    }
                                >
                                    {item.status === 'yes' ? 'Paid' : 'Pay'}
                                </button>
                            </div>
                        )
                    )}
            </div>
            {activeTab === 'create-deal' && <CreateDeal zaza={zaza} />}
            <button
                className="create-deal-button"
                onClick={() => handleTabChange('create-deal')}
            >
                create deal
            </button>
            <Modal isOpen={isModalOpen} handleClose={closeModal}>
                <button className="pay" id="pay-usd">
                    pay in usd
                </button>
                <button className="pay" id="pay-ton">
                    pay in ton
                </button>
            </Modal>
        </div>
    );
}
