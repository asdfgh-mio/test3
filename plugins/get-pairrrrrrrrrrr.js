const { cmd } = require('../arslan');
const axios = require('axios');

// --- PAIR COMMAND ---
cmd({
    pattern: "pair",
    alias: ["pairing"],
    react: "✅",
    desc: "Get pairing code for QADEER-AI bot",
    category: "download",
    use: ".pair 92323***",
    filename: __filename
}, async (conn, mek, m, { from, senderNumber, q, reply }) => {
    try {
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await conn.sendMessage(from, { text: "❌ *Invalid Number*\nUse format: .pair 923xxxxxxx" }, { quoted: mek });
        }

        const { data } = await axios.get(`https://qadeer-ai-ace092165300.herokuapp.com/code?number=${encodeURIComponent(phoneNumber)}`);

        if (!data?.code) return await conn.sendMessage(from, { text: "❌ *Failed to get code*" }, { quoted: mek });

        const pairingCode = data.code;

        const msg = `
╭──『 *PAIRING CODE* 』──
│
│ 🔢 *CODE:* ${pairingCode}
│
╰───────────────
> *Copy and Link Device*`.trim();

        await conn.sendMessage(from, { text: msg }, { quoted: mek });
        await conn.sendMessage(from, { text: pairingCode }, { quoted: mek });

    } catch (e) {
        await conn.sendMessage(from, { text: `❌ *Error:* ${e.message}` }, { quoted: mek });
    }
});

// --- PAIR2 COMMAND ---
cmd({
    pattern: "pair2",
    alias: ["clonebot"],
    react: "📉",
    desc: "Get pairing code with image",
    category: "download",
    use: ".pair2 92323XXX",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, senderNumber, q, reply }) => {
    try {
        if (isGroup) return await conn.sendMessage(from, { text: "❌ *Private chat only*" }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await conn.sendMessage(from, { text: "❌ *Invalid Number*" }, { quoted: mek });
        }

        const { data } = await axios.get(`https://qadeer-ai-ace092165300.herokuapp.com/code?number=${encodeURIComponent(phoneNumber)}`);

        if (!data?.code) return await conn.sendMessage(from, { text: "❌ *Failed to get code*" }, { quoted: mek });

        const pairingCode = data.code;

        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/b5VYfDj6/bot-image.jpg" },
            caption: `
╭──『 *PAIRING SUCCESS* 』──
│
│ 👤 *USER:* +${phoneNumber}
│ 🔢 *CODE:* ${pairingCode}
│
╰───────────────
> *Copy the code below 👇🏻*`.trim()
        }, { quoted: mek });

        await conn.sendMessage(from, { text: pairingCode }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        await conn.sendMessage(from, { text: `❌ *Error:* ${e.message}` }, { quoted: mek });
    }
});
