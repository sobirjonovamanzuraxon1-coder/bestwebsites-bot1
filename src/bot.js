// src/bot.js - COMPLETE VERSION WITH 24/7 KEEP-ALIVE
require('dotenv').config();
const { Telegraf } = require('telegraf');
const { categories } = require('./categories.js');

console.log('='.repeat(50));
console.log('🌐 BESTWEBSITES BOT - Starting...');
console.log('='.repeat(50));

const bot = new Telegraf(process.env.BOT_TOKEN);

// ===== MAIN COMMANDS =====

// Start command
bot.start(async (ctx) => {
    console.log(`👤 ${ctx.from.username} started the bot`);
    
    await ctx.replyWithMarkdown(
        `*🏆 Welcome to BestWebsites Bot!* 🌐\n\n` +
        `I curate the *best websites* for any topic with:\n` +
        `✅ Brief descriptions\n` +
        `✅ Pros & Cons\n` +
        `✅ Direct links\n\n` +
        `*How to use:*\n` +
        `1. Choose a category below\n` +
        `2. Browse curated websites\n` +
        `3. Get honest reviews`
    );
    
    await ctx.reply(
        '👇 *Choose a category:*',
        {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    [{ text: '⚽ Football' }, { text: '💻 Programming' }],
                    [{ text: '🎨 Design' }, { text: '📚 Exam Prep' }],
                    [{ text: '📚 All Categories' }]
                ],
                resize_keyboard: true,
                one_time_keyboard: false
            }
        }
    );
});

// Categories command
bot.command('categories', async (ctx) => {
    await showCategories(ctx);
});

// ===== CATEGORY HANDLERS =====

bot.hears('⚽ Football', async (ctx) => {
    await showWebsites(ctx, 'football');
});

bot.hears('💻 Programming', async (ctx) => {
    await showWebsites(ctx, 'programming');
});

bot.hears('🎨 Design', async (ctx) => {
    await showWebsites(ctx, 'design');
});

// Exam Prep category (NESTED)
bot.hears('📚 Exam Prep', async (ctx) => {
    await showExamSubcategories(ctx);
});

// Exam subcategories
bot.hears('📝 IELTS', async (ctx) => {
    await showWebsites(ctx, 'exam_prep', 'ielts');
});

bot.hears('🎓 SAT', async (ctx) => {
    await showWebsites(ctx, 'exam_prep', 'sat');
});

bot.hears('🎯 TOEFL', async (ctx) => {
    await showWebsites(ctx, 'exam_prep', 'toefl');
});

// All Categories
bot.hears('📚 All Categories', async (ctx) => {
    await showAllCategories(ctx);
});

// Main menu handler
bot.hears('🏠 Main Menu', async (ctx) => {
    await ctx.reply('Returning to main menu...');
    await ctx.reply(
        '👇 *Choose a category:*',
        {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    [{ text: '⚽ Football' }, { text: '💻 Programming' }],
                    [{ text: '🎨 Design' }, { text: '📚 Exam Prep' }],
                    [{ text: '📚 All Categories' }]
                ],
                resize_keyboard: true
            }
        }
    );
});

// ===== HELPER FUNCTIONS =====

// Show websites - ALL IN ONE MESSAGE
async function showWebsites(ctx, mainCategory, subCategory = null) {
    let websites = [];
    let categoryTitle = '';
    
    // Handle exam prep (nested categories)
    if (mainCategory === 'exam_prep' && subCategory) {
        const examData = categories[mainCategory];
        const subCatData = examData.subcategories[subCategory];
        
        if (!subCatData || !subCatData.websites) {
            await ctx.reply('No websites found. Coming soon!');
            return;
        }
        
        websites = subCatData.websites;
        categoryTitle = subCatData.title;
        
    } 
    // Handle regular categories
    else {
        const categoryData = categories[mainCategory];
        
        if (!categoryData || categoryData.length === 0) {
            await ctx.reply(`No websites found for ${mainCategory}. Coming soon!`);
            return;
        }
        
        websites = categoryData;
        categoryTitle = {
            'football': '⚽ Football',
            'programming': '💻 Programming',
            'design': '🎨 Design'
        }[mainCategory] || mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1);
    }
    
    // Build ONE SINGLE message with ALL websites
    let message = `*${categoryTitle} Websites*\n\n`;
    
    // Add each website in compact format
    for (let i = 0; i < websites.length; i++) {
        const site = websites[i];
        
        message += 
            `*${i + 1}. ${site.name}*\n` +
            `🔗 ${site.url}\n` +
            `📝 ${site.description}\n` +
            `✅ ${site.pros}\n` +
            `❌ ${site.cons}\n`;
        
        // Add separator unless it's the last website
        if (i < websites.length - 1) {
            message += `────────────────────\n`;
        }
    }
    
    // Send the SINGLE message
    await ctx.replyWithMarkdown(message);
    
    // Show navigation
    if (mainCategory === 'exam_prep') {
        await showExamSubcategories(ctx);
    } else {
        await showCategories(ctx);
    }
}

