const fs = require('fs');

let html = fs.readFileSync('CellCentral_Prototype.html', 'utf8');

// 1. Prepare modern CSS replacements
const homeCss = `
  /* ---------- hero banner (responsive) ---------- */
  .hero-banner-wrap{
    position:relative;
    width:100%;
    overflow:hidden;
    background:#061128;
    line-height:0;
  }
  .hero-banner-wrap picture{
    display:block;
    width:100%;
  }
  .hero-banner-img{
    display:block;
    width:100%;
    height:auto;
    object-fit:cover;
  }
  .hero-cta-hotspot{
    position:absolute;
    left:5.2%;
    top:73%;
    width:16%;
    height:9%;
    border-radius:100px;
    cursor:pointer;
    z-index:10;
    transition:transform .2s ease, box-shadow .2s ease;
  }
  .hero-cta-hotspot:hover{
    box-shadow:0 0 25px rgba(255,122,26,0.6);
  }
  .hero-banner-dots{
    position:absolute;
    bottom:14px;
    left:50%;
    transform:translateX(-50%);
    display:flex;
    align-items:center;
    gap:8px;
    z-index:10;
  }
  .hero-banner-dots span{
    width:8px;
    height:8px;
    border-radius:50%;
    background:rgba(255,255,255,0.4);
    cursor:pointer;
    transition:background .2s ease;
  }
  .hero-banner-dots span.active{
    background:#FFFFFF;
  }

  /* ---------- central source head ---------- */
  .central-head{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:18px;
    margin-bottom:30px;
    text-align:center;
  }
  .central-head .bar-blue{
    width:64px;
    height:3.5px;
    border-radius:3px;
    background:#0B63F6;
    flex-shrink:0;
  }
  .central-head .bar-pink{
    width:64px;
    height:3.5px;
    border-radius:3px;
    background:#FF2E93;
    flex-shrink:0;
  }
  .central-head h2{
    font-family:'Space Grotesk',sans-serif;
    font-size:22px;
    font-weight:700;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:var(--navy);
    margin:0;
  }
  .central-head h2 .c-orange{
    color:var(--orange);
  }
  @media(max-width:640px){
    .central-head .bar-blue, .central-head .bar-pink{ width:28px; }
    .central-head h2{ font-size:15px; letter-spacing:0.04em; }
  }

  /* ---------- category icon strip ---------- */
  .cat-strip{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:0;
    flex-wrap:wrap;
  }
  .cat-pill{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:10px;
    padding:6px 26px;
    transition:transform .18s ease;
    position:relative;
    cursor:pointer;
  }
  .cat-pill:hover{
    transform:translateY(-3px);
  }
  .cat-pill:not(:last-child)::after{
    content:'';
    position:absolute;
    right:0;
    top:10px;
    bottom:10px;
    width:1px;
    background:var(--gray-200);
  }
  .cat-icon{
    width:58px;
    height:58px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#fff;
    border:2.2px solid var(--ring, var(--blue));
    box-shadow:0 4px 12px rgba(11,30,61,0.05);
    transition:.18s;
  }
  .cat-pill:hover .cat-icon{
    transform:scale(1.05);
    box-shadow:0 8px 18px rgba(11,30,61,0.12);
  }
  .cat-icon svg{
    width:24px;
    height:24px;
    stroke:var(--ring, var(--blue));
  }
  .cat-pill span{
    font-family:'Space Grotesk',sans-serif;
    font-size:11.5px;
    font-weight:700;
    color:var(--navy);
    letter-spacing:0.03em;
    text-transform:uppercase;
    text-align:center;
  }

  /* ---------- popular categories grid ---------- */
  .pop-grid{
    display:grid;
    grid-template-columns:repeat(6,1fr);
    gap:16px;
  }
  .pop-card{
    border:1px solid var(--gray-100);
    border-radius:var(--radius);
    padding:20px 14px;
    text-align:center;
    transition:.18s;
    background:#fff;
    cursor:pointer;
  }
  .pop-card:hover{
    box-shadow:var(--shadow-hover);
    transform:translateY(-3px);
    border-color:transparent;
  }
  .pop-thumb{
    width:90px;
    height:90px;
    margin:0 auto 14px;
    border-radius:50%;
    background:#F4F6F9;
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
  }
  .pop-thumb img{
    width:100%;
    height:100%;
    object-fit:cover;
    transition:transform .25s ease;
  }
  .pop-card:hover .pop-thumb img{
    transform:scale(1.08);
  }
  .pop-card b{
    font-family:'Space Grotesk',sans-serif;
    font-size:12.5px;
    font-weight:700;
    display:block;
    color:var(--navy);
    text-transform:uppercase;
    letter-spacing:0.02em;
  }
  .pop-card a.pop-link{
    font-size:12px;
    color:var(--blue);
    font-weight:700;
    display:inline-flex;
    align-items:center;
    gap:4px;
    margin-top:6px;
    transition:.15s;
  }
  .pop-card:hover a.pop-link{
    gap:7px;
  }

  /* ---------- trust band ---------- */
  .trust-band{
    background:#F8FAFC;
    border-radius:var(--radius-lg);
    padding:30px 36px;
    border:1px solid #EEF2F6;
  }
  .trust-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:24px;
  }
  .trust-item{
    display:flex;
    gap:14px;
    align-items:flex-start;
  }
  .trust-icon{
    width:42px;
    height:42px;
    border-radius:50%;
    background:rgba(11,99,246,0.08);
    flex:none;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .trust-icon svg{
    width:22px;
    height:22px;
    color:var(--blue);
    stroke:var(--blue);
  }
  .trust-item h4{
    font-family:'Space Grotesk',sans-serif;
    font-size:13px;
    font-weight:700;
    text-transform:uppercase;
    letter-spacing:0.03em;
    color:var(--navy);
    margin-bottom:3px;
  }
  .trust-item p{
    font-size:12.5px;
    color:var(--gray-700);
    margin:0;
    line-height:1.4;
  }

  /* ---------- collections grid ---------- */
  .coll-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:18px;
  }
  .coll-card{
    border-radius:var(--radius);
    padding:24px 20px;
    min-height:185px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    position:relative;
    overflow:hidden;
    transition:transform .2s ease, box-shadow .2s ease;
  }
  .coll-card:hover{
    transform:translateY(-3px);
    box-shadow:var(--shadow-soft);
  }
  .coll-card h4{
    font-family:'Space Grotesk',sans-serif;
    font-size:16px;
    font-weight:800;
    color:var(--navy);
    letter-spacing:0.02em;
    text-transform:uppercase;
  }
  .coll-card p{
    font-size:12.5px;
    margin-top:5px;
    color:var(--gray-700);
    max-width:160px;
    line-height:1.4;
  }
  .coll-1{ background:#EBF1F9; }
  .coll-2{ background:#F3EDFB; }
  .coll-3{ background:#EBF1F9; }
  .coll-4{ background:#FDEEE7; }
  .coll-img-wrap{
    position:absolute;
    right:10px;
    top:50%;
    transform:translateY(-50%);
    width:120px;
    height:130px;
    display:flex;
    align-items:center;
    justify-content:center;
    pointer-events:none;
  }
  .coll-img-wrap img{
    max-width:100%;
    max-height:100%;
    object-fit:contain;
  }
  .coll-cta{
    font-size:11.5px;
    font-weight:700;
    letter-spacing:0.04em;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    padding:8px 18px;
    border-radius:6px;
    width:fit-content;
    margin-top:16px;
    cursor:pointer;
    transition:opacity .15s;
  }
  .coll-cta:hover{ opacity:.9; }
  .coll-1 .coll-cta, .coll-3 .coll-cta{ background:#0B63F6; }
  .coll-2 .coll-cta{ background:#7C3AED; }
  .coll-4 .coll-cta{ background:#FF5722; }

  /* ---------- brands ---------- */
  .brand-strip{
    display:flex;
    align-items:center;
    justify-content:space-between;
    flex-wrap:wrap;
    gap:28px;
    padding:30px 0;
  }
  .brand-item{
    display:flex;
    align-items:center;
    gap:6px;
    font-family:'Space Grotesk',sans-serif;
    font-weight:800;
    font-size:22px;
    letter-spacing:0.03em;
    cursor:pointer;
    transition:transform .15s;
  }
  .brand-item:hover{
    transform:scale(1.05);
  }
  .brand-anker{ color:#00A6E0; }
  .brand-ugreen{ color:#00B578; }
  .brand-baseus{ color:#1F2937; display:flex; align-items:center; gap:5px; }
  .brand-baseus .baseus-b{
    width:22px;
    height:22px;
    border-radius:50%;
    background:#1F2937;
    color:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:12px;
    font-weight:900;
  }
  .brand-esr{ color:#00A3A6; font-size:24px; letter-spacing:0.06em; }
  .brand-spigen{ color:#1F2937; display:flex; align-items:center; gap:6px; }
  .brand-spigen .spigen-mark{ color:#FF7A1A; font-weight:900; font-size:18px; }
  .brand-torras{ color:#FF5E00; display:flex; align-items:center; gap:5px; }
  .brand-samsung{ color:#0C2340; font-weight:900; letter-spacing:0.08em; }

  .seeall-btn{
    font-family:'Space Grotesk',sans-serif;
    font-size:13px;
    font-weight:700;
    color:var(--blue);
    letter-spacing:0.04em;
    display:inline-flex;
    align-items:center;
    gap:6px;
    transition:gap .15s;
  }
  .seeall-btn:hover{
    gap:9px;
  }

  /* ---------- newsletter banner ---------- */
  .newsletter-bar{
    background:linear-gradient(90deg, #0B63F6 0%, #FF2E93 60%, #FF7A1A 100%);
    border-radius:var(--radius-lg);
    padding:30px 38px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:28px;
    flex-wrap:wrap;
    color:#fff;
    box-shadow:0 8px 30px rgba(255,46,147,0.22);
  }
  .nl-left{
    display:flex;
    align-items:center;
    gap:16px;
  }
  .nl-icon{
    width:48px;
    height:48px;
    border-radius:50%;
    background:rgba(255,255,255,0.16);
    display:flex;
    align-items:center;
    justify-content:center;
    flex:none;
  }
  .nl-icon svg{
    width:22px;
    height:22px;
    stroke:#fff;
  }
  .nl-left h3{
    font-family:'Space Grotesk',sans-serif;
    font-size:19px;
    font-weight:700;
    letter-spacing:0.02em;
    text-transform:uppercase;
    color:#fff;
    margin:0;
  }
  .nl-left p{
    font-size:13px;
    opacity:0.95;
    margin:3px 0 0 0;
  }
  .nl-center{
    flex:1;
    max-width:440px;
  }
  .nl-form-box{
    display:flex;
    background:#FFFFFF;
    border-radius:100px;
    padding:3.5px 4px 3.5px 18px;
    box-shadow:0 4px 14px rgba(0,0,0,0.12);
  }
  .nl-form-box input{
    flex:1;
    border:none;
    background:transparent;
    font-size:13px;
    font-family:inherit;
    color:var(--navy);
  }
  .nl-form-box input:focus{ outline:none; }
  .nl-form-box input::placeholder{ color:var(--gray-400); }
  .nl-form-box button{
    background:linear-gradient(90deg, #5925DC 0%, #FF5722 100%);
    color:#fff;
    font-family:'Space Grotesk',sans-serif;
    font-weight:700;
    font-size:12.5px;
    letter-spacing:0.04em;
    padding:9px 22px;
    border-radius:100px;
    transition:transform .15s ease, opacity .15s ease;
  }
  .nl-form-box button:hover{
    opacity:.92;
    transform:scale(1.02);
  }
  .nl-right{
    display:flex;
    align-items:center;
    gap:18px;
  }
  .nl-right span{
    font-family:'Space Grotesk',sans-serif;
    font-size:13px;
    font-weight:700;
    letter-spacing:0.06em;
    text-transform:uppercase;
    color:#fff;
  }
  .nl-socials{
    display:flex;
    align-items:center;
    gap:12px;
  }
  .nl-socials a{
    color:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
    transition:transform .15s;
  }
  .nl-socials a:hover{
    transform:translateY(-2px);
  }
  .nl-socials svg{
    width:18px;
    height:18px;
    fill:currentColor;
  }

  /* ---------- footer (matching Home Page (1).png) ---------- */
  footer.site{
    background:#FFFFFF;
    color:var(--gray-700);
    padding-top:46px;
    border-top:1px solid var(--gray-100);
  }
  .foot-grid{
    display:grid;
    grid-template-columns:1.5fr repeat(4,1fr);
    gap:28px;
    padding-bottom:34px;
  }
  .foot-brand p{
    font-size:13px;
    color:var(--gray-700);
    margin-top:14px;
    max-width:260px;
    line-height:1.5;
  }
  .foot-brand .foot-copy{
    font-size:12px;
    color:var(--gray-400);
    margin-top:16px;
  }
  .foot-col h5{
    color:var(--navy);
    font-size:12.5px;
    letter-spacing:0.04em;
    font-weight:700;
    text-transform:uppercase;
    margin-bottom:16px;
    font-family:'Space Grotesk',sans-serif;
  }
  .foot-col a{
    display:block;
    font-size:13px;
    color:var(--gray-700);
    margin-bottom:10px;
    transition:.15s;
    font-weight:500;
  }
  .foot-col a:hover{
    color:var(--blue);
  }
  .foot-bottom{
    border-top:1px solid var(--gray-100);
    padding:16px 0;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    font-size:12px;
    color:var(--gray-700);
    gap:24px;
  }
  .foot-bottom a{
    color:var(--gray-700);
    transition:.15s;
  }
  .foot-bottom a:hover{
    color:var(--blue);
  }
`;

