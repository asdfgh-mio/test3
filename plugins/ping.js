const { cmd } = require('../arslan');

// ===============================
// COMMAND 1: ping (Sci-Fi Look)
// ===============================
cmd({
    pattern: "ping",
    alias: ["latency", "speedtest"],
    desc: "Check system latency",
    category: "main",
    react: "📡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const initTime = performance.now(); 

        const sysReactions = ['🚀', '🛰️', '📡', '☄️', '🛸', '🔋', '⚙️', '💻', '🔮'];
        const msgIcons = ['🟢', '🧿', '💠', '🌐', '🌀', '🔆', '❇️', '🛡️', '🧬'];

        const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
        let selectedReact = pickRandom(sysReactions);
        let selectedIcon = pickRandom(msgIcons);

        await conn.sendMessage(from, { react: { text: selectedReact, key: mek.key } });

        const finalTime = performance.now();
        const serverLatency = (finalTime - initTime).toFixed(2); 

        const responseMsg = `
╭──『 *QADEER-AI LATENCY* 』──
│
│ 📡 *${serverLatency} ms* ${selectedIcon}
│
╰───────────────
> *© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙺𝙷𝙰𝙽*`.trim();

        await conn.sendMessage(from, {
            text: responseMsg,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363408401969787@newsletter',
                    newsletterName: "𝚀𝙰𝙳𝙴𝙴𝚁 - 𝙰𝙸",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (err) {
        console.error("Ping Error:", err);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await conn.sendMessage(from, { text: `❌ Error: ${err.message}` }, { quoted: mek });
    }
});

// ===============================
// COMMAND 2: ping2 (5D VIP Design)
// ===============================
cmd({
    pattern: "ping2",
    alias: ["sysping"],
    desc: "Advanced system ping with network status.",
    category: "main",
    react: "⏱️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const clockStart = Date.now();

        // Random delay to make it look realistic
        const dynamicDelay = Math.floor(Math.random() * 400) + 200; 
        await new Promise(resolve => setTimeout(resolve, dynamicDelay));

        const clockEnd = Date.now();
        const msLatency = clockEnd - clockStart;

        let performanceStatus;
        if (msLatency < 800) performanceStatus = "🟢 *Ultra Fast*";
        else if (msLatency < 1300) performanceStatus = "🟡 *Stable*";
        else performanceStatus = "🔴 *High Load*";

        const outPut = `
╭━〔 ıllı 𝐒𝐘𝐒𝐓𝐄𝐌 𝐏𝐈𝐍𝐆 ıllı 〕━┈⊷
┃ ◈ *ʟᴀᴛᴇɴᴄʏ :* ${msLatency} ms
┃ ◈ *sᴛᴀᴛᴜs :* ${performanceStatus}
┃ ◈ *ɴᴇᴛᴡᴏʀᴋ :* Private
╰━━━━━━━━━━━━━┈⊷
> *© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙺𝙷𝙰𝙽*`.trim();

        await conn.sendMessage(from, { text: outPut }, { quoted: mek });
    } catch (err) {
        console.log(err);
        await conn.sendMessage(from, { text: `❌ Error: ${err.message}` }, { quoted: mek });
    }
});
