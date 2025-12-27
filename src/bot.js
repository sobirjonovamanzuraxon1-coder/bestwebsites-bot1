// src/bot.js - COMPLETE UPDATED VERSION WITH EXAM PREP
require('dotenv').config();
const { Telegraf } = require('telegraf');
const { categories } = require('./categories.js');

console.log('='.repeat(50));
console.log('🌐 BESTWEBSITES BOT - Starting...');
console.log('='.repeat(50));

const bot = new Telegraf(process.env.BOT_TOKEN);

// ===== MAIN COMMANDS =====

// Start command - Main menu
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
    
    // Show category buttons
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

// Football category
bot.hears('⚽ Football', async (ctx) => {
    await showWebsites(ctx, 'football');
});

// Programming category
bot.hears('💻 Programming', async (ctx) => {
    await showWebsites(ctx, 'programming');
});

// Design category
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

// Show websites for a category
async function showWebsites(ctx, mainCategory, subCategory = null) {
    // Handle exam prep (nested categories)
    if (mainCategory === 'exam_prep' && subCategory) {
        const examData = categories[mainCategory];
        const subCatData = examData.subcategories[subCategory];
        
        if (!subCatData || !subCatData.websites) {
            await ctx.reply('No websites found. Coming soon!');
            return;
        }
        
        await ctx.replyWithMarkdown(
            `${subCatData.title} *Preparation Websites*\n` +
            `Showing ${subCatData.websites.length} curated resources:\n`
        );
        
        // Display websites
        for (let i = 0; i < subCatData.websites.length; i++) {
            const site = subCatData.websites[i];
            const message = 
                `*${i + 1}. ${site.name}*\n` +
                `${site.description}\n` +
                `🔗 ${site.url}\n` +
                `✅ ${site.pros}\n` +
                `❌ ${site.cons}`;
                
                
            
            await ctx.replyWithMarkdown(message);
            
            if (i < subCatData.websites.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }
        
        // Show exam menu again
        await showExamSubcategories(ctx);
        
    } 
    // Handle regular categories (football, programming, design)
    else {
        const categoryData = categories[mainCategory];
        
        if (!categoryData || categoryData.length === 0) {
            await ctx.reply(`No websites found for ${mainCategory}. Coming soon!`);
            return;
        }
        
        const categoryEmoji = {
            'football': '⚽',
            'programming': '💻',
            'design': '🎨'
        }[mainCategory] || '📋';
        
        await ctx.replyWithMarkdown(
            `${categoryEmoji} *${mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)} Websites*\n` +
            `Showing ${categoryData.length} curated websites:\n`
        );
        
        for (let i = 0; i < categoryData.length; i++) {
            const site = categoryData[i];
            const message = 
                `*${i + 1}. ${site.name}*\n` +
                `🔗 ${site.url}\n` +
                `📝 ${site.description}\n` +
                `✅ *Pros:* ${site.pros}\n` +
                `❌ *Cons:* ${site.cons}\n` +
                `━━━━━━━━━━━━━━━━━━━━`;
            
            await ctx.replyWithMarkdown(message);
            
            if (i < categoryData.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }
        
        // Show category buttons
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

// ===== ERROR HANDLING =====
bot.catch((err, ctx) => {
    console.error('❌ Bot error:', err);
    ctx?.reply?.('Oops! Something went wrong. Try /start again.');
});

// ===== LAUNCH BOT =====
bot.launch()
    .then(() => {
        console.log('✅ BOT IS RUNNING!');
        console.log(`🤖 Username: @${bot.botInfo.username}`);
        console.log('👉 Send /start on Telegram');
        console.log('='.repeat(50));
        console.log('💡 TIP: Open a new terminal for other commands');
        console.log('      while bot runs in this terminal.');
        console.log('='.repeat(50));
    })
    .catch(err => {
        console.error('❌ Failed to start:', err.message);
    });



// ===== ADD DUMMY SERVER HERE (before shutdown) =====
const http = require('http');

// Create simple HTTP server to satisfy Render's port check
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('🤖 BestWebsites Bot is running!\nFind me on Telegram: @BestWebSites_bot');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ HTTP server listening on port ${PORT} (for Render compatibility)`);
    console.log(`🌐 Bot should now deploy successfully!`);
});
// ===== END DUMMY SERVER =====

// Graceful shutdown (EXISTING CODE - KEEP THIS!)
process.once('SIGINT', () => {
    server.close();  // ADD THIS LINE
    bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
    server.close();  // ADD THIS LINE
    bot.stop('SIGTERM');
});

/ /   S t a b i l i t y   t e s t   1 2 / 2 7 / 2 0 2 5   2 3 : 2 0 : 1 4  
 