<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Personal Portfolio — README</title>
  <style>
    :root{
      --bg1: linear-gradient(135deg,#061423 0%, #0b2a3a 40%, #08222e 100%);
      --glass: rgba(255,255,255,0.06);
      --glass-2: rgba(255,255,255,0.04);
      --accent: #00b383;
      --muted: #a6c0bf;
      --card-radius: 16px;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace;
      --sans: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family:var(--sans);
      background:var(--bg1);
      color: #e9f3f2;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
      line-height:1.45;
      padding:48px 32px;
      display:flex;align-items:center;justify-content:center;
    }

    .wrap{
      width:100%;max-width:1100px;
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border-radius:20px;
      padding:36px;
      box-shadow: 0 10px 40px rgba(2,12,22,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.04);
      backdrop-filter: blur(6px) saturate(120%);
    }

    header{display:flex;align-items:center;gap:20px;margin-bottom:18px}
    .logo{
      width:86px;height:86px;border-radius:14px;background:linear-gradient(135deg,#072e2a,#003b35);
      display:flex;align-items:center;justify-content:center;font-weight:700;font-size:22px;color:var(--accent);
      box-shadow: 0 6px 18px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.02) inset;
    }
    h1{font-size:28px;margin:0}
    p.lead{margin:4px 0 0;color:var(--muted)}

    .grid{display:grid;grid-template-columns:1fr 360px;gap:20px;margin-top:22px}

    /* main card */
    .content{padding:18px}
    .kicker{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(0,0,0,0.18);color:var(--accent);font-weight:600;font-size:13px}
    .section{margin-top:18px}
    .section h2{margin:0 0 10px;font-size:16px}
    .feature-list{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .feature{background:linear-gradient(180deg,var(--glass),var(--glass-2));padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.03);}
    .feature strong{display:block;color:#dff7f0}
    .feature p{margin:6px 0 0;color:var(--muted);font-size:13px}

    /* code block */
    pre{background:rgba(2,12,18,0.4);padding:14px;border-radius:12px;overflow:auto;border:1px solid rgba(255,255,255,0.03);}
    code{font-family:var(--mono);font-size:13px;color:#dff7f0}

    /* side card */
    .side{display:flex;flex-direction:column;gap:14px}
    .card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.03)}
    .badges{display:flex;gap:8px;flex-wrap:wrap}
    .badge{font-size:12px;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.03);color:var(--muted);border:1px solid rgba(255,255,255,0.02)}

    .cta{display:flex;gap:10px;margin-top:12px}
    .btn{flex:1;padding:10px 12px;border-radius:10px;text-align:center;font-weight:700;cursor:pointer;border:1px solid rgba(255,255,255,0.04);background:linear-gradient(90deg,var(--accent),#29d7a8);color:#042621}
    .btn.ghost{background:transparent;color:var(--accent);border:1px dashed rgba(0,179,131,0.22)}

    footer{margin-top:18px;color:var(--muted);font-size:13px}

    /* small screen */
    @media (max-width:920px){
      .grid{grid-template-columns:1fr;}
      .side{order:-1}
      body{padding:20px}
    }

    /* subtle animations */
    .logo, .feature, .card{transform:translateY(6px);opacity:0;animation:pop .6s forwards ease-out}
    .logo{animation-delay:.05s}
    .card{animation-delay:.12s}
    .feature{animation-delay:.18s}
    @keyframes pop{to{transform:none;opacity:1}}

    .sparkle{position:relative}
    .sparkle:after{content:'';position:absolute;right:-18px;top:-18px;width:18px;height:18px;border-radius:6px;background:linear-gradient(135deg,#6ff8d4, #00b383);filter:blur(6px);opacity:0.9;transform:rotate(25deg)}

  </style>
</head>
<body>
  <div class="wrap" role="main">
    <header>
      <div class="logo">KY</div>
      <div>
        <h1>Personal Portfolio — README</h1>
        <p class="lead">A clean, modern portfolio built with HTML, CSS and JavaScript. This README shows what the project is, how to run it, and why it looks so good.</p>
      </div>
    </header>

    <div class="grid">
      <main class="content">
        <span class="kicker">Portfolio</span>

        <div class="section">
          <h2>About this project</h2>
          <p>Simple, responsive personal portfolio showcasing projects, skills and contact details. Built as a single-page static site so deployment is instant — drop it into GitHub Pages or any static host.</p>
        </div>

        <div class="section">
          <h2>Highlights</h2>
          <div class="feature-list">
            <div class="feature">
              <strong>Responsive layout</strong>
              <p>Looks great on phones, tablets and desktops.</p>
            </div>
            <div class="feature">
              <strong>Clean code</strong>
              <p>Readable HTML, organized CSS, and lightweight JS.</p>
            </div>
            <div class="feature">
              <strong>CSS animations</strong>
              <p>Subtle motion for polish without distraction.</p>
            </div>
            <div class="feature">
              <strong>Easy to customize</strong>
              <p>Swap colors, fonts, and images in under 5 minutes.</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Quick start</h2>
          <p>Clone the repo, open <code>index.html</code> in a browser, and you're done. For local development use Live Server or any static HTTP server.</p>

          <pre><code>git clone https://github.com/KISHAN-Y/Personal_Portfolio.git
cd Personal_Portfolio
# open index.html in your browser or run a local server
</code></pre>
        </div>

        <div class="section">
          <h2>Structure</h2>
          <pre><code>├─ index.html
├─ css/
│  └─ main.css
├─ js/
│  └─ main.js
└─ images/
</code></pre>
        </div>

        <div class="section">
          <h2>How to edit</h2>
          <p>Edit HTML sections in <code>index.html</code>. Global styles are in <code>css/</code>. Images live in <code>images/</code>. No build step required.</p>
        </div>

        <footer>
          <div>Made by <strong>Kishan Yadav</strong>. Need a hand customizing this README or the site? Open an issue or contact via the repository.</div>
        </footer>
      </main>

      <aside class="side">
        <div class="card sparkle">
          <h3 style="margin:0 0 8px">Project info</h3>
          <div class="badges">
            <span class="badge">HTML</span>
            <span class="badge">CSS</span>
            <span class="badge">JavaScript</span>
            <span class="badge">Static</span>
          </div>

          <div style="margin-top:12px;font-size:13px;color:var(--muted)">
            <div><strong>Live preview</strong></div>
            <div>Host on GitHub Pages for a live site in seconds.</div>
          </div>

          <div class="cta">
            <a class="btn" href="#">Preview</a>
            <a class="btn ghost" href="#">Clone</a>
          </div>
        </div>

        <div class="card">
          <h3 style="margin:0 0 8px">Dev tips</h3>
          <ul style="margin:0;padding-left:18px;color:var(--muted)">
            <li>Use semantic HTML for better accessibility.</li>
            <li>Keep images optimized (webp if possible).</li>
            <li>Use Live Server for rapid edits.</li>
          </ul>
        </div>

      </aside>

    </div>
  </div>
</body>
</html>
