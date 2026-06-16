const { cmd, commands } = require("../arslan");
const moment = require("moment-timezone");
const { fakevCard } = require('../lib/fakevCard');

cmd({
    pattern: "menu",
    alias: ["commandlist", "allmenu", "help"],
    desc: "Fetch and display all available bot commands",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { from, sender }) => {
    try {
        let totalCommands = 0;
        let grouped = {};

        // Group commands by category
        for (const cmd of commands) {
            if (!cmd.pattern || !cmd.category) continue;

            totalCommands++;
            if (!grouped[cmd.category]) grouped[cmd.category] = [];
            grouped[cmd.category].push(cmd.pattern);
        }

        // Updated Menu Logic
        let menuText = "";
        for (const cat in grouped) {
            menuText += `\n╭──『 *${cat.toUpperCase()}* 』\n`;
            menuText += grouped[cat].map(c => `│ ✦ ${c}`).join("\n");
            menuText += `\n╰───────────────`;
        }

        const time = moment().tz("Asia/Karachi").format("HH:mm:ss");
        const date = moment().tz("Asia/Karachi").format("DD/MM/YYYY");

        const caption = `╭──『 *𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸-𝙼𝙸𝙽𝙸* 』──
│
│ 👑 *CREATOR:* Qadeer_Khan
│ 📅 *DATE:* ${date}
│ 🕒 *TIME:* ${time}
│ 📊 *TOTAL CMDS:* ${totalCommands}
│
╰───────────────
${menuText}
> *© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙺𝙷𝙰𝙽*`.trim();

        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/b5VYfDj6/bot-image.jpg" },
            caption,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                mentionedJid: [sender],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363408401969787@newsletter",
                    newsletterName: "𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸 𝙼𝙸𝙽𝙸",
                    serverMessageId: 143,
                },
            },
        }, { quoted: fakevCard });

    } catch (err) {
        console.error("Menu Error:", err);
        await conn.sendMessage(from, { text: "❌ *Error generating menu.*" }, { quoted: mek });
    }
});
