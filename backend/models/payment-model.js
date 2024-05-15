//
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    sponsorEmail: {
        type: String,
        required: true
    },
    organizerEmail: {
        type: String,
        required: true
    },
    sponsoredEvent: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
