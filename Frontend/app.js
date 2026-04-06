/* ============================================================
   InsureIQ — app.js
   API target: http://localhost:8000  (Uvicorn)
   Frontend served by Live Server (any port)
   ============================================================ */

"use strict";

const API = "https://insureiq.onrender.com";

gsap.registerPlugin(ScrollTrigger);

/* ── UTILS ──────────────────────────────────────────────── */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */
const toastWrap = $("#toastContainer");

function showToast(msg, type = "info", ms = 3500) {
  const icon = {
    success: `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    error:   `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    info:    `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  };
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `${icon[type] || icon.info}<span class="toast-msg">${msg}</span><button class="toast-close" aria-label="close">&times;</button>`;
  toastWrap.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add("show")));
  const rm = () => { t.classList.add("hide"); setTimeout(() => t.remove(), 350); };
  t.querySelector(".toast-close").onclick = rm;
  setTimeout(rm, ms);
}

/* ═══════════════════════════════════════════════════════════
   ROUTER
═══════════════════════════════════════════════════════════ */
let activePage = "home";
let chartsReady = false;

function goTo(name) {
  if (name === activePage) return;
  const prev = $(`#page-${activePage}`);
  const next = $(`#page-${name}`);
  if (!next) return;
  prev.classList.remove("active");
  next.classList.add("active", "page-enter");
  setTimeout(() => next.classList.remove("page-enter"), 420);
  activePage = name;
  $$(".nav-link").forEach(l => l.classList.toggle("active", l.dataset.page === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (name === "analytics" && !chartsReady) { fetchAndBuildCharts(); chartsReady = true; }
  if (name === "home") animateCounters();
  closeMobileMenu();
}

document.addEventListener("click", e => {
  const el = e.target.closest("[data-page]");
  if (el) { e.preventDefault(); goTo(el.dataset.page); }
});

/* ═══════════════════════════════════════════════════════════
   HAMBURGER
═══════════════════════════════════════════════════════════ */
const hamburger = $("#hamburger");
const mobileMenu = $("#mobileMenu");

function closeMobileMenu() {
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("open");
}
hamburger.addEventListener("click", () => {
  const open = hamburger.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", open);
  mobileMenu.classList.toggle("open", open);
});

/* ═══════════════════════════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════════════════════════ */
window.addEventListener("scroll", () => {
  $("#navbar").classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

/* ═══════════════════════════════════════════════════════════
   THREE.JS — HERO PARTICLE FIELD
═══════════════════════════════════════════════════════════ */
function initHeroCanvas() {
  const canvas = $("#heroCanvas");
  if (!canvas || typeof THREE === "undefined") return;

  const W = () => window.innerWidth, H = () => window.innerHeight;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W(), H());

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 1000);
  camera.position.z = 5;

  const COUNT = 2400;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const cA = new THREE.Color("#3b82f6");
  const cB = new THREE.Color("#06b6d4");
  const cC = new THREE.Color("#6366f1");

  for (let i = 0; i < COUNT; i++) {
    pos[i*3]   = (Math.random()-.5)*22;
    pos[i*3+1] = (Math.random()-.5)*15;
    pos[i*3+2] = (Math.random()-.5)*12;
    const c = Math.random() < .33 ? cA : Math.random() < .5 ? cB : cC;
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size: 0.032, vertexColors: true, transparent: true, opacity: 0.6 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  // Sparse connecting lines
  const lpts = [];
  for (let i = 0; i < 100; i++) {
    const a = Math.floor(Math.random()*COUNT), b = Math.floor(Math.random()*COUNT);
    lpts.push(new THREE.Vector3(pos[a*3],pos[a*3+1],pos[a*3+2]), new THREE.Vector3(pos[b*3],pos[b*3+1],pos[b*3+2]));
  }
  const lGeo = new THREE.BufferGeometry().setFromPoints(lpts);
  scene.add(new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({ color:0x3b82f6, transparent:true, opacity:0.05 })));

  let mx = 0, my = 0;
  document.addEventListener("mousemove", e => { mx = (e.clientX/W()-.5)*2; my = (e.clientY/H()-.5)*2; }, { passive:true });

  let t = 0;
  (function frame() {
    requestAnimationFrame(frame); t += .003;
    pts.rotation.y = t*.18; pts.rotation.x = t*.07;
    camera.position.x += (mx*.7 - camera.position.x)*.03;
    camera.position.y += (-my*.5 - camera.position.y)*.03;
    renderer.render(scene, camera);
  })();

  window.addEventListener("resize", () => {
    camera.aspect = W()/H(); camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  });
}

/* ═══════════════════════════════════════════════════════════
   THREE.JS — RISK 3D SPHERE
═══════════════════════════════════════════════════════════ */
function initRiskSphere() {
  const wrap = $("#riskCanvas3d");
  if (!wrap || typeof THREE === "undefined") return;
  const canvas = document.createElement("canvas");
  wrap.appendChild(canvas);
  const W = wrap.clientWidth || 400, H = wrap.clientHeight || 300;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(W, H);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W/H, .1, 100);
  camera.position.z = 3.5;

  scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.2,32,32), new THREE.MeshBasicMaterial({ color:0x3b82f6, wireframe:true, transparent:true, opacity:.18 })));
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(.85,20,20), new THREE.MeshBasicMaterial({ color:0x06b6d4, wireframe:true, transparent:true, opacity:.1  })));

  const oCount = 140;
  const oPos = new Float32Array(oCount*3);
  for (let i = 0; i < oCount; i++) {
    const a = (i/oCount)*Math.PI*2, r = 1.5+Math.random()*.4;
    oPos[i*3] = Math.cos(a)*r; oPos[i*3+1] = (Math.random()-.5)*1.6; oPos[i*3+2] = Math.sin(a)*r;
  }
  const oGeo = new THREE.BufferGeometry();
  oGeo.setAttribute("position", new THREE.BufferAttribute(oPos,3));
  const orbit = new THREE.Points(oGeo, new THREE.PointsMaterial({ color:0x06b6d4, size:.05, transparent:true, opacity:.85 }));
  scene.add(orbit);

  // Resize handler so canvas tracks its container on any screen size
  function onResize() {
    const nW = wrap.clientWidth, nH = wrap.clientHeight;
    if (nW === 0 || nH === 0) return;
    renderer.setSize(nW, nH);
    camera.aspect = nW / nH;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", onResize, { passive: true });

  const meshes = scene.children;
  let t = 0;
  (function frame() {
    requestAnimationFrame(frame); t += .008;
    meshes[0].rotation.y = t*.4; meshes[0].rotation.x = t*.15;
    meshes[1].rotation.y = -t*.6;
    orbit.rotation.y = t*.5; orbit.rotation.x = Math.sin(t*.3)*.22;
    renderer.render(scene, camera);
  })();
}

