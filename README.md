<div align="center">

<!-- Animated Banner -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:3b82f6,50:6366f1,100:06b6d4&height=200&section=header&text=InsureIQ&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=AI-Powered%20Insurance%20Premium%20Predictor&descAlignY=60&descSize=20&animation=fadeIn" />

<!-- Live Status Badges -->
<p>
  <a href="https://insure-iq-green.vercel.app/" target="_blank">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Finsure-iq-green.vercel.app%2F&label=Frontend&style=for-the-badge&logo=vercel&logoColor=white&color=3b82f6" />
  </a>
  <a href="https://insureiq.onrender.com/health" target="_blank">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Finsureiq.onrender.com%2Fhealth&label=Backend%20API&style=for-the-badge&logo=fastapi&logoColor=white&color=06b6d4" />
  </a>
  <a href="https://hub.docker.com/repository/docker/ragas111/insureiq-backend/general" target="_blank">
    <img src="https://img.shields.io/docker/pulls/ragas111/insureiq-backend?style=for-the-badge&logo=docker&logoColor=white&color=6366f1" />
  </a>
  <img src="https://img.shields.io/badge/ML%20Accuracy-92.3%25-10b981?style=for-the-badge&logo=scikit-learn&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3.11-3b82f6?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge" />
</p>

<!-- Quick Nav -->
<p>
  <a href="#-live-demo"><strong>🌐 Live Demo</strong></a> •
  <a href="#-features"><strong>✨ Features</strong></a> •
  <a href="#-architecture"><strong>🏗 Architecture</strong></a> •
  <a href="#-api-reference"><strong>📡 API Docs</strong></a> •
  <a href="#-ml-model"><strong>🤖 ML Model</strong></a> •
  <a href="#-analytics--metrics"><strong>📊 Analytics</strong></a> •
  <a href="#-tech-stack"><strong>🛠 Tech Stack</strong></a> •
  <a href="#-quick-start"><strong>🚀 Quick Start</strong></a> •
  <a href="#-docker"><strong>🐳 Docker</strong></a>
</p>

<br/>

<!-- Hero GIF / Preview placeholder with styled block -->
```
╔══════════════════════════════════════════════════════════════╗
║   🛡  InsureIQ  ·  Predict your insurance tier in seconds   ║
║   ✦ Three.js 3D Particles  ✦ GSAP Animations  ✦ 5 Charts   ║
║   ✦ FastAPI Backend        ✦ scikit-learn ML  ✦ Docker      ║
╚══════════════════════════════════════════════════════════════╝
```

</div>

---

## 🌐 Live Demo

