const { cmd } = require('../arslan');
const axios = require('axios');
const { fakevCard } = require('../lib/fakevCard');

cmd({
    pattern: "models",
    alias: ["aimodels", "modellist"],
    desc: "Fetch available AI models list",
    category: "utility",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        // Show loading reaction
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // Fetch data from API
        const { data } = await axios.get('https://ramzan-multimodel.vercel.app/api/models');

        if (data.status !== "success") {
            return await conn.sendMessage(from, { text: "❌ *Failed to fetch models.*" }, { quoted: mek });
        }

        const models = data.models;
        const grouped = {};

        // Group models dynamically by their 'type' (chat, video, image)
        for (const key in models) {
            const type = models[key].type.toUpperCase();
            if (!grouped[type]) grouped[type] = [];
            grouped[type].push(key);
        }

        // Format the grouped models into VIP boxes
        let modelsText = "";
        for (const type in grouped) {
            modelsText += `\n╭──『 *${type} MODELS* 』\n`;
            modelsText += grouped[type].map(mod => `│ ✦ ${mod}`).join("\n");
            modelsText += `\n╰───────────────`;
        }

        // Main Caption Message
        const msg = `╭──『 *QADEER-AI MODELS* 』──
│
│ 📊 *TOTAL:* ${data.total_models}
│ 👨‍💻 *API BY:* ${data.developed_by}
│ 👤 *USER:* @${sender.split('@')[0]}
│
╰───────────────${modelsText}
> *© QADEER-KHAN*`.trim();

        // Send with Image and VIP Newsletter / vCard format
        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/b5VYfDj6/bot-image.jpg" },
            caption: msg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                mentionedJid: [sender],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363408401969787@newsletter",
                    newsletterName: "QADEER-AI MINI",
                    serverMessageId: 143,
                },
            },
        }, { quoted: fakevCard });

        // Show success reaction
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (err) {
        console.error("Models Command Error:", err);
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
        await conn.sendMessage(from, { text: `❌ *Error:* ${err.message}` }, { quoted: mek });
    }
});
