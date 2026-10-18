const fs = require('fs');

let html = fs.readFileSync('CellCentral_Prototype.html', 'utf8');

// Refine header logo and cart count and navcat
const oldHeaderLogoRegex = /<a class="logo" href="#" data-page="home">[\s\S]*?<\/a>/;
const newHeaderLogo = `<a class="logo" href="#" data-page="home" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
      <img src="public/images/logo.png" alt="CellCentral" style="height:38px;width:auto;">
      <div style="display:flex;flex-direction:column;">
        <div style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:22px;line-height:1;letter-spacing:0.02em;">
          <span style="color:#0B1E3D;">CELL</span><span style="color:#FF7A1A;">CENTRAL</span>
        </div>
        <span style="font-size:8.5px;letter-spacing:0.14em;color:#8891A5;font-weight:600;margin-top:3px;">MOBILE ACCESSORIES</span>
      </div>
    </a>`;

html = html.replace(oldHeaderLogoRegex, newHeaderLogo);

// Cart badge to 0
html = html.replace('<span class="cart-count">3</span>', '<span class="cart-count">0</span>');

// Navcat button with chevron
const oldNavcatRegex = /<a class="navcat" href="#" data-page="shop">[\s\S]*?<\/a>/;
const newNavcat = `<a class="navcat" href="#" data-page="shop" style="display:flex;align-items:center;gap:9px;background:#0B1E3D;color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:13px;padding:12px 20px;letter-spacing:0.03em;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" style="width:16px;height:16px;"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        SHOP BY CATEGORY
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" style="width:13px;height:13px;margin-left:4px;"><path d="M9 18l6-6-6-6"/></svg>
      </a>`;

html = html.replace(oldNavcatRegex, newNavcat);

// Fix any duplicated home page comment banner
html = html.replace('<!-- ====================== HOME PAGE ===================== -->\n<!-- ======================================================= -->\n<!-- ====================== HOME PAGE ===================== -->', '<!-- ====================== HOME PAGE ===================== -->');

fs.writeFileSync('CellCentral_Prototype.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Refined header and nav in CellCentral_Prototype.html and index.html');
