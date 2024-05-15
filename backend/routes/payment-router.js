//
require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/payment-model');
const User = require('../models/user-model');
const PaymentWallet = require('../models/payment-wallet-model');
// Route to handle Stripe payments
router.post('/create-checkout-session', async (req, res) => {
    try {
         const {eventData,package_to_be_paid} = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'pkr',
                    product_data: {
                        name: eventData.title,
                        metadata: {
                            id: eventData.organizer,
                        },
                    },
                    unit_amount: package_to_be_paid.amount*100, // Amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:3000/success?eventData=${encodeURIComponent(JSON.stringify(eventData))}&amount=${package_to_be_paid.amount}`, // Redirect URL after successful payment
            cancel_url: 'http://localhost:3000/cancel', // Redirect URL if payment is canceled
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Error creating checkout session');
    }
});


router.post('/save-payment', async (req, res) => {
    try {
        const { eventData, amount } = req.body;

        const organizer = await User.findById(eventData.organizer);
        const organizerEmail = organizer.email;

        // Find the sponsor's email from the User collection
        const sponsor = await User.findById(req.session.user);
        const sponsorEmail = sponsor.email;
         
        const sponsoredEvent = eventData.title;

        // Create a new payment document with status set to 'pending' by default
        const payment = new Payment({
            sponsorEmail,
            organizerEmail,
            sponsoredEvent,
            amount,
        });

        // Save the payment document to the database
        await payment.save();

        res.status(201).json(payment); // Return the saved payment details
    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).send('Error saving payment');
    }
});

router.get("/adminreceivedpayments",async (req,res) => {
    try {
        res.status(200).send("Welcome to Payments Received");
    } catch (error) {
        res.status(400).send("Error Occured");
    }
  });

  router.get("/setpaymentdetails",async (req,res) => {
    try {
        res.status(200).send("Welcome to Set Payments Details");
    } catch (error) {
        res.status(400).send("Error Occured");
    }
  });


router.get('/getreceivedpayments', async (req, res) => {
    try {
        // Retrieve all received payments from the Payment collection
        const receivedPayments = await Payment.find(); // Assuming completed payments are received

        res.status(200).json(receivedPayments); // Return the received payments
    } catch (error) {
        console.error('Error fetching received payments:', error);
        res.status(500).send('Error fetching received payments');
    }
});

router.put('/updatePaymentStatus/:paymentId', async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        
        const { status } = req.body;

        // Find the payment by ID and update its status
        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.json(updatedPayment);
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).send('Error updating payment status');
    }
});

router.get("/adminwalletdetails",async (req,res) => {
    try {
        res.status(200).send("Welcome to Payment Wallet Details");
    } catch (error) {
        res.status(400).send("Error Occured");
    }
  });

router.get('/adminpaymentwallets', async (req, res) => {
    try {
        const paymentWallets = await PaymentWallet.find();
        res.json(paymentWallets);
    } catch (error) {
        console.error('Error fetching payment wallet records:', error);
        res.status(500).send('Error fetching payment wallet records');
    }
});

router.post('/addpaymentwallet', async (req, res) => {
    try {
        const {accountNumber, paymentGateway } = req.body;
        
        const organizer = await User.findById(req.session.user);
        const organizerEmail = organizer.email;

        const paymentWallet = new PaymentWallet({
            organizerEmail,
            accountNumber,
            paymentGateway
        });

        await paymentWallet.save();
        res.status(201).json(paymentWallet);
    } catch (error) {
        console.error('Error saving payment wallet details:', error);
        res.status(500).send('Error saving payment wallet details');
    }
});

module.exports = router;
