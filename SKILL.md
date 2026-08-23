---
name: insta-card-shorts-generator
description: Generate a 7-card Instagram sketch-notes educational card news series and automatically render a 9:16 vertical animated Shorts/Reels video with BGM using Remotion & AI image generation. Use when user asks to create sketch-notes Instagram card news, educational carousel cards, or turn articles and YouTube videos into card news and shorts.
version: 1.0.0
---

# Instagram Card News & Shorts Generator (Sketch-notes Style)

A standardized pipeline to convert any educational topic, article, YouTube video, or service introduction into:
1. **7-Card Instagram Carousel (4:5 vertical, 1080x1350)** with warm sketch-notes aesthetic, cute chibi character, and rich informative visual storytelling.
2. **Animated 9:16 Vertical Video (1080x1920 MP4)** with Remotion spring entrance, Ken Burns zoom, and cheerful BGM.

---

## 1. Standard 7-Card Structure Formula

Each card news project follows this 7-card storyline:

| Card # | Role | Content & Layout |
| :--- | :--- | :--- |
| **01** | **Cover / Hook** | Title, service/topic name, core URL, cute character holding a magic wand/screen |
| **02** | **Problem vs Solution** | Contrast between tedious manual method (30 min) vs instant AI method (1 min) |
| **03** | **How to Use (3 Steps)** | 1. Input link/file -> 2. Select options -> 3. Done! Clean process flow |
| **04** | **Killer Feature 1** | Core value highlight (e.g. Multilingual support, accessibility, automation) |
| **05** | **Killer Feature 2** | Practical output showcase (e.g. Printable worksheet, templates, export) |
| **06** | **Pro-Tip & Roadmap** | Teacher/expert tip box (e.g. spell-check tip) + upcoming feature preview |
| **07** | **Outro / CTA** | On-time departure cheer, CTA buttons (Bookmark, Share, Like, URL) |

---

## 2. Visual Style Guidelines

- **Palette**: Warm cream background (#F5F0E8), soft macaron pastels (mint, soft peach, lavender, sky blue).
- **Art Style**: Cute hand-drawn Korean webtoon / sketch-notes infographic, clean black outlines, charming chibi character proportions, rich stickers and doodle accents.
- **Character Consistency**: Preserve character hairstyle, outfit, and signature expressions across all 7 cards using the referenced_image_paths parameter in image generation.

---

## 3. Execution Pipeline

### Step 1: Analyze & Plan Outlines
- Break down the input content into the 7-card formula above.
- Save outline to outline.md and prompt files to prompts/01-cover.md through 07-outro.md.

### Step 2: Generate 7 Sketch-Notes Cards
- Use image_gen__imagegen with 4:5 vertical ratio, referencing the character reference image if provided.
- Copy generated cards into the projects sketch-cards/ folder as 01-cover-sketch.png through 07-outro-sketch.png.

### Step 3: Render 9:16 Shorts Video with BGM
- Place assets into a Remotion project or use the bundled rendering script.
- Apply 3.5s per scene (total 24.5s), Ken Burns zoom, and spring animation.
- Mix with upbeat background music (bgm.wav / bgm.mp3) and render to [topic]_shorts.mp4.