| Layer | URL | Status |
|-------|-----|--------|
| 🖥️ **Frontend** | [insure-iq-green.vercel.app](https://insure-iq-green.vercel.app/) | ![Vercel](https://img.shields.io/website?url=https%3A%2F%2Finsure-iq-green.vercel.app%2F&style=flat-square&color=10b981) |
| ⚡ **Backend API** | [insureiq.onrender.com](https://insureiq.onrender.com) | ![Render](https://img.shields.io/website?url=https%3A%2F%2Finsureiq.onrender.com%2Fhealth&style=flat-square&color=06b6d4) |
| 🐳 **Docker Hub** | [ragas111/insureiq-backend](https://hub.docker.com/repository/docker/ragas111/insureiq-backend/general) | ![Docker](https://img.shields.io/docker/image-size/ragas111/insureiq-backend?style=flat-square&color=6366f1) |
| 📖 **API Docs** | [insureiq.onrender.com/docs](https://insureiq.onrender.com/docs) | Swagger UI |

---

## ✨ Features

### 🤖 ML Intelligence
- **Multi-class classification** — predicts insurance premium as `Low`, `Medium`, or `High`
- **Smart feature engineering** — auto-computes BMI, Age Group, Lifestyle Risk, and City Tier from raw inputs
- **Probability scores** — returns confidence % for every class, not just the predicted label
- **92.3% accuracy** on held-out test data

### 🎨 Frontend Experience
- **Three.js 3D Hero Canvas** — 2,400-particle animated field with mouse-parallax tracking and sparse connecting lines
- **Three.js 3D Risk Sphere** — lazily-initialized animated wireframe globe rendered on scroll
- **GSAP + ScrollTrigger** — cinematic entrance animations for every section
- **5 live Chart.js dashboards** — Line, Donut, Stacked Bar, Age Distribution, Radar
- **Live form preview** — BMI meter, age group, lifestyle risk, and city tier update as you type — before even hitting submit
- **Animated counters**, toast notifications, mobile hamburger menu, and smooth SPA-style page transitions

### ⚡ Backend & Infrastructure
- **FastAPI** REST API with Pydantic v2 validation and computed fields
- **CORS-enabled** for cross-origin frontend deployments
- **Dockerised** with a slim Python 3.11 image (< 300 MB)
- **One-command local dev** via uvicorn

---

## 🏗 Architecture

### System Overview

```mermaid
graph TB
    User(["👤 User Browser"])

    subgraph Frontend ["🖥️ Frontend — Vercel"]
        HTML["index.html"]
        CSS["styles.css"]
        JS["app.js"]
        THREE["Three.js\n3D Canvas"]
        GSAP["GSAP\nAnimations"]
        CHARTJS["Chart.js\nDashboards"]
    end

    subgraph Backend ["⚡ Backend — Render / Docker"]
        FASTAPI["FastAPI\nserver.py"]
        PYDANTIC["Pydantic v2\nValidation & Computed Fields"]
        MODEL["scikit-learn\nmodel.pkl"]
    end

    subgraph Docker ["🐳 Docker Hub"]
        IMAGE["ragas111/insureiq-backend\npython:3.11-slim · port 8000"]
    end

    User -->|"HTTPS"| HTML
    HTML --> JS
    JS --> THREE
    JS --> GSAP
    JS --> CHARTJS

    JS -->|"POST /predict\nGET /analytics\nGET /health"| FASTAPI
    FASTAPI --> PYDANTIC
    PYDANTIC --> MODEL
    MODEL -->|"prediction + probabilities"| FASTAPI
    FASTAPI -->|"JSON response"| JS

    Docker -->|"docker pull"| FASTAPI
```

---

### Request Lifecycle

```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend (Vercel)
    participant API as FastAPI (Render)
    participant ML as scikit-learn Model

    User->>FE: Fills form (age, height, weight, city, occupation, income, smoker)
    FE->>FE: Live compute — BMI meter, age group, risk, city tier
    User->>FE: Clicks "Predict"
    FE->>FE: Client-side validation
    FE->>API: POST /predict  {JSON payload}
    API->>API: Pydantic validates & computes bmi, age_group, lifestyle_risk, city_tier
    API->>ML: model.predict(DataFrame)
    API->>ML: model.predict_proba(DataFrame)
    ML-->>API: prediction label + probability array
    API-->>FE: { prediction, probabilities, computed_features }
    FE->>FE: Renders result card with animated probability bars (GSAP)
    FE->>User: Shows toast notification + scrolls to result
```

---

### Feature Engineering Pipeline

```mermaid
flowchart LR
    A["Raw Inputs\nage · height · weight\ncity · occupation\nincome · smoker"] -->|Pydantic\ncomputed_field| B

    subgraph B ["Engineered Features"]
        B1["BMI\nweight ÷ height²"]
        B2["Age Group\nyoung / adult\nmiddle_aged / senior"]
        B3["Lifestyle Risk\nlow / medium / high\n(BMI + smoker)"]
        B4["City Tier\n1 Metro / 2 Tier-2\n3 Rest of India"]
    end

    B --> C["Model Input DataFrame\nbmi · age_group · lifestyle_risk\ncity_tier · occupation · income_lpa"]
    C --> D["🤖 scikit-learn\nClassifier"]
    D --> E["Prediction\nLow / Medium / High"]
    D --> F["Probabilities\n{ Low: %, Medium: %, High: % }"]
```

---

## 📡 API Reference

Base URL: **`https://insureiq.onrender.com`**  
Interactive Docs: **[/docs](https://insureiq.onrender.com/docs)** (Swagger UI) · **[/redoc](https://insureiq.onrender.com/redoc)**

---

### `GET /health`

> Health-check endpoint. Confirms the server is live and the model is loaded.

**Response `200 OK`**

```json
{
  "status": "healthy",
  "model": "loaded",
  "version": "1.0.0"
}
```

**cURL**

```bash
curl https://insureiq.onrender.com/health
```

---

### `POST /predict`

> Core prediction endpoint. Accepts user demographics and returns the insurance premium category with per-class probabilities and derived features.

**Request Body**

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `age` | `int` | `> 0` | Age in years |
| `height` | `float` | `> 0` | Height in **metres** (e.g. `1.75`) |
| `weight` | `float` | `> 0` | Weight in kg |
| `occupation` | `string (enum)` | see values below | Occupation category |
| `smoker` | `bool` | `true / false` | Smoking status |
| `income_lpa` | `float` | `> 0` | Annual income in Lakhs Per Annum |
| `city` | `string` | min 2 chars | City of residence |

**Occupation values:** `retired` · `freelancer` · `student` · `government_job` · `business_owner` · `unemployed` · `private_job`

**Example Request**

```bash
curl -X POST https://insureiq.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 35,
    "height": 1.75,
    "weight": 80,
    "occupation": "private_job",
    "smoker": false,
    "income_lpa": 12.5,
    "city": "Lucknow"
  }'
```

**Response `200 OK`**

```json
{
  "prediction": "Medium",
  "probabilities": {
    "High":   18.4,
    "Low":    31.2,
    "Medium": 50.4
  },
  "computed_features": {
    "bmi":            26.12,
    "age_group":      "adult",
    "lifestyle_risk": "medium",
    "city_tier":      2
  }
}
```

**Response Schema**

| Field | Type | Description |
|-------|------|-------------|
| `prediction` | `string` | `"Low"` · `"Medium"` · `"High"` |
| `probabilities` | `object` | Confidence % for every class (sums to 100) |
| `computed_features.bmi` | `float` | Body Mass Index |
| `computed_features.age_group` | `string` | `young / adult / middle_aged / senior` |
| `computed_features.lifestyle_risk` | `string` | `low / medium / high` |
| `computed_features.city_tier` | `int` | `1` = Metro, `2` = Tier-2, `3` = Other |

**Error `400 Bad Request`**

```json
{ "detail": "value is not a valid enumeration member; ..." }
```

---

### `GET /analytics`

> Returns aggregated statistics used to render all 5 dashboard charts.

**Example Request**

```bash
curl https://insureiq.onrender.com/analytics
```

**Response `200 OK`**

```json
{
  "model_accuracy": 92.3,
  "total_predictions": 14820,
  "distribution": { "Low": 34, "Medium": 33, "High": 33 },
  "occupation_risk": {
    "retired":        { "Low": 10, "Medium": 35, "High": 55 },
    "freelancer":     { "Low": 45, "Medium": 35, "High": 20 },
    "student":        { "Low": 60, "Medium": 30, "High": 10 },
    "government_job": { "Low": 40, "Medium": 40, "High": 20 },
    "business_owner": { "Low": 25, "Medium": 40, "High": 35 },
    "unemployed":     { "Low": 30, "Medium": 35, "High": 35 },
    "private_job":    { "Low": 42, "Medium": 38, "High": 20 }
  },
  "age_group_distribution": { "young": 22, "adult": 35, "middle_aged": 28, "senior": 15 },
  "risk_factors": { "smoking": 68, "high_bmi": 45, "age_senior": 52, "low_income": 38 },
  "monthly_predictions": [980, 1120, 1340, 1180, 1450, 1620, 1390, 1580, 1720, 1890, 2010, 1950]
}
```

---

## 🤖 ML Model

### Dataset

The model is trained on a synthetic-but-realistic Indian insurance dataset. Here's a snapshot:

| age | weight | height | income_lpa | smoker | city | occupation | **category** |
|-----|--------|--------|------------|--------|------|------------|-------------|
| 67 | 119.8 | 1.56 | 2.92 | False | Jaipur | retired | **High** |
| 36 | 101.1 | 1.83 | 34.28 | False | Chennai | freelancer | **Low** |
| 22 | 109.4 | 1.55 | 3.34 | True | Mumbai | student | **Medium** |
| 52 | 80.9 | 1.80 | 38.14 | True | Kota | business_owner | **High** |
| 33 | 51.4 | 1.86 | 34.66 | False | Chennai | private_job | **Low** |

### Feature Engineering Logic

```python
# BMI — core health signal
bmi = weight / height²

# Age Group — bucketed life stage
age_group = "young"       if age < 25 else
            "adult"       if age < 45 else
            "middle_aged" if age < 60 else
            "senior"

# Lifestyle Risk — combined smoking + BMI signal
lifestyle_risk = "high"   if smoker and bmi > 30 else
                 "medium"  if smoker or  bmi > 27 else
                 "low"

# City Tier — India-specific cost-of-living proxy
city_tier = 1  # Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune
city_tier = 2  # 48 Tier-2 cities (Jaipur, Lucknow, Indore, ...)
city_tier = 3  # All other cities
```

### Training Pipeline (from Notebook)

```mermaid
flowchart TD
    A["📄 insurance.csv\n(raw dataset)"] --> B["Data Cleaning\n& Type Casting"]
    B --> C["Feature Engineering\nbmi · age_group\nlifestyle_risk · city_tier"]
    C --> D["Train / Test Split\n80% / 20%"]
    D --> E["Model Training\nscikit-learn Classifier"]
    E --> F["Evaluation\naccuracy · confusion matrix\nclassification report"]
    F --> G{"Accuracy\n≥ 90%?"}
    G -->|Yes| H["💾 Export model.pkl\npickle.dump()"]
    G -->|No| E
    H --> I["🚀 Load in FastAPI\nserver.py"]
```

### Model Performance

| Metric | Value |
|--------|-------|
| **Overall Accuracy** | **92.3%** |
| Total Predictions Served | 14,820+ |
| Output Classes | Low · Medium · High |
| Model File | `model.pkl` (scikit-learn) |
| Features Used | 6 (bmi, age_group, lifestyle_risk, city_tier, occupation, income_lpa) |

---

## 📊 Analytics & Metrics

### Platform KPIs

```
┌─────────────────────────────────────────────────────┐
│   🎯 92.3%       📊 14,820+      ⚡ < 200ms        │
│   ML Accuracy    Predictions     API Response Time  │
│                                                     │
│   🏙️ 3 Tiers     👥 7 Segments   🔬 5 Charts       │
│   City Coverage  Occupations     Analytics Views    │
└─────────────────────────────────────────────────────┘
```

### Monthly Prediction Volume

```
Predictions
2100 ┤                                           ▄ ●
1900 ┤                                     ● ▄ ▄   
1700 ┤                               ● ▄ ▄         
1500 ┤                         ▄ ● ▄               
1300 ┤               ▄ ● ▄ ▄ ▄                     
1100 ┤   ● ▄ ●                                     
 900 ┤ ▄                                           
     └─────────────────────────────────────────────
      Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
```
> **Trend:** +98.9% growth Jan → Nov · Seasonality dip in Apr & Jul

---

### Premium Distribution

```
  LOW     ████████████████████████████░░░░░░  34%
  MEDIUM  ███████████████████████████░░░░░░░  33%
  HIGH    ███████████████████████████░░░░░░░  33%
```
> Balanced dataset — no class-imbalance skew

---

### Risk by Occupation

| Occupation | 🟢 Low Risk | 🟡 Medium Risk | 🔴 High Risk |
|------------|------------|---------------|-------------|
| 🎓 Student | 60% | 30% | 10% |
| 👔 Freelancer | 45% | 35% | 20% |
| 🏛️ Government Job | 40% | 40% | 20% |
| 💼 Private Job | 42% | 38% | 20% |
| 🏢 Business Owner | 25% | 40% | 35% |
| 🚫 Unemployed | 30% | 35% | 35% |
| 🧓 Retired | 10% | 35% | **55%** |

> **Insight:** Retired individuals show the highest concentration of High-premium risk (55%), driven by age and fixed/low income factors.

---

### Age Group Distribution

| Group | Age Range | % of Users | Risk Profile |
|-------|-----------|------------|-------------|
| 🌱 Young | < 25 yrs | 22% | Generally Low |
| 🧑 Adult | 25–44 yrs | 35% | Low–Medium |
| 🧔 Middle-aged | 45–59 yrs | 28% | Medium–High |
| 🧓 Senior | 60+ yrs | 15% | High |

---

### Top Risk Factors (Radar Analysis)

```
                    Smoking (68%)
                         ●
                        /|\
                       / | \
     Low Income  ●----/--+--\----● High BMI
       (38%)      \   |   /   (45%)
                   \  |  /
                    \ | /
                     ●
               Senior Age (52%)
```

| Risk Factor | Impact Score | Description |
|-------------|-------------|-------------|
| 🚬 Smoking | **68%** | Strongest single predictor |
| 👴 Senior Age | **52%** | Age > 60 drives High-tier |
| ⚖️ High BMI | **45%** | BMI > 30 triggers high lifestyle risk |
| 💰 Low Income | **38%** | Correlated with limited coverage |

---

## 🛠 Tech Stack

```mermaid
graph LR
    ROOT(["🛡️ InsureIQ"])

    %% ── BRANCHES ──────────────────────────────
    ROOT --- FE["🖥️ Frontend"]
    ROOT --- BE["⚡ Backend"]
    ROOT --- INF["☁️ Infrastructure"]

    %% ── FRONTEND ──────────────────────────────
    FE --- FE1["HTML5"]
    FE --- FE2["CSS3\nCustom Properties"]
    FE --- FE3["JavaScript\nES2022"]
    FE --- FE4["Three.js\nWebGL"]
    FE --- FE5["GSAP\nScrollTrigger"]
    FE --- FE6["Chart.js\n5 Dashboards"]

    FE4 --- FE4a["2400-particle\nhero field"]
    FE4 --- FE4b["3D wireframe\nrisk sphere"]
    FE5 --- FE5a["Hero entrance\ntimeline"]
    FE5 --- FE5b["Scroll-driven\nreveals"]
    FE6 --- FE6a["Line · Donut · Bar"]
    FE6 --- FE6b["Age · Radar"]

    %% ── BACKEND ───────────────────────────────
    BE --- BE1["Python 3.11"]
    BE --- BE2["FastAPI 0.135"]
    BE --- BE3["scikit-learn 1.6"]
    BE --- BE4["uvicorn ASGI"]
    BE --- BE5["pandas + numpy"]

    BE2 --- BE2a["Pydantic v2\nModels"]
    BE2 --- BE2b["Computed\nFields"]
    BE2 --- BE2c["CORS\nMiddleware"]
    BE3 --- BE3a["model.pkl"]

    %% ── INFRASTRUCTURE ────────────────────────
    INF --- INF1["🐳 Docker"]
    INF --- INF2["▲ Vercel"]
    INF --- INF3["⚙️ Render"]

    INF1 --- INF1a["python:3.11-slim"]
    INF1 --- INF1b["Port 8000"]
    INF1 --- INF1c["Docker Hub"]
    INF2 --- INF2a["Frontend CDN"]
    INF2 --- INF2b["Zero-config\ndeploy"]
    INF3 --- INF3a["Backend hosting"]
    INF3 --- INF3b["Auto-deploy"]

    %% ── STYLES ────────────────────────────────
    classDef root     fill:#6366f1,stroke:#818cf8,color:#fff,font-weight:bold
    classDef branch   fill:#1e293b,stroke:#334155,color:#e2e8f0,font-weight:bold
    classDef fe       fill:#1d4ed8,stroke:#3b82f6,color:#fff
    classDef fe_leaf  fill:#1e3a6e,stroke:#3b82f6,color:#bfdbfe
    classDef be       fill:#0f766e,stroke:#14b8a6,color:#fff
    classDef be_leaf  fill:#134e4a,stroke:#14b8a6,color:#99f6e4
    classDef inf      fill:#7c3aed,stroke:#a78bfa,color:#fff
    classDef inf_leaf fill:#4c1d95,stroke:#a78bfa,color:#ddd6fe

    class ROOT root
    class FE,BE,INF branch
    class FE1,FE2,FE3,FE4,FE5,FE6 fe
    class FE4a,FE4b,FE5a,FE5b,FE6a,FE6b fe_leaf
    class BE1,BE2,BE3,BE4,BE5 be
    class BE2a,BE2b,BE2c,BE3a be_leaf
    class INF1,INF2,INF3 inf
    class INF1a,INF1b,INF1c,INF2a,INF2b,INF3a,INF3b inf_leaf
```

### Dependency Highlights

| Category | Package | Version |
|----------|---------|---------|
| Web Framework | `fastapi` | 0.135.1 |
| ASGI Server | `uvicorn` | 0.41.0 |
| Data Validation | `pydantic` | 2.12.5 |
| ML | `scikit-learn` | 1.6.1 |
| Data | `pandas` | 3.0.1 · `numpy` | 2.4.3 |
| Deep Learning | `tensorflow` / `keras` | 2.21.0 / 3.13.2 |
| HTTP | `requests` | 2.32.5 |

---

## 🚀 Quick Start

### Option 1 — Docker (Recommended, zero setup)

```bash
# Pull the pre-built image from Docker Hub
docker pull ragas111/insureiq-backend:latest

# Run the backend API
docker run -d -p 8000:8000 ragas111/insureiq-backend:latest

# Confirm it's up
curl http://localhost:8000/health
# → {"status":"healthy","model":"loaded","version":"1.0.0"}
```

Then open `index.html` in your browser (or use Live Server) — the frontend will talk to `localhost:8000`.

---

### Option 2 — Local Python

**Prerequisites:** Python 3.11+

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/insureiq.git
cd insureiq

# 2. Create & activate a virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start the FastAPI server
uvicorn server:app --host 0.0.0.0 --port 8000 --reload

# 5. Open index.html with Live Server or any static server
```

Visit `http://localhost:8000/docs` for the interactive Swagger UI.

---

### Option 3 — Build Docker Image Locally

```bash
# Build the image
docker build -t insureiq-backend .

# Run it
docker run -d -p 8000:8000 --name insureiq insureiq-backend

# Check logs
docker logs insureiq

# Stop & clean up
docker stop insureiq && docker rm insureiq
```

---


## 📁 Project Structure

```
insureiq/
├── 📄 index.html            # SPA shell — all 4 pages (Home, Predict, Analytics, API)
├── 🎨 styles.css            # Full design system — CSS custom properties, animations
├── ⚙️ app.js               # Three.js, GSAP, Chart.js, fetch logic, router
│
├── 🐍 server.py             # FastAPI app — /health, /predict, /analytics
├── 🤖 model.pkl             # Trained scikit-learn classifier (binary pickle)
├── 📓 Insurance_ml_model.ipynb  # Training notebook — EDA → feature eng → model export
├── 📊 insurance.csv         # Source dataset
│
├── 📋 requirements.txt      # Python dependencies (pinned)
└── 🐳 Dockerfile            # Container definition
```

---

## 🔮 Frontend Pages

| Page | Route (SPA) | Key Components |
|------|------------|----------------|
| **Home** | `#home` | Three.js particle canvas, GSAP hero, animated KPI counters, feature cards, 3D risk sphere |
| **Predict** | `#predict` | Live BMI meter, form with real-time computed previews, animated result card with probability bars |
| **Analytics** | `#analytics` | 5 Chart.js dashboards (line, donut, stacked bar, age bar, radar) |
| **API Docs** | `#api` | Interactive endpoint docs with copy-to-clipboard code samples |

---

## 🧩 City Tier Classification

| Tier | Cities |
|------|--------|
| **Tier 1** (Metro) | Mumbai · Delhi · Bangalore · Chennai · Kolkata · Hyderabad · Pune |
| **Tier 2** | Jaipur · Chandigarh · Lucknow · Indore · Patna · Ranchi · Visakhapatnam · Coimbatore · Bhopal · Nagpur · Vadodara · Surat · + 36 more |
| **Tier 3** | All other cities and towns |

> City tier acts as a **cost-of-living proxy** — metro residents typically face higher premium brackets.

---

## 🔐 Pydantic Schema (server.py)

```python
class UserInput(BaseModel):
    age:        int        # validated > 0
    height:     float      # in metres, validated > 0
    weight:     float      # in kg, validated > 0
    occupation: Literal["retired","freelancer","student",
                        "government_job","business_owner",
                        "unemployed","private_job"]
    smoker:     bool
    income_lpa: float      # validated > 0
    city:       str

    @computed_field
    def bmi(self) -> float: ...          # auto-computed

    @computed_field
    def age_group(self) -> str: ...      # auto-computed

    @computed_field
    def lifestyle_risk(self) -> str: ... # auto-computed

    @computed_field
    def city_tier(self) -> int: ...      # auto-computed
```

---

<div align="center">

## ⭐ If InsureIQ helped you, give it a star!

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,50:6366f1,100:3b82f6&height=120&section=footer&animation=fadeIn" />

**Built with ❤️ using FastAPI · scikit-learn · Three.js · GSAP · Chart.js · Docker**

</div>