/* ═══════════════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════════════ */
function animateCounters() {
  $$("[data-target]").forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isFloat = String(target).includes(".");
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now-start)/1800, 1);
      const ease = 1 - Math.pow(1-p, 3);
      el.textContent = isFloat ? (target*ease).toFixed(1) : Math.round(target*ease).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    })(performance.now());
  });
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════ */
function initReveal() {
  // feature-card and risk-item are owned by GSAP — keep them out of here to avoid opacity conflict
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); } });
  }, { threshold: .1 });
  $$(".about-card,.kpi-card,.chart-card,.tech-item").forEach(el => {
    el.classList.add("reveal"); obs.observe(el);
  });
}

/* ═══════════════════════════════════════════════════════════
   GSAP HERO ENTRANCE
═══════════════════════════════════════════════════════════ */
function initHeroGSAP() {
  gsap.timeline({ defaults:{ ease:"power3.out" } })
    .from(".hero-badge",    { opacity:0, y:24, duration:.7 })
    .from(".hero-title",    { opacity:0, y:36, duration:.8 }, "-=.4")
    .from(".hero-subtitle", { opacity:0, y:24, duration:.7 }, "-=.5")
    .from(".hero-actions",  { opacity:0, y:20, duration:.6 }, "-=.4")
    .from(".hero-stats",    { opacity:0, y:20, duration:.6 }, "-=.3")
    .from(".hero-visual",   { opacity:0, x:40, duration:.8 }, "-=.6");

  gsap.from(".feature-card", {
    scrollTrigger: { trigger:".features-section", start:"top 85%", once:true },
    opacity:0, y:40, stagger:.12, duration:.7, ease:"power3.out",
  });
  gsap.from(".risk-item", {
    scrollTrigger: { trigger:".risk-section", start:"top 85%", once:true },
    opacity:0, x:-28, stagger:.14, duration:.6, ease:"power3.out",
  });
}

