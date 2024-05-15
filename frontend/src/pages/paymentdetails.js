import React, { useState } from 'react';
import Navbar from './Navbar';


function PaymentWalletDetails() {

    const [accountNumber, setAccountNumber] = useState('');
    const [paymentGateway, setPaymentGateway] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/addpaymentwallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountNumber,
                    paymentGateway,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save payment wallet details');
            }

            // Clear form fields after successful submission
            setAccountNumber('');
            setPaymentGateway('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        
        
        <div class="container-xxl p-0">
                     <Navbar/>
                     <div class="container-fluid py-5 bg-dark text-center ">
                     <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                    <h2 className="mb-4 text-white">Payment Wallet Details</h2>
                    <p className="mb-4 text-white">Provide details about your payment wallet to receive payments</p>
                    <div className="m-5">
                        <select
                            className="form-select"
                            value={paymentGateway}
                            onChange={(e) => setPaymentGateway(e.target.value)}
                            required
                        >
                            <option value="">Select Payment Gateway</option>
                            <option value="EasyPaisa">EasyPaisa</option>
                            <option value="JazzCash">JazzCash</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="m-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-50">Save</button>
                    <div style={{marginBottom:'127px'}}></div>
                </form>

                     </div>               
        </div>
       );
}

export default PaymentWalletDetails;