// Replace from "/* ---------- hero ---------- */" to "/* ---------- product card ---------- */"
const startCss = html.indexOf('/* ---------- hero ---------- */');
const endCss = html.indexOf('/* ---------- product card ---------- */');

if (startCss !== -1 && endCss !== -1) {
  html = html.substring(0, startCss) + homeCss + '\n  ' + html.substring(endCss);
  console.log('Replaced CSS block');
} else {
  console.error('Could not find CSS boundaries', startCss, endCss);
}

// 2. Prepare HTML for Home Page (#page-home)
const homeHtml = `<!-- ======================================================= -->
<!-- ====================== HOME PAGE ===================== -->
<!-- ======================================================= -->
<div class="page" id="page-home">

  <!-- HERO BANNER (CellCentral Responsive Banners) -->
  <section style="padding:0;">
    <div class="hero-banner-wrap">
      <picture>
        <source media="(max-width: 768px)" srcset="CellCentral_Mobile_Homepage_Banner_1080x1350.png">
        <img src="CellCentral_Final_Home_Banner_2048x790.png" alt="CellCentral - Power. Protect. Connect." class="hero-banner-img">
      </picture>
      <!-- Clickable hotspot over the banner SHOP NOW button -->
      <a href="#" class="hero-cta-hotspot" data-page="shop" title="Shop Now"></a>
      <!-- 4 indicator dots centered at bottom of banner -->
      <div class="hero-banner-dots">
        <span class="active"></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </section>

  <!-- YOUR CENTRAL SOURCE FOR MOBILE ACCESSORIES -->
  <section style="padding-top:40px;padding-bottom:18px;">
    <div class="wrap">
      <div class="central-head">
        <div class="bar-blue"></div>
        <h2>YOUR <span class="c-orange">CENTRAL</span> SOURCE FOR MOBILE ACCESSORIES</h2>
        <div class="bar-pink"></div>
      </div>
      <div class="cat-strip">
        <a class="cat-pill" href="#" data-page="shop" style="--ring:#22C55E;">
          <div class="cat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v6M9 2v4M15 2v4M8 8h8a2 2 0 0 1 2 2v3a6 6 0 0 1-12 0v-3a2 2 0 0 1 2-2zM12 19v3"/>
            </svg>
          </div>
          <span>CHARGERS</span>
        </a>
        <a class="cat-pill" href="#" data-page="shop" style="--ring:#2563EB;">
          <div class="cat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="4" width="4" height="7" rx="1.5"/>
              <rect x="15" y="4" width="4" height="7" rx="1.5"/>
              <path d="M7 11v4a5 5 0 0 0 10 0v-4M12 20v2"/>
            </svg>
          </div>
          <span>CABLES</span>
        </a>
        <a class="cat-pill" href="#" data-page="shop" style="--ring:#8B5CF6;">
          <div class="cat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="2" width="12" height="20" rx="3.5" fill="none"/>
              <rect x="8.5" y="4.5" width="7" height="15" rx="2" fill="var(--ring)"/>
            </svg>
          </div>
          <span>CASES</span>
        </a>
        <a class="cat-pill" href="#" data-page="shop" style="--ring:#EC4899;">
          <div class="cat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/>
              <circle cx="12" cy="18" r="1" fill="var(--ring)"/>
            </svg>
          </div>
          <span>SCREEN<br>PROTECTORS</span>
        </a>
        <a class="cat-pill" href="#" data-page="shop" style="--ring:#F97316;">
          <div class="cat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="9" r="3" fill="var(--ring)"/>
              <circle cx="16" cy="9" r="3" fill="var(--ring)"/>
              <path d="M8 12v9M16 12v9"/>
            </svg>
          </div>
          <span>AUDIO</span>
        </a>
        <a class="cat-pill" href="#" data-page="shop" style="--ring:#06B6D4;">
          <div class="cat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="2.5" fill="var(--ring)"/>
              <path d="M7.8 7.8a6 6 0 0 1 8.4 0M4.9 4.9a10 10 0 0 1 14.2 0M10.2 16.2a6 6 0 0 0-3.6-2M13.8 16.2a6 6 0 0 1 3.6-2"/>
            </svg>
          </div>
          <span>WIRELESS</span>
        </a>
        <a class="cat-pill" href="#" data-page="shop" style="--ring:#1E3A8A;">
          <div class="cat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="7" y="3" width="10" height="18" rx="2"/>
              <circle cx="12" cy="17" r="1" fill="var(--ring)"/>
              <path d="M10 7h4"/>
            </svg>
          </div>
          <span>POWER BANKS</span>
        </a>
      </div>
    </div>
  </section>

  <!-- POPULAR CATEGORIES GRID (6 Products with Real Photography) -->
  <section style="padding-top:14px;padding-bottom:32px;">
    <div class="wrap">
      <div class="pop-grid">
        <div class="pop-card" data-page="shop">
          <div class="pop-thumb">
            <img src="public/images/device-iphone.jpg" alt="Phone Cases">
          </div>
          <b>PHONE CASES</b>
          <a class="pop-link" href="#" data-page="shop">Shop now →</a>
        </div>
        <div class="pop-card" data-page="shop">
          <div class="pop-thumb">
            <img src="public/images/products/screen-protector-tray.jpg" alt="Screen Protectors">
          </div>
          <b>SCREEN PROTECTORS</b>
          <a class="pop-link" href="#" data-page="shop">Shop now →</a>
        </div>
        <div class="pop-card" data-page="shop">
          <div class="pop-thumb">
            <img src="public/images/products/charger-gan-65w.jpg" alt="Chargers">
          </div>
          <b>CHARGERS</b>
          <a class="pop-link" href="#" data-page="shop">Shop now →</a>
        </div>
        <div class="pop-card" data-page="shop">
          <div class="pop-thumb">
            <img src="public/images/products/cable-braided-100w.jpg" alt="Cables">
          </div>
          <b>CABLES</b>
          <a class="pop-link" href="#" data-page="shop">Shop now →</a>
        </div>
        <div class="pop-card" data-page="shop">
          <div class="pop-thumb">
            <img src="public/images/products/powerbank-magsafe.jpg" alt="Power Banks">
          </div>
          <b>POWER BANKS</b>
          <a class="pop-link" href="#" data-page="shop">Shop now →</a>
        </div>
        <div class="pop-card" data-page="shop">
          <div class="pop-thumb">
            <img src="public/images/products/car-mount-magsafe.jpg" alt="Car Accessories">
          </div>
          <b>CAR ACCESSORIES</b>
          <a class="pop-link" href="#" data-page="shop">Shop now →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- VALUE PROPOSITION / TRUST BAND -->
  <section style="padding:10px 0 32px 0;">
    <div class="wrap">
      <div class="trust-band">
        <div class="trust-grid">
          <div class="trust-item">
            <div class="trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="6"/>
                <path d="M15.5 13.5L18 22l-6-3-6 3 2.5-8.5"/>
              </svg>
            </div>
            <div>
              <h4>QUALITY YOU CAN TRUST</h4>
              <p>Carefully selected premium accessories.</p>
            </div>
          </div>
          <div class="trust-item">
            <div class="trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <div>
              <h4>WARRANTY COVERAGE</h4>
              <p>1-year warranty on all eligible products.</p>
            </div>
          </div>
          <div class="trust-item">
            <div class="trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </div>
            <div>
              <h4>EASY RETURNS</h4>
              <p>30-day hassle-free returns.</p>
            </div>
          </div>
          <div class="trust-item">
            <div class="trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
              </svg>
            </div>
            <div>
              <h4>CUSTOMER SUPPORT</h4>
              <p>Local support when you need it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED COLLECTIONS -->
  <section style="padding:10px 0 32px 0;">
    <div class="wrap">
      <div class="section-head" style="margin-bottom:24px;">
        <h2 style="font-size:22px;letter-spacing:0.04em;">FEATURED COLLECTIONS</h2>
      </div>
      <div class="coll-grid">
        <div class="coll-card coll-1">
          <div>
            <h4>NEW ARRIVALS</h4>
            <p>The latest accessories for the newest devices.</p>
          </div>
          <div class="coll-img-wrap">
            <img src="public/images/device-iphone.jpg" alt="New Arrivals">
          </div>
          <span class="coll-cta" data-page="shop">SHOP NOW</span>
        </div>
        <div class="coll-card coll-2">
          <div>
            <h4>MAGSAFE COLLECTION</h4>
            <p>Snap on. Power up. Stay connected.</p>
          </div>
          <div class="coll-img-wrap">
            <img src="public/images/products/case-clear-magsafe.jpg" alt="MagSafe Collection">
          </div>
          <span class="coll-cta" data-page="shop">SHOP NOW</span>
        </div>
        <div class="coll-card coll-3">
          <div>
            <h4>FAST CHARGING ESSENTIALS</h4>
            <p>Charge smarter. Save time.</p>
          </div>
          <div class="coll-img-wrap">
            <img src="public/images/products/charger-gan-65w.jpg" alt="Fast Charging Essentials">
          </div>
          <span class="coll-cta" data-page="shop">SHOP NOW</span>
        </div>
        <div class="coll-card coll-4">
          <div>
            <h4>CLEARANCE DEALS</h4>
            <p>Top products. Unbeatable prices.</p>
          </div>
          <div class="coll-img-wrap">
            <svg viewBox="0 0 100 120" style="width:85px;height:102px;filter:drop-shadow(0 10px 14px rgba(220,38,38,0.28));">
              <g transform="rotate(12 50 60)">
                <path d="M22 15 L68 15 C74 15 78 19 78 25 L78 95 C78 101 74 105 68 105 L22 105 C16 105 12 101 12 95 L12 25 C12 19 16 15 22 15 Z" fill="#EF4444"/>
                <circle cx="45" cy="28" r="4.5" fill="#FFFFFF"/>
                <text x="45" y="76" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="900" fill="#FFFFFF">%</text>
              </g>
            </svg>
          </div>
          <span class="coll-cta" data-page="shop">SHOP NOW</span>
        </div>
      </div>
    </div>
  </section>

  <!-- TOP BRANDS WE CARRY -->
  <section style="padding:10px 0 28px 0;">
    <div class="wrap">
      <div class="section-head" style="margin-bottom:12px;">
        <h2 style="font-size:20px;letter-spacing:0.04em;">TOP BRANDS WE CARRY</h2>
      </div>
      <div class="brand-strip">
        <span class="brand-item brand-anker">ANKER</span>
        <span class="brand-item brand-ugreen">UGREEN</span>
        <span class="brand-item brand-baseus"><span class="baseus-b">B</span>BASEUS</span>
        <span class="brand-item brand-esr">ESR</span>
        <span class="brand-item brand-spigen"><span class="spigen-mark">❖</span>spigen</span>
        <span class="brand-item brand-torras"><span style="color:#FF5E00;font-size:16px;">▼</span>TORRAS</span>
        <span class="brand-item brand-samsung">SAMSUNG</span>
      </div>
      <div style="text-align:center;margin-top:16px;">
        <a class="seeall-btn" href="#" data-page="shop">VIEW ALL BRANDS →</a>
      </div>
    </div>
  </section>

  <!-- STAY IN THE LOOP (NEWSLETTER) -->
  <section style="padding:16px 0 46px 0;">
    <div class="wrap">
      <div class="newsletter-bar">
        <div class="nl-left">
          <div class="nl-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 6l-10 7L2 6"/>
            </svg>
          </div>
          <div>
            <h3>STAY IN THE LOOP</h3>
            <p>Get exclusive deals, new arrivals and special offers.</p>
          </div>
        </div>
        <div class="nl-center">
          <div class="nl-form-box">
            <input type="email" placeholder="Enter your email address">
            <button type="button">SUBSCRIBE</button>
          </div>
        </div>
        <div class="nl-right">
          <span>FOLLOW US</span>
          <div class="nl-socials">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>
`;