/* ═══════════════════════════════════════════════════════════
   LIVE FORM COMPUTATION
═══════════════════════════════════════════════════════════ */
const TIER1 = ["Mumbai","Delhi","Bangalore","Chennai","Kolkata","Hyderabad","Pune"];
const TIER2 = ["Jaipur","Chandigarh","Indore","Lucknow","Patna","Ranchi","Visakhapatnam","Coimbatore","Bhopal","Nagpur","Vadodara","Surat","Rajkot","Jodhpur","Raipur","Amritsar","Varanasi","Agra","Dehradun","Mysore","Jabalpur","Guwahati","Thiruvananthapuram","Ludhiana","Nashik","Allahabad","Udaipur","Aurangabad","Hubli","Belgaum","Salem","Vijayawada","Tiruchirappalli","Bhavnagar","Gwalior","Dhanbad","Bareilly","Aligarh","Gaya","Kozhikode","Warangal","Kolhapur","Bilaspur","Jalandhar","Noida","Guntur","Asansol","Siliguri"];

const ageGroup = a => a < 25 ? "young" : a < 45 ? "adult" : a < 60 ? "middle_aged" : "senior";
const lifeRisk = (bmi, s) => (s && bmi>30) ? "high" : (s || bmi>27) ? "medium" : "low";
const cityTier = c => TIER1.includes(c) ? "Tier 1 (Metro)" : TIER2.includes(c) ? "Tier 2" : "Tier 3";

function updateLive() {
  const h = parseFloat($("#height").value);
  const w = parseFloat($("#weight").value);
  const age = parseInt($("#age").value);
  const city = $("#city").value.trim();
  const smoker = $("#smoker").value === "true";

  const bmiEl  = $("#liveBmi");
  const ageEl  = $("#liveAgeGroup");
  const riskEl = $("#liveRisk");
  const tierEl = $("#liveCityTier");
  const meter  = $("#bmiMeter");
  const marker = $("#bmiMarker");

  if (h > 0 && w > 0) {
    const hm = h / 100;
    const bmi = w / (hm*hm);
    bmiEl.textContent = bmi.toFixed(1);
    bmiEl.style.color = bmi < 18.5 ? "#3b82f6" : bmi < 25 ? "#10b981" : bmi < 30 ? "#f59e0b" : "#ef4444";
    marker.style.left = Math.min(Math.max((bmi-10)/35*100,0),100)+"%";
    meter.style.display = "block";
    if (!isNaN(age) && age > 0) {
      const risk = lifeRisk(bmi, smoker);
      riskEl.textContent = risk;
      riskEl.style.color = risk==="high"?"#ef4444":risk==="medium"?"#f59e0b":"#10b981";
    }
  } else {
    bmiEl.textContent = "—"; bmiEl.style.color = ""; meter.style.display = "none";
  }
  ageEl.textContent = (!isNaN(age) && age>0) ? ageGroup(age) : "—";
  ageEl.style.color = "";
  tierEl.textContent = city.length >= 2 ? cityTier(city) : "—";
  tierEl.style.color = "";
}

["height","weight","age","city"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", updateLive);
});

