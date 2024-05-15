import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
function PaymentSuccess() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventDataString = searchParams.get('eventData');
    const amount = searchParams.get('amount');
    const eventData = eventDataString ? JSON.parse(decodeURIComponent(eventDataString)) : null;


    useEffect(() => {
        // Send eventData and amount to the API
        if (eventData && amount) {
            savePayment(eventData, amount);
        }
    }, [eventData, amount]);

    const savePayment = async (eventData, amount) => {
        try {
            const response = await fetch('/save-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ eventData, amount }),
            });

            if (!response.ok) {
                throw new Error('Failed to save payment');
            }

            console.log('Payment saved successfully');
        } catch (error) {
            console.error('Error saving payment:', error);
        }
    };


    return (
        <div class="container-xxl p-0">
                     <Navbar/>
                     <div class="container-fluid py-5 bg-primary text-center">
                     <img class="m-3" src="assets/img/PAYMENT-SUCCESS.png" alt="payment-success"/>
</div>        
        </div>
        
       );
}

export default PaymentSuccess;


