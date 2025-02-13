// pairing.js
const { generatePairingCode } = require('./utils');
const sendPairingCode = (sock, jid) => {
  const code = generatePairingCode();
  sendMessage(sock, jid, `Your pairing code is: ${code}`);
};

// utils.js
const generatePairingCode = () => {
  return Math.floor(100000 + Math.random() * 900000);  // Random 6-digit code
};
