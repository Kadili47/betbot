const { Client, LocalAuth } = require('whatsapp-web.js');
const mysql = require('mysql');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a new WhatsApp client instance
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    console.log('QR Code:', qr);
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', (message) => {
    // Check if message starts with the command to get betting tips
    if (message.body.toLowerCase() === '/start') {
        // Ask for the pairing code
        client.sendMessage(message.from, 'Please enter your pairing code to get started.');
    } else if (message.body.toLowerCase().startsWith('pairing code:')) {
        // Extract the pairing code
        const pairingCode = message.body.split(':')[1].trim();

        // Validate pairing code
        validatePairingCode(pairingCode, message.from);
    }
});

function validatePairingCode(pairingCode, user) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'betting_bot',
    });

    connection.connect();

    connection.query('SELECT * FROM users WHERE pairing_code = ?', [pairingCode], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            // Valid pairing code, send betting tips
            sendBettingTips(user);
        } else {
            // Invalid pairing code
            client.sendMessage(user, 'Invalid pairing code. Please check and try again.');
        }
    });

    connection.end();
}

function sendBettingTips(user) {
    const tips = getBettingTips(); // Function that fetches tips (can be AI-generated)

    client.sendMessage(user, `Here are your betting tips:\n${tips}`);
}

function getBettingTips() {
    // Placeholder for betting tips generation (can be an AI model or predefined tips)
    return 'Tip 1: Team A to win\nTip 2: Team B to score\nTip 3: Over 2.5 goals';
}

client.initialize();
