const mongoose = require('mongoose');

const paymentWalletSchema = new mongoose.Schema({
    organizerEmail: {
        type: String,
        required: true,
        
    },
    accountNumber: {
        type: String,
        required: true,
        
    },
    paymentGateway: {
        type: String,
        required: true,
    }
});

const PaymentWallet = mongoose.model('PaymentWallet', paymentWalletSchema);

module.exports = PaymentWallet;