// Replace page-home block
const startHome = html.indexOf('<div class="page" id="page-home">');
const endHome = html.indexOf('<div class="page hide" id="page-shop">');

if (startHome !== -1 && endHome !== -1) {
  // We want to replace from before the comment or from startHome
  let actualStart = html.lastIndexOf('<!-- ===', startHome);
  if (actualStart === -1) actualStart = startHome;
  html = html.substring(0, actualStart) + homeHtml + '\n\n' + html.substring(endHome);
  console.log('Replaced Home Page HTML block successfully');
} else {
  console.error('Could not find Home Page boundaries', startHome, endHome);
}

// 3. Prepare modern Footer matching Home Page (1).png
const footerHtml = `<!-- ============ FOOTER ============ -->
<footer class="site">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="logo" href="#" data-page="home" style="gap:10px;">
          <img src="public/images/logo.png" alt="CellCentral" style="height:38px;width:auto;">
          <div style="display:flex;flex-direction:column;">
            <div style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:19px;line-height:1;letter-spacing:0.02em;">
              <span style="color:#0B1E3D;">CELL</span><span style="color:#FF7A1A;">CENTRAL</span>
            </div>
            <span style="font-size:8.5px;letter-spacing:0.14em;color:#8891A5;font-weight:600;margin-top:2px;">MOBILE ACCESSORIES</span>
          </div>
        </a>
        <p>Your one-stop shop for premium mobile accessories in Canada.</p>
        <div class="foot-copy">© 2026 CellCentral.ca | All rights reserved.</div>
      </div>
      <div class="foot-col">
        <h5>SHOP</h5>
        <a href="#" data-page="shop">Phone Cases</a>
        <a href="#" data-page="shop">Screen Protectors</a>
        <a href="#" data-page="shop">Chargers</a>
        <a href="#" data-page="shop">Cables</a>
        <a href="#" data-page="shop">Power Banks</a>
        <a href="#" data-page="shop">Audio</a>
        <a href="#" data-page="shop">All Accessories</a>
        <a href="#" data-page="shop" style="color:var(--red);">Deals</a>
      </div>
      <div class="foot-col">
        <h5>CUSTOMER SERVICE</h5>
        <a href="#">Contact Us</a>
        <a href="#">Shipping Information</a>
        <a href="#">Returns &amp; Exchanges</a>
        <a href="#">Warranty</a>
        <a href="#">FAQs</a>
        <a href="#">Track Your Order</a>
      </div>
      <div class="foot-col">
        <h5>ABOUT US</h5>
        <a href="#">Our Story</a>
        <a href="#">Why CellCentral</a>
        <a href="#">Become a Retail Partner</a>
        <a href="#">Bulk Orders</a>
        <a href="#">Careers</a>
      </div>
      <div class="foot-col">
        <h5>ACCOUNT</h5>
        <a href="#">My Account</a>
        <a href="#">Order History</a>
        <a href="#">Wishlist</a>
        <a href="#">Newsletter</a>
      </div>
    </div>
    <div class="foot-bottom">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
    </div>
  </div>
</footer>`;

const startFoot = html.indexOf('<!-- ============ FOOTER ============ -->');
const endFoot = html.indexOf('<script>');

if (startFoot !== -1 && endFoot !== -1) {
  html = html.substring(0, startFoot) + footerHtml + '\n\n' + html.substring(endFoot);
  console.log('Replaced Footer block');
} else {
  console.error('Could not find Footer boundaries', startFoot, endFoot);
}

// 4. Update Header Topbar items to match Home Page (1).png exactly
// "1-YEAR WARRANTY on all products" instead of "on all eligible products"
html = html.replace('1-YEAR WARRANTY</span> on all eligible products', '1-YEAR WARRANTY</span> on all products');

// Also update Header logo to use the clean image if base64 or style
const oldLogoLink = '<a class="logo" href="#" data-page="home">';
const logoIdx = html.indexOf(oldLogoLink);
if (logoIdx !== -1) {
  // Let's check header logo
  console.log('Header logo found');
}

fs.writeFileSync('CellCentral_Prototype.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated CellCentral_Prototype.html and index.html');
