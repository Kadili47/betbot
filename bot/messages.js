const db = require("./db"); // Kuunganishwa na database
const fs = require("fs");

// Kusoma betting tips kutoka kwenye mafaili
const getFreeTips = () => fs.readFileSync("./tips/free_tips.txt", "utf8");
const getVipTips = () => fs.readFileSync("./tips/vip_tips.txt", "utf8");

// Function ya kuhandle messages
const handleMessage = async (sender, message) => {
    const phoneNumber = sender; // Namba ya mtumiaji
    const lowerMessage = message.toLowerCase().trim();

    if (lowerMessage === "menu") {
        return "🤖 *Karibu kwenye WhatsApp Auto Betting Tips Bot!* \n\n📞 *Mawasiliano:* 0655126245\n\n🔹 *Command zinazopatikana:* \n- `freetips` (Betting tips za bure)\n- `viptips` (Kwa waliolipia)\n\n⚡ *Lipa Tsh 12,000 kwa mwezi kupata VIP tips zenye uhakika 100%*";
    } 
    else if (lowerMessage === "freetips") {
        return `🎯 *BETTING TIPS ZA BURE* 🎯\n\n${getFreeTips()}\n\n🔥 *VIP TIPS zinapatikana kwa Tsh 12,000 kwa mwezi!* \nLipa kupitia *0618240534 (Halotel) - ABDULKADRI MUKHSIN ALLY* ili upokee tips bora zaidi! 🚀`;
    } 
    else if (lowerMessage === "viptips") {
        const isPaid = await db.checkPayment(phoneNumber);
        if (isPaid) {
            return `✅ *VIP BETTING TIPS* ✅\n\n${getVipTips()}\n\n💰 *Asante kwa kulipia! Furahia huduma zetu!* 🔥`;
        } else {
            return "🚫 *Hujalipia huduma ya VIP Tips!* \n\nLipa Tsh 12,000 kupitia *0618240534 (Halotel) - ABDULKADRI MUKHSIN ALLY* kisha tuma ushahidi wa malipo kupokea tips zako! 📩";
        }
    } 
    else {
        return "⚠️ *Hii ni bot ya betting tips pekee!* \nTumia commands zifuatazo: \n- `menu` (Maelezo) \n- `freetips` (Betting tips za bure) \n- `viptips` (Kwa waliolipia)";
    }
};

module.exports = { handleMessage };