const btnFalse = $("#smokerFalse"), btnTrue = $("#smokerTrue"), smokerHidden = $("#smoker");
btnFalse.addEventListener("click", () => { btnFalse.classList.add("active"); btnTrue.classList.remove("active"); smokerHidden.value="false"; updateLive(); });
btnTrue.addEventListener("click",  () => { btnTrue.classList.add("active"); btnFalse.classList.remove("active"); smokerHidden.value="true";  updateLive(); });

/* ═══════════════════════════════════════════════════════════
   FORM VALIDATION
═══════════════════════════════════════════════════════════ */
function validate() {
  const rules = [
    { id:"age",       err:"ageError",       ok: v=>parseInt(v)>0&&parseInt(v)<=120,   msg:"Enter a valid age (1–120)" },
    { id:"height",    err:"heightError",    ok: v=>parseFloat(v)>=50&&parseFloat(v)<=250, msg:"Height in cm (50–250)" },
    { id:"weight",    err:"weightError",    ok: v=>parseFloat(v)>5&&parseFloat(v)<500,  msg:"Weight in kg (5–500)" },
    { id:"occupation",err:"occupationError",ok: v=>v!=="",                              msg:"Please select an occupation" },
    { id:"income_lpa",err:"incomeLpaError", ok: v=>parseFloat(v)>0,                    msg:"Enter income > 0 LPA" },
    { id:"city",      err:"cityError",      ok: v=>v.trim().length>=2,                 msg:"Enter your city name" },
  ];
  let ok = true;
  rules.forEach(({ id, err, ok:check, msg }) => {
    const el = document.getElementById(id);
    const errEl = document.getElementById(err);
    if (!check(el.value)) { errEl.textContent = msg; el.classList.add("error"); ok = false; }
    else                  { errEl.textContent = ""; el.classList.remove("error"); }
  });
  return ok;
}

/* ═══════════════════════════════════════════════════════════
   FORM SUBMIT → POST /predict
═══════════════════════════════════════════════════════════ */
const form      = $("#predictForm");
const submitBtn = $("#submitBtn");