// Show exam subcategories
async function showExamSubcategories(ctx) {
    const examData = categories['exam_prep'];
    
    await ctx.replyWithMarkdown(
        `*${examData.title}*\n\n` +
        `${examData.description}\n\n` +
        `*Available Exams:*`
    );
    
    await ctx.reply(
        '👇 Choose an exam:',
        {
            reply_markup: {
                keyboard: [
                    [{ text: '📝 IELTS' }, { text: '🎓 SAT' }],
                    [{ text: '🎯 TOEFL' }],
                    [{ text: '🏠 Main Menu' }]
                ],
                resize_keyboard: true
            }
        }
    );
}

// Show all categories
async function showAllCategories(ctx) {
    const regularCats = ['football', 'programming', 'design'];
    const categoryList = regularCats
        .map(cat => {
            const emoji = {
                'football': '⚽',
                'programming': '💻',
                'design': '🎨'
            }[cat];
            return `${emoji} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`;
        })
        .join('\n');
    
    await ctx.replyWithMarkdown(
        `*📚 All Available Categories*\n\n${categoryList}\n\n` +
        `*Special Category:*\n📚 Exam Prep (IELTS, SAT, TOEFL)\n\n` +
        `Tap a category name to browse websites!`
    );
}

// Show categories menu
async function showCategories(ctx) {
    await ctx.reply(
        '👇 *Browse Categories:*',
        {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    [{ text: '⚽ Football' }, { text: '💻 Programming' }],
                    [{ text: '🎨 Design' }, { text: '📚 Exam Prep' }],
                    [{ text: '🏠 Main Menu' }]
                ],
                resize_keyboard: true,
                one_time_keyboard: false
            }
        }
    );
}

// ===== 24/7 KEEP-ALIVE SYSTEM =====
const http = require('http');

const keepAliveServer = http.createServer((req, res) => {
    // Health check endpoint for Render
    if (req.url === '/health' || req.url === '/') {
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        res.end(JSON.stringify({
            status: 'online',
            service: 'BestWebsites Bot',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            telegram: '@BestWebSites_bot'
        }));
        console.log(`✅ Health check at ${new Date().toLocaleTimeString()}`);
        return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('🤖 BestWebsites Bot\nTelegram: @BestWebSites_bot\nHealth: /health');
});

const PORT = process.env.PORT || 3000;
keepAliveServer.listen(PORT, () => {
    console.log(`✅ 24/7 Keep-alive server on port ${PORT}`);
});

// Self-ping every 14 minutes (under Render's 15min timeout)
setInterval(() => {
    const req = http.get(`http://localhost:${PORT}/health`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log(`🏓 Self-ping: ${JSON.parse(data).timestamp.split('T')[1].slice(0,8)}`);
        });
    });
    req.on('error', () => {});
    req.setTimeout(5000, () => req.destroy());
}, 14 * 60 * 1000); // Every 14 minutes

// Initial ping after 30 seconds
setTimeout(() => {
    http.get(`http://localhost:${PORT}/health`);
}, 30000);

// ===== ERROR HANDLING =====
bot.catch((err, ctx) => {
    console.error('❌ Bot error:', err.message);
    ctx?.reply?.('Oops! Something went wrong. Try /start again.');
});

// ===== BOT LAUNCH =====
bot.launch()
    .then(() => {
        console.log('✅ Bot connected to Telegram!');
        console.log(`🤖 Username: @${bot.botInfo.username}`);
        console.log('👉 Send /start on Telegram');
        console.log('='.repeat(50));
        console.log('💡 Bot will stay 24/7 with keep-alive system!');
        console.log('='.repeat(50));
    })
    .catch(err => {
        console.error('❌ Bot failed to connect:', err.message);
        // Don't crash on conflict errors
        if (err.response?.description?.includes('terminated by other getUpdates')) {
            console.log('⚠️  Ignoring conflict error - bot might already be running');
        }
    });

// ===== GRACEFUL SHUTDOWN =====
process.once('SIGINT', () => {
    console.log('🛑 SIGINT received - shutting down');
    keepAliveServer.close();
    bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
    console.log('🛑 SIGTERM received - shutting down');
    keepAliveServer.close();
    bot.stop('SIGTERM');
});
