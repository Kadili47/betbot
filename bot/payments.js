const db = require("./db");

// Function ya kusajili malipo
const registerPayment = async (phoneNumber) => {
    try {
        await db.query("INSERT INTO payments (phone_number, status) VALUES (?, 'paid') ON DUPLICATE KEY UPDATE status='paid'", [phoneNumber]);
        return true;
    } catch (error) {
        console.error("Error saving payment:", error);
        return false;
    }
};

// Function ya kuangalia kama mtumiaji amelipa
const checkPayment = async (phoneNumber) => {
    try {
        const result = await db.query("SELECT status FROM payments WHERE phone_number = ?", [phoneNumber]);
        return result.length > 0 && result[0].status === "paid";
    } catch (error) {
        console.error("Error checking payment:", error);
        return false;
    }
};

module.exports = { registerPayment, checkPayment };
