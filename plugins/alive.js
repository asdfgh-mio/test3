const { cmd } = require("../arslan");
const { runtime } = require("../lib/functions");
const { fakevCard } = require('../lib/fakevCard');

// --- ALIVE COMMAND ---
cmd({
    pattern: "alive",
    alias: ["ping", "status"],
    desc: "Check if bot is alive",
    category: "utility",
    react: "💚",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '💚', key: m.key } });
        
        // Custom runtime format: h, m, s
        const uptime = runtime(process.uptime()).replace("hours", "h").replace("hour", "h").replace("minutes", "m").replace("minute", "m").replace("seconds", "s").replace("second", "s");
        
        const aliveMsg = `
╭──『 *𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸-𝙼𝙸𝙽𝙸* 』──
│
│ 💚 *BOT IS ACTIVE*
│ ⏳ *UPTIME:* ${uptime}
│
╰───────────────
> *© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙺𝙷𝙰𝙽*`.trim();
        
        await conn.sendMessage(from, { 
            text: aliveMsg,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                mentionedJid: [m.sender],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363408401969787@newsletter',
                    newsletterName: '𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("Error in alive command:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await conn.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: mek });
    }
});

// --- UPTIME COMMAND ---
cmd({
    pattern: "uptime",
    alias: ["runtime", "up"],
    desc: "Check bot uptime",
    category: "utility",
    react: "⏱️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        const uptime = runtime(process.uptime()).replace("hours", "h").replace("hour", "h").replace("minutes", "m").replace("minute", "m").replace("seconds", "s").replace("second", "s");
        
        await conn.sendMessage(from, { 
            text: `⏱️ *Bot Uptime:* ${uptime}`,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                mentionedJid: [m.sender],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363408401969787@newsletter',
                    newsletterName: '𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("Error in uptime command:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await conn.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: mek });
    }
});
