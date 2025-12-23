## MyPadiCare – AI Paddy Leaf Disease Assistant

MyPadiCare is a browser-based AI assistant that helps rice farmers diagnose paddy leaf diseases and receive localized treatment recommendations in real time. It combines a TensorFlow.js image classifier with Google Gemini 2.0 Flash and a multilingual knowledge base that speaks English, Bahasa Malaysia, Kedahan, Kelantanese, and Japanese.

---

## Features

- **AI Disease Detection** – CNN model (TensorFlow.js) classifies paddy leaf images into diseases such as blast, bacterial leaf blight, brown spot, tungro, and healthy.
- **LLM Treatment Advice** – Google Gemini 2.0 Flash generates immediate, short‑term, and long‑term treatment recommendations.
- **Dialect-Aware Localization** – Full UI, disease names, causes, and treatments translated for:
  - English (`en`)
  - Bahasa Malaysia (`ms`)
  - Kedahan dialect (`ms-kd`)
  - Kelantanese dialect (`ms-kl`)
  - Japanese (`ja`)
- **Privacy-Friendly** – Image processing and CNN inference run in the browser; images are not uploaded to a server.
- **Mobile-First UX** – SPA layout with automatic scroll-to-top after major actions for easier use on phones.

---

## Tech Stack

- **Frontend**: HTML5, CSS, vanilla JavaScript
- **ML Inference**: TensorFlow.js (client-side CNN)
- **LLM**: Google Gemini 2.0 Flash (via REST API)
- **Localization**: Custom i18n system (`static/js/translations.js`)
- **Treatments Knowledge Base**: JSON files in `data/` (per language/dialect)

---

## Project Structure (Key Files)

- `index.html` – Main single-page app UI.
- `static/js/app_xampp.js` – Core app logic (image handling, results display, treatment loading, UX behaviors).
- `static/js/gemini.js` – Gemini integration and multilingual fallback recommendations.
- `static/js/translations.js` – All UI and disease name translations.
- `data/treatments_*.json` – Treatment protocols for each language/dialect.
- `static/js/config.js` – Configuration, including Gemini API key and endpoint.
- `TECHNOLOGY_SUMMARY_AND_SPEC.md` – Commercial and technical documentation.

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EricSyamir/mypadicare.git
   cd mypadicare
   ```

2. **Serve the app**
   - Option A: Use XAMPP (current dev environment)
     - Copy the project into your XAMPP `htdocs` directory.
     - Start Apache from the XAMPP control panel.
     - Open `http://localhost/CleanSolution/` (or your folder name) in a browser.
   - Option B: Any static file server
     - Use a simple HTTP server (e.g. `npx serve .` or `python -m http.server`) from the project root.

3. **Configure Gemini API**
   - Open `static/js/config.js`.
   - Set `GEMINI_API_KEY` to your own key:
     ```javascript
     const CONFIG = {
       GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
       GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
     };
     ```
   - Keep this key private; do not commit personal keys to public repos.

---

## Usage

1. Open the app in your browser.
2. Choose your **preferred language/dialect** from the language selector.
3. **Upload** or **capture** a photo of a single paddy leaf.
4. Click **Analyze Image** to run the CNN model.
5. Review:
   - Detected disease and confidence level.
   - Localized explanation of **why** the disease occurs.
   - Tabbed treatment advice (immediate, short‑term, long‑term, organic/chemical options, cultural practices, materials, cost, and recovery time).
6. Optionally submit feedback to help refine future iterations.

---

## Adding New Languages or Diseases

- Add UI translations and disease names to `static/js/translations.js`.
- Create a new `data/treatments_<lang>.json` file mirroring the existing schema.
- Update `app_xampp.js` and `translations.js` if you introduce new disease IDs or severity labels.

---

## License

See `LICENSE` for full details. Use in academic, research, and pilot commercial projects is encouraged; please acknowledge MyPadiCare in derivative works.


