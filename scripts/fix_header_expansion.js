const fs = require('fs');

let html = fs.readFileSync('CellCentral_Prototype.html', 'utf8');

// 1. Update --maxw to 1560px
html = html.replace('--maxw: 1280px;', '--maxw: 1560px;');

// 2. Update topbar CSS
const oldTopbarCssRegex = /\.topbar\{[\s\S]*?\.topbar \.accent\{[^}]+\}/;
const newTopbarCss = `.topbar{
    background:var(--navy);color:#fff;font-size:12.5px;font-weight:500;
    border-top:1px solid rgba(255,255,255,0.06);width:100%;
  }
  .topbar-inner, .topbar .wrap{
    display:flex;align-items:center;justify-content:center;gap:clamp(20px, 3.5vw, 56px);
    padding:9px clamp(20px, 3.5vw, 64px);flex-wrap:wrap;
    width:100%;max-width:1820px;margin:0 auto;
  }
  .topbar .item{display:flex;align-items:center;gap:7px;letter-spacing:0.01em;}
  .topbar .item svg{width:14px;height:14px;flex:none;}
  .topbar .accent{background:var(--grad-brand);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:700;}`;

html = html.replace(oldTopbarCssRegex, newTopbarCss);

// 3. Update header CSS
const oldHeaderCssRegex = /header\.site\{[\s\S]*?\.navlink\.deals:hover\{[^}]+\}/;
const newHeaderCss = `header.site{
    position:sticky;top:0;z-index:40;background:#fff;
    border-bottom:1px solid var(--gray-100);width:100%;
  }
  .header-row{
    display:flex;align-items:center;justify-content:space-between;
    gap:clamp(16px, 2.5vw, 40px);
    padding:16px clamp(20px, 3.5vw, 64px);
    width:100%;max-width:1820px;margin:0 auto;
  }
  .logo{display:flex;align-items:center;gap:10px;flex:none;}
  .logo-mark{width:38px;height:38px;flex:none;}
  .logo-word{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;line-height:1;}
  .logo-word .c1{color:var(--blue);}
  .logo-word .c2{color:var(--navy);}
  .logo-sub{font-size:9px;letter-spacing:0.14em;color:var(--gray-400);font-weight:600;margin-top:2px;}

  .search-bar{
    flex:1;display:flex;align-items:center;background:var(--gray-50);
    border:1.5px solid var(--gray-100);border-radius:100px;padding:4px 6px 4px 20px;
    transition:.15s;max-width:760px;width:100%;
  }
  .search-bar:focus-within{border-color:var(--blue-light);background:#fff;box-shadow:0 0 0 4px rgba(63,169,255,0.12);}
  .search-bar input{
    flex:1;border:none;background:transparent;font-size:14px;padding:8px 0;font-family:inherit;color:var(--navy);
  }
  .search-bar input:focus{outline:none;}
  .search-bar input::placeholder{color:var(--gray-400);}
  .search-btn{
    background:var(--navy);color:#fff;width:36px;height:36px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;flex:none;transition:.15s;
  }
  .search-btn:hover{background:var(--blue);}
  .search-btn svg{width:16px;height:16px;}

  .header-actions{display:flex;align-items:center;gap:26px;flex:none;}
  .h-action{display:flex;flex-direction:column;align-items:center;gap:2px;position:relative;color:var(--navy-2);}
  .h-action svg{width:21px;height:21px;}
  .h-action span{font-size:11px;font-weight:600;color:var(--gray-700);}
  .h-action:hover{color:var(--blue);}
  .h-action:hover span{color:var(--blue);}
  .cart-count{
    position:absolute;top:-6px;right:-9px;background:var(--red);color:#fff;
    font-size:10px;font-weight:700;width:17px;height:17px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;
  }

  nav.mainnav{border-top:1px solid var(--gray-100);width:100%;}
  .navrow{
    display:flex;align-items:center;gap:clamp(4px, 1.2vw, 16px);
    padding:0 clamp(20px, 3.5vw, 64px);
    width:100%;max-width:1820px;margin:0 auto;
  }
  .navcat{
    display:flex;align-items:center;gap:8px;background:var(--navy);color:#fff;
    font-size:13.5px;font-weight:600;padding:13px 20px;border-radius:0;flex:none;
  }
  .navcat svg{width:15px;height:15px;}
  .navlink{
    font-size:13.5px;font-weight:600;color:var(--navy-2);padding:13px 14px;
    border-bottom:2.5px solid transparent;transition:.15s;white-space:nowrap;
  }
  .navlink:hover{color:var(--blue);border-color:var(--blue-light);}
  .navlink.deals{color:var(--red);}
  .navlink.deals:hover{color:var(--red);border-color:var(--red);}`;

html = html.replace(oldHeaderCssRegex, newHeaderCss);

// 4. Update Header HTML to remove restrictive wrap constraints
html = html.replace(
  '<div class="header-row wrap" style="padding-left:0;padding-right:0;">',
  '<div class="header-row">'
);

html = html.replace(
  '<div class="navrow wrap" style="padding-left:0;padding-right:0;">',
  '<div class="navrow">'
);

// 5. Update topbar HTML
html = html.replace(
  '<div class="topbar">\n  <div class="wrap">',
  '<div class="topbar">\n  <div class="topbar-inner">'
);
html = html.replace(
  '<div class="topbar">\r\n  <div class="wrap">',
  '<div class="topbar">\r\n  <div class="topbar-inner">'
);

fs.writeFileSync('CellCentral_Prototype.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated header expansion for larger screens');
