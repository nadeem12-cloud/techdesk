# TechDesk 📰

> **Industry Intelligence for Campus Placement Success**

TechDesk is a curated IT industry news platform built specifically for engineering students preparing for campus placements. Unlike generic tech news sites, every story is filtered and annotated with **placement relevance** — helping you understand what's happening in the industry and how it impacts your career prospects.

**Live Demo:** [techdesk.vercel.app](https://techdesk-seven.vercel.app/) *(replace with your actual deployment URL)*

---

## 🎯 Why TechDesk?

During placement season, you need more than just news — you need **actionable intelligence**:

- **Hiring trends** — Which companies are hiring? What skills are in demand?
- **Salary insights** — Are packages going up or down? What premiums do certifications fetch?
- **Industry shifts** — GenAI adoption, layoffs, automation — how does it affect freshers?
- **Placement strategy** — Every story comes with a "Placement Tip" explaining what it means for you

TechDesk bridges the gap between generic tech news and campus placement prep.

---

## ✨ Features

### 📌 Core Functionality
- **15 Curated Stories** — High-quality, placement-relevant news covering hiring, salaries, skills, market trends
- **Smart Categorization** — Filter by Hiring Trends, AI & Tech, Market Insights, Career Strategy
- **Company Tracker** — See all news mentions organized by company (TCS, Infosys, Wipro, etc.)
- **Bookmark System** — Save important stories for later reference (persisted in localStorage)
- **Full-Text Search** — Search across headlines, summaries, companies, and topics
- **Quick Search Chips** — One-click access to popular searches (TCS, GenAI, layoffs, etc.)

### 🎓 Placement-Focused Features
- **Placement Tips** — Every relevant story includes strategic advice for placement prep
- **Industry Glossary** — Hover over terms like "GenAI", "attrition", "NASSCOM" for instant definitions
- **Key Takeaways** — Featured story breakdown with bullet-point summaries
- **Importance Ratings** — Stories tagged as CRITICAL, HIGH, or MEDIUM priority

### 📤 Sharing & Export
- **Social Sharing** — WhatsApp, Twitter/X, LinkedIn, Instagram Story
- **Branded Story Cards** — Auto-generated visual cards with TechDesk branding
- **Download as Image** — Save story cards as PNG for offline sharing
- **Copy Link** — Quick clipboard copy for easy sharing

### 🎨 Design & UX
- **Newspaper-Inspired UI** — Clean, readable typography with Playfair Display + Source Serif
- **Dark Mode Support** — Automatic theme switching based on system preference
- **Mobile Responsive** — Optimized for desktop, tablet, and mobile
- **Expandable Cards** — Click any card to see full details without leaving the feed
- **Smooth Animations** — Subtle fade-up animations for professional feel

---

## 🛠️ Tech Stack

**Frontend:**
- Pure HTML5, CSS3, JavaScript (Vanilla JS — no frameworks)
- Custom CSS with CSS Variables for theming
- Mobile-first responsive design
- localStorage for client-side persistence

**External Libraries:**
- [html2canvas](https://html2canvas.hertzen.com/) — Story card image generation
- [Google Fonts](https://fonts.google.com/) — Playfair Display, Source Serif 4, IBM Plex Sans

**Architecture:**
- **Modular Design** — Separated into `index.html`, `data.js`, `app.js`
- **No Backend Required** — Fully static, can be hosted on GitHub Pages, Vercel, Netlify
- **No API Dependencies** — Curated data stored locally, no external API calls

---

## 📁 Project Structure

```
techdesk/
├── index.html          # Main HTML structure
├── data.js            # Curated news data + glossary + constants
├── app.js             # Application logic (search, bookmarks, rendering)
└── README.md          # This file
```

**Key Functions in `app.js`:**
- `loadBriefing()` — Load news data and render initial view
- `renderNews()` — Filter and display news based on category/search
- `toggleBM()` — Bookmark management with localStorage
- `renderCompanies()` — Group news by company mentions
- `openShare()` — Share modal with social platforms
- `downloadCard()` — Generate and download story card image

---

## 🚀 Getting Started

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/techdesk.git
   cd techdesk
   ```

2. **Open in browser:**
   ```bash
   # Option 1: Direct file open
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   
   # Option 2: Local server (recommended)
   python -m http.server 8000
   # OR
   npx serve
   ```

3. **Access at:** `http://localhost:8000`

### Deployment

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**GitHub Pages:**
```bash
# Push to GitHub
git add .
git commit -m "Deploy TechDesk"
git push origin main

# Enable GitHub Pages in Settings → Pages → Source: main branch
```

**Netlify:**
- Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
- Or connect your GitHub repo for auto-deploy

---

## 💡 How It Works

### Data Architecture

**News Stories** (`data.js`):
```javascript
{
  id: 1,
  featured: true,
  title: "Story headline",
  tag: "hiring",  // hiring | ai | market | career | tech | industry
  summary: "Brief summary",
  detail: "Full details with context",
  key_points: ["Point 1", "Point 2", "Point 3"],
  placement_relevance: true,
  placement_tip: "Actionable advice for placement prep",
  source: "News source",
  importance: "CRITICAL",  // CRITICAL | HIGH | MEDIUM
  companies: ["TCS", "Infosys"],
  date: "2026-04-08"
}
```

**Glossary** (Inline tooltips):
- Hover over industry terms for instant definitions
- Covers GenAI, LLM, RAG, attrition, NASSCOM, cloud, etc.

### User Flow

1. **Load Briefing** → Curated news populates the feed
2. **Browse/Filter** → Switch between categories or search
3. **Read Details** → Click card to expand full story + placement tip
4. **Bookmark** → Save important stories for later
5. **Share** → Export story card or share on social media

---

## 🎨 Design Philosophy

**Why this design?**

1. **Newspaper Aesthetic** — Serious, professional, trustworthy
2. **Information Density** — Maximize content without overwhelming
3. **Readability First** — Large fonts, high contrast, clear hierarchy
4. **No Distractions** — Clean UI, no ads, no popups
5. **Placement Context** — Every element serves the placement prep goal

**Color Palette:**
- Primary: `#c0392b` (Accent Red) — Highlights, CTAs
- Background: `#f5f3ee` (Warm Off-White) / `#141414` (Dark Mode)
- Text: High contrast for readability
- Tags: Color-coded by category (AI = Blue, Career = Purple, etc.)

---

## 🧪 Testing Checklist

- [ ] All 15 stories load correctly
- [ ] Category filters work (Hiring, AI, Market, Career)
- [ ] Search finds relevant stories
- [ ] Bookmarks persist across page refresh
- [ ] Company tracker groups stories correctly
- [ ] Share modal opens and generates card
- [ ] Download card saves as PNG
- [ ] Dark mode switches properly
- [ ] Mobile responsive (test on 375px, 768px, 1440px)
- [ ] Glossary tooltips appear on hover

---

## 📊 Use Cases

**For Students:**
- Daily briefing before placement drives
- Research companies before interviews
- Track industry trends and skill demands
- Build GK for HR rounds and group discussions
- Share placement-relevant news with peers

**Portfolio Value:**
- Demonstrates UI/UX design skills
- Shows understanding of target audience (placement seekers)
- Clean, professional code structure
- No framework bloat — pure JavaScript competency

---

## 🔮 Future Enhancements

**Potential Features:**
- [ ] **Auto-Update Data** — Integrate with RSS feeds or news APIs
- [ ] **User Accounts** — Save bookmarks and preferences in cloud
- [ ] **Custom Feeds** — Personalized based on target companies/skills
- [ ] **Email Digest** — Weekly summary of top stories
- [ ] **Discussion Forum** — Student comments on stories
- [ ] **Company Deep Dives** — Dedicated pages for each major recruiter
- [ ] **Placement Calendar** — Track drive dates and deadlines
- [ ] **Resume Tips** — Contextual advice based on news trends

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

**Guidelines:**
- Keep stories placement-relevant
- Maintain clean, readable code
- Test on mobile before submitting
- Update README if adding major features

---

## 📄 License

MIT License — Free to use for personal and educational purposes.

---

## 👤 Author

**Nadeem Memon**  
B.Tech CSE Student |  


- GitHub: [@nadeem12-cloud](https://github.com/nadeem12-cloud)
- LinkedIn: [Nadeem Memon](www.linkedin.com/in/nadeemmemon10)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- **Placement Cell** — For highlighting the need for industry awareness
- **Peers** — For feedback on content relevance and UX
- **Open Source Community** — For tools and inspiration

---

## 📞 Support

**Have questions or feedback?**
- Open an issue on GitHub
- Email: nadeemmemon735@gmail.com


---

<div align="center">

**Built with ❤️ for placement success**

⭐ Star this repo if it helped you!

</div>
