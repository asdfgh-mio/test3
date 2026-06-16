const { cmd } = require('../arslan');
const axios = require('axios');

cmd({
    pattern: "ai",
    alias: ["chat", "ask", "gpt"],
    desc: "Use AI Models to chat",
    category: "utility",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, q, sender }) => {
    try {
        if (!q) {
            const errorMsg = `╭──『 *ERROR* 』──\n│\n│ ❌ Query missing!\n│ 💡 Use: .ai Hi\n│ 💡 Use: .ai deepseek | Hi\n│\n╰───────────────`;
            return await conn.sendMessage(from, { text: errorMsg }, { quoted: mek });
        }

        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        let model = "gemini-2.5-flash"; // Default model
        let prompt = q;

        // Agar user pipe (|) use kare specific model k lie
        if (q.includes('|')) {
            const parts = q.split('|');
            model = parts[0].trim();
            prompt = parts[1].trim();
        }

        // Standard chat endpoint (Ramzan's API usually uses /api/chat or similar)
        const apiUrl = `https://ramzan-multimodel.vercel.app/api/chat?model=${encodeURIComponent(model)}&query=${encodeURIComponent(prompt)}`;
        
        const { data } = await axios.get(apiUrl);

        // Extracting response based on common API structures
        const aiResponse = data.response || data.result || data.message || data.data; 

        if (!aiResponse) throw new Error("API ne response nahi diya.");

        const msg = `╭──『 *QADEER-AI ENGINE* 』──
│
│ 🤖 *MODEL:* ${model}
│ 👤 *USER:* @${sender.split('@')[0]}
│
╰───────────────
${aiResponse}

> *© QADEER-KHAN*`.trim();

        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                mentionedJid: [sender],
                isForwarded: true,
                forwardingScore: 999
            }
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (err) {
        console.error("AI Command Error:", err);
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
        await conn.sendMessage(from, { text: `❌ *Error:* ${err.message}` }, { quoted: mek });
    }
});
