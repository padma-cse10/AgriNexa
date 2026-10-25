# Growing Together – Agriculture Management Dashboard

A responsive agriculture management dashboard built around the Kakaraparru sample survey dataset.

## Included requirements

- Complete **English / తెలుగు / हिन्दी / தமிழ்** interface switching.
- One global language selector shared by every page.
- Language preference saved in the browser.
- Static text, form labels, placeholders, buttons, options, reports, Farmer Support content and dynamically generated farmer/crop/survey content are translated.
- Chart labels and dashboard insights follow the selected language.
- Agriculture-themed **Growing Together** logo/symbol and favicon.
- Farmer Support **6-step How to Use** guide.
- Government schemes with official links.
- Modern agricultural technology cards.
- Dashboard charts, farmer records, crop management, survey analysis, reports and settings retained.
- LocalStorage support for added farmers and crops.

## Run locally

1. Extract the ZIP.
2. Open the folder in VS Code.
3. Open `index.html` with Live Server (recommended).
4. Select English, తెలుగు, हिन्दी or தமிழ் from the top-right language selector.
5. Use the green Farmer Assistant button for multilingual offline help.

## Main files

- `index.html` – application pages and Farmer Support steps
- `style.css` – dashboard, responsive UI, branding and step cards
- `script.js` – survey data, charts, farmers, crops and dynamic rendering
- `global-language.js` – central four-language translation system
- `logo.svg` – Growing Together agriculture logo/symbol
- `data/farmer_survey_sample.csv` – sample survey data
- `images/` – project images

## Important note

The Farmer Assistant is intentionally **₹0-cost and offline**. It is a rule/knowledge-based assistant for this project, not a cloud generative-AI service such as ChatGPT. No API key is required.
