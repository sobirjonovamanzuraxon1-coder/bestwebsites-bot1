// src/categories.js - MINIMAL DESCRIPTIONS, 5+ WEBSITES PER CATEGORY
const categories = {
    // ===== FOOTBALL =====
    football: [
        { name: "ESPN FC", url: "https://www.espn.com/soccer/", description: "Live scores & global football news", pros: "Real-time updates, comprehensive", cons: "Ads, regional restrictions" },
        { name: "FotMob", url: "https://www.fotmob.com/", description: "Live scores & match stats worldwide", pros: "Clean interface, push alerts", cons: "Limited editorial content" },
        { name: "Transfermarkt", url: "https://www.transfermarkt.com/", description: "Football transfers & player values", pros: "Extensive database, market values", cons: "Outdated design, registration needed" },
        { name: "BBC Sport Football", url: "https://www.bbc.com/sport/football", description: "Football news, scores & highlights", pros: "Trusted source, video content", cons: "UK-focused, geo-restrictions" },
        { name: "OneFootball", url: "https://onefootball.com/", description: "Football news aggregator & scores", pros: "Multiple sources, personalized feed", cons: "App required for full features" },
        { name: "SofaScore", url: "https://www.sofascore.com/", description: "Live scores & detailed statistics", pros: "Real-time stats, lineups", cons: "Too many notifications" }
    ],
    
    // ===== PROGRAMMING =====
    programming: [
        { name: "GitHub", url: "https://github.com/", description: "Code hosting & collaboration", pros: "Industry standard, free repos", cons: "Complex for beginners" },
        { name: "Stack Overflow", url: "https://stackoverflow.com/", description: "Q&A for programmers", pros: "Vast knowledge base", cons: "Can be toxic" },
        { name: "MDN Web Docs", url: "https://developer.mozilla.org/", description: "Web tech documentation", pros: "Reliable, beginner-friendly", cons: "Sometimes too technical" },
        { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", description: "Free coding tutorials & projects", pros: "Completely free, hands-on", cons: "Self-paced, no personal mentor" },
        { name: "Codecademy", url: "https://www.codecademy.com/", description: "Interactive coding lessons", pros: "Interactive, structured paths", cons: "Limited free content" },
        { name: "Dev.to", url: "https://dev.to/", description: "Developer community & articles", pros: "Friendly community, diverse topics", cons: "Quality varies" }
    ],
    
    // ===== DESIGN =====
    design: [
        { name: "Figma", url: "https://www.figma.com/", description: "Collaborative design tool", pros: "Real-time collaboration, free tier", cons: "Requires internet" },
        { name: "Dribbble", url: "https://dribbble.com/", description: "Designer portfolio showcase", pros: "Inspiration, job opportunities", cons: "Can feel elitist" },
        { name: "Behance", url: "https://www.behance.net/", description: "Creative work showcase", pros: "Adobe integration, professional", cons: "Competitive, hard to stand out" },
        { name: "Canva", url: "https://www.canva.com/", description: "Graphic design for non-designers", pros: "Easy to use, templates", cons: "Limited customization" },
        { name: "Adobe Color", url: "https://color.adobe.com/", description: "Color palette generator", pros: "Powerful tools, integrates with CC", cons: "Steep learning curve" },
        { name: "Unsplash", url: "https://unsplash.com/", description: "Free high-quality photos", pros: "Completely free, beautiful images", cons: "Commonly used, less unique" }
    ],
    
    // ===== EXAM PREP (NESTED) =====
    exam_prep: {
        title: '📚 Exam Preparation',
        description: 'Best resources for standardized tests',
        subcategories: {
            ielts: {
                title: '📝 IELTS',
                websites: [
                    { name: "IELTS Official", url: "https://www.ielts.org/", description: "Official test info & prep", pros: "Official source, practice tests", cons: "Limited free materials" },
                    { name: "IELTS Liz", url: "https://ieltsliz.com/", description: "Free lessons & tips", pros: "High-quality free content", cons: "No personalized feedback" },
                    { name: "British Council IELTS", url: "https://takeielts.britishcouncil.org/", description: "Official prep & booking", pros: "Official practice, webinars", cons: "Some paid content" },
                    { name: "IELTS Buddy", url: "https://www.ieltsbuddy.com/", description: "Study materials & tips", pros: "Comprehensive free resources", cons: "Dated design" },
                    { name: "Road to IELTS", url: "https://www.roadtoielts.com/", description: "Interactive preparation course", pros: "Interactive, mock tests", cons: "Expensive full version" }
                ]
            },
            sat: {
                title: '🎓 SAT',
                websites: [
                    { name: "Khan Academy SAT", url: "https://www.khanacademy.org/sat", description: "Free personalized practice", pros: "Official, completely free", cons: "Internet required" },
                    { name: "College Board SAT", url: "https://collegereadiness.collegeboard.org/sat", description: "Official test site", pros: "Official source, registration", cons: "Basic interface" },
                    { name: "PrepScholar SAT", url: "https://www.prepscholar.com/sat/", description: "Comprehensive prep strategies", pros: "Detailed strategies, tips", cons: "Expensive full course" },
                    { name: "UWorld SAT", url: "https://www.uworld.com/sat/", description: "Practice questions & tests", pros: "High-quality questions", cons: "Subscription required" },
                    { name: "1600.io", url: "https://1600.io/", description: "SAT math focused prep", pros: "Excellent math explanations", cons: "Limited verbal content" }
                ]
            },
            toefl: {
                title: '🎯 TOEFL',
                websites: [
                    { name: "ETS TOEFL", url: "https://www.ets.org/toefl", description: "Official test website", pros: "Official practice tests", cons: "Expensive materials" },
                    { name: "TOEFL Resources", url: "https://www.toeflresources.com/", description: "Free study materials", pros: "Comprehensive free resources", cons: "Unofficial source" },
                    { name: "Notefull TOEFL", url: "https://www.notefull.com/", description: "TOEFL speaking & writing prep", pros: "Specialized for speaking", cons: "Some outdated content" },
                    { name: "Magoosh TOEFL", url: "https://magoosh.com/toefl/", description: "Video lessons & practice", pros: "Engaging video content", cons: "Subscription model" },
                    { name: "TestGlider TOEFL", url: "https://www.testglider.com/toefl/", description: "AI-powered practice tests", pros: "AI feedback, speaking practice", cons: "Limited free version" }
                ]
            }
        }
    }
};

module.exports = { categories };