form.addEventListener("submit", async e => {
  e.preventDefault();
  if (!validate()) { showToast("Please fix the highlighted errors.", "error"); return; }

  const btnText   = submitBtn.querySelector(".btn-text");
  const btnLoader = submitBtn.querySelector(".btn-loader");
  btnText.style.display   = "none";
  btnLoader.style.display = "flex";
  submitBtn.disabled = true;

  const payload = {
    age:        parseInt($("#age").value),
    height:     parseFloat($("#height").value) / 100,
    weight:     parseFloat($("#weight").value),
    occupation: $("#occupation").value,
    smoker:     $("#smoker").value === "true",
    income_lpa: parseFloat($("#income_lpa").value),
    city:       $("#city").value.trim(),
  };

  try {
    const res = await fetch(`${API}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) { const err = await res.json(); throw new Error(err.detail || "Prediction failed"); }
    const data = await res.json();
    renderResult(data);
    showToast(`Prediction: ${data.prediction.toUpperCase()} premium category.`, "success");
  } catch (err) {
    console.error(err);
    showToast(err.message.includes("fetch") ? "Cannot reach API. Is Uvicorn running on port 8000?" : err.message, "error", 5000);
  } finally {
    btnText.style.display   = "";
    btnLoader.style.display = "none";
    submitBtn.disabled = false;
  }
});

function renderResult({ prediction, probabilities, computed_features }) {
  const card = $("#resultCard");
  card.style.display = "block";

  const rv = $("#resultValue");
  rv.textContent = prediction.toUpperCase();
  rv.className = "result-value " + prediction.toLowerCase();

  const pb = $("#probBars");
  pb.innerHTML = "";
  const colorMap = { Low:"low-fill", Medium:"med-fill", High:"high-fill" };
  ["Low","Medium","High"].forEach(lbl => {
    const pct = probabilities[lbl] ?? 0;
    pb.innerHTML += `
      <div class="prob-row">
        <span class="prob-label">${lbl}</span>
        <div class="prob-track"><div class="prob-fill ${colorMap[lbl]}" style="width:0" data-w="${pct}%"></div></div>
        <span class="prob-pct">${pct}%</span>
      </div>`;
  });
  setTimeout(() => pb.querySelectorAll(".prob-fill").forEach(el => el.style.width = el.dataset.w), 50);

  const rf = $("#resultFeatures");
  rf.innerHTML = "";
  const fmap = {
    bmi:            { label:"BMI",            fmt: v => (+v).toFixed(1) },
    age_group:      { label:"Age Group",      fmt: v => v },
    lifestyle_risk: { label:"Lifestyle Risk", fmt: v => v },
    city_tier:      { label:"City Tier",      fmt: v => `Tier ${v}` },
  };
  Object.entries(fmap).forEach(([k, { label, fmt }]) => {
    rf.innerHTML += `
      <div class="result-feat">
        <div class="result-feat-label">${label}</div>
        <div class="result-feat-value">${fmt(computed_features[k])}</div>
      </div>`;
  });

  gsap.from(card, { opacity:0, y:20, duration:.5, ease:"power3.out" });
  card.scrollIntoView({ behavior:"smooth", block:"nearest" });
}

/* ═══════════════════════════════════════════════════════════
   CHARTS — fetch from GET /analytics
═══════════════════════════════════════════════════════════ */
const CHARTCFG = { color:"#94a3b8", grid:"rgba(255,255,255,0.05)" };
Chart.defaults.color = CHARTCFG.color;
Chart.defaults.font.family = "Sora";
Chart.defaults.font.size = 11;

const STATIC_ANALYTICS = {
  monthly_predictions: [980,1120,1340,1180,1450,1620,1390,1580,1720,1890,2010,1950],
  distribution: { Low:34, Medium:33, High:33 },
  occupation_risk: {
    retired:{Low:10,Medium:35,High:55}, freelancer:{Low:45,Medium:35,High:20},
    student:{Low:60,Medium:30,High:10}, government_job:{Low:40,Medium:40,High:20},
    business_owner:{Low:25,Medium:40,High:35}, unemployed:{Low:30,Medium:35,High:35},
    private_job:{Low:42,Medium:38,High:20},
  },
  age_group_distribution: { young:22, adult:35, middle_aged:28, senior:15 },
  risk_factors: { smoking:68, high_bmi:45, age_senior:52, low_income:38 },
};

async function fetchAndBuildCharts() {
  let data = STATIC_ANALYTICS;
  try {
    const res = await fetch(`${API}/analytics`);
    if (res.ok) data = await res.json();
  } catch (_) { /* use static fallback */ }
  buildLine(data); buildDonut(data); buildBar(data); buildAge(data); buildRadar(data);
}

function tooltip() { return { backgroundColor:"#0d1526", borderColor:"#1e293b", borderWidth:1, padding:10 }; }

function buildLine(d) {
  const ctx = $("#lineChart").getContext("2d");
  const g = ctx.createLinearGradient(0,0,0,240);
  g.addColorStop(0,"rgba(59,130,246,.35)"); g.addColorStop(1,"rgba(59,130,246,0)");
  new Chart(ctx, {
    type:"line",
    data:{ labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], datasets:[{ label:"Predictions", data:d.monthly_predictions, borderColor:"#3b82f6", backgroundColor:g, borderWidth:2.5, pointBackgroundColor:"#3b82f6", pointRadius:3, pointHoverRadius:6, tension:.45, fill:true }] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false }, tooltip:tooltip() }, scales:{ x:{ grid:{color:CHARTCFG.grid}, ticks:{color:"#64748b"} }, y:{ grid:{color:CHARTCFG.grid}, ticks:{color:"#64748b"} } } },
  });
}

function buildDonut(d) {
  new Chart($("#donutChart").getContext("2d"), {
    type:"doughnut",
    data:{ labels:["Low","Medium","High"], datasets:[{ data:Object.values(d.distribution), backgroundColor:["rgba(16,185,129,.8)","rgba(245,158,11,.8)","rgba(239,68,68,.8)"], borderColor:["#10b981","#f59e0b","#ef4444"], borderWidth:2, hoverOffset:8 }] },
    options:{ responsive:true, maintainAspectRatio:false, cutout:"68%", plugins:{ legend:{ position:"bottom", labels:{ padding:16, usePointStyle:true, pointStyleWidth:10 } }, tooltip:tooltip() } },
  });
}

function buildBar(d) {
  const labels = Object.keys(d.occupation_risk).map(o => o.replace("_"," "));
  new Chart($("#barChart").getContext("2d"), {
    type:"bar",
    data:{ labels, datasets:[
      { label:"Low",    data:Object.values(d.occupation_risk).map(v=>v.Low),    backgroundColor:"rgba(16,185,129,.75)",  borderRadius:4 },
      { label:"Medium", data:Object.values(d.occupation_risk).map(v=>v.Medium), backgroundColor:"rgba(245,158,11,.75)", borderRadius:4 },
      { label:"High",   data:Object.values(d.occupation_risk).map(v=>v.High),   backgroundColor:"rgba(239,68,68,.75)",  borderRadius:4 },
    ]},
    options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:"top", labels:{usePointStyle:true,pointStyleWidth:10} }, tooltip:tooltip() }, scales:{ x:{stacked:true,grid:{color:CHARTCFG.grid},ticks:{color:"#64748b"}}, y:{stacked:true,grid:{color:CHARTCFG.grid},ticks:{color:"#64748b"}} } },
  });
}

function buildAge(d) {
  const labels = Object.keys(d.age_group_distribution).map(l=>l.replace("_"," "));
  new Chart($("#ageChart").getContext("2d"), {
    type:"bar",
    data:{ labels, datasets:[{ label:"% of Users", data:Object.values(d.age_group_distribution), backgroundColor:["rgba(99,102,241,.8)","rgba(59,130,246,.8)","rgba(6,182,212,.8)","rgba(16,185,129,.8)"], borderColor:["#6366f1","#3b82f6","#06b6d4","#10b981"], borderWidth:1.5, borderRadius:6 }] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}, tooltip:tooltip() }, scales:{ x:{grid:{display:false},ticks:{color:"#64748b"}}, y:{grid:{color:CHARTCFG.grid},ticks:{color:"#64748b",callback:v=>v+"%"}} } },
  });
}

function buildRadar(d) {
  new Chart($("#radarChart").getContext("2d"), {
    type:"radar",
    data:{ labels:["Smoking","High BMI","Senior Age","Low Income"], datasets:[{ label:"Risk Factor (%)", data:Object.values(d.risk_factors), backgroundColor:"rgba(59,130,246,.15)", borderColor:"#3b82f6", pointBackgroundColor:"#06b6d4", pointBorderColor:"#fff", borderWidth:2 }] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}, tooltip:tooltip() }, scales:{ r:{ grid:{color:"rgba(255,255,255,.07)"}, angleLines:{color:"rgba(255,255,255,.07)"}, pointLabels:{color:"#94a3b8",font:{size:11}}, ticks:{display:false}, min:0, max:100 } } },
  });
}

/* ═══════════════════════════════════════════════════════════
   COPY BUTTON
═══════════════════════════════════════════════════════════ */
const copyBtn = $("#copyBtn");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText($("#sampleCode").textContent).then(() => {
      copyBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Copied!`;
      setTimeout(() => { copyBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/></svg> Copy`; }, 2200);
      showToast("Copied to clipboard.", "success");
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initHeroCanvas();
  initHeroGSAP();
  animateCounters();
  initReveal();

  // Lazy-init 3D sphere on scroll into view
  const obs3d = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { initRiskSphere(); obs3d.disconnect(); }
  }, { threshold:.1 });
  const riskEl = $("#riskCanvas3d");
  if (riskEl) obs3d.observe(riskEl);

  showToast("Welcome to InsureIQ. Ready to predict.", "info", 4000);
});
