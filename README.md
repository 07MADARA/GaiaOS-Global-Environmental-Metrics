# GaiaOS - The Planetary Intelligence Engine 🌍

**A Prototype for the DEV Weekend Challenge: Earth Day Edition**

GaiaOS is an advanced, highly immersive environmental data visualization and intelligence dashboard. Designed as a "god-tier" developer prototype, it simulates an enterprise-level platform used by climate scientists, green tech companies, and urban planners to analyze global datasets, track carbon emissions, and run predictive climate models.

![GaiaOS Concept UI](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop) *(Placeholder representing Earth Intelligence)*

---

## 🌎 Why We Built This

With Earth Day fast approaching, the challenge prompt **"Build for the Planet"** inspired us to think about how modern AI and data platforms can actually be leveraged to solve real planetary issues. 

The core challenge with environmental action isn't a lack of data—it's a lack of *actionable synthesis*. There are petabytes of satellite imagery, carbon sensor metrics, and climate documents available. We built GaiaOS to conceptualize a unified command center: a place where massive amounts of data are not just visualized, but actively parsed by an **AI Agent** that can reason over it and provide immediate, sustainable strategies to the end user.

## 🛠️ How We Built This (Tech Stack)

GaiaOS was built rapidly over a single weekend leveraging modern web technologies and multiple **Prize Category Tools**:

- **Frontend Core**: [Vite](https://vitejs.dev/) + [React](https://react.dev/). Chosen for its best-in-class performance and reliable developer experience.
- **Aesthetic**: Pure Vanilla CSS featuring immersive "Glassmorphism" (backdrop-blur filters), dark mode palettes, and neon accents to give it a living, breathing enterprise feel.
- **Micro-Animations**: [Framer Motion](https://www.framer.com/motion/) was used to orchestrate smooth page transitions and ensure the interface feels highly advanced and "alive".
- **Google Gemini (Prize Category)**: We integrated the official `@google/generative-ai` SDK to connect the prototype to **Gemini 1.5 Pro**. The "Gemini Oracle" acts as the planetary intelligence engine, actively synthesizing user queries about sustainability.
- **Auth0 for Agents (Prize Category)**: AI Agent security is critical. We built an advanced, immersive **Terminal Simulator** UI that replicates a Machine-to-Machine (M2M) OAuth 2.0 handshake—demonstrating how an AI agent must securely negotiate identity before accessing the Gemini models or underlying Snowflake datasets.
- **Data Visualizations**: [Recharts](https://recharts.org/) was used to plot beautiful gradient area charts, simulating large-scale Snowflake climate data ingestion.
- **Icons**: [Lucide React](https://lucide.dev/).

---

## 🚀 How to Run Locally

Follow these instructions to spin up the GaiaOS planetary core on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- Your own [Google Gemini API Key](https://aistudio.google.com/)

### 1. Clone & Install
Open your terminal and navigate to this repository. Install the dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Create a file named `.env.local` in the root of the project and add your Gemini API key:
```ini
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Start the Development Server
Boot up the Vite server:
```bash
npm run dev
```

### 4. Access the Dashboard
Open your web browser and navigate to:
```text
http://localhost:5173
```
You can now navigate between the Earth Data dashboard, execute the terminal handshake in the Auth0 Agent Gateway, and query the live Gemini Oracle!

---

## 🏆 Challenge Categories Targeted

*   **Best use of Google Gemini**: (Live implementation in the Oracle component)
*   **Best use of Auth0 for Agents**: (Immersive UI/UX conceptualization of M2M agent security)
*   **Earth Day Overall Winner**: (Aesthetic, highly relevant "Build for the Planet" theme)

*Built with ❤️ for the Planet.*
