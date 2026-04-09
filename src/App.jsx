import { useState, useEffect, useRef } from "react";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Satoshi:wght@400;500;700&display=swap";

// ── LOGO SIZES ──────────────────────────────────────────
// Change these values to resize logos independently (in pixels).
const NAV_LOGO_HEIGHT = 50;
const FOOTER_LOGO_HEIGHT = 50;
// ─────────────────────────────────────────────────────────

const C = {
  bg: "#FAFAF7",
  bgDark: "#0C0F0A",
  surface: "#F0EDE6",
  surfaceDark: "#161A13",
  accent: "#C4A24E",
  accentLight: "#D4B86A",
  text: "#1A1D17",
  muted: "#6B6F65",
  light: "#E8E5DD",
  lightMuted: "#9A9D94",
  border: "#D8D5CC",
  white: "#FFFFFF",
};

const injectStyles = () => {
  if (document.getElementById("ds")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FONT_LINK;
  document.head.appendChild(link);
  const s = document.createElement("style");
  s.id = "ds";
  s.textContent = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
    body{font-family:'Satoshi',sans-serif;background:${C.bg};color:${C.text};overflow-x:hidden}
    .sf{font-family:'Instrument Serif',Georgia,serif}
    .rv{opacity:0;transform:translateY(32px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
    .rv.v{opacity:1;transform:translateY(0)}
    .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}
    @keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .mq-track{display:flex;animation:mq 28s linear infinite}
    .mq-track:hover{animation-play-state:paused}
    .nav-s{background:rgba(250,250,247,.88);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid ${C.border}}
    .bp{background:${C.accent};color:${C.bgDark};transition:all .3s ease}
    .bp:hover{background:${C.accentLight};transform:translateY(-1px);box-shadow:0 4px 20px rgba(196,162,78,.3)}
    .pc{transition:all .4s cubic-bezier(.16,1,.3,1)}
    .pc:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,.08)}
    .pc:hover .cn{color:${C.accent}}
    .pc:hover .ca{transform:translate(4px,-4px)}
    .ca{transition:transform .3s ease}
    .iz{overflow:hidden}.iz img{transition:transform .6s cubic-bezier(.16,1,.3,1)}.iz:hover img{transform:scale(1.05)}
    .mm{transform:translateX(100%);transition:transform .4s cubic-bezier(.16,1,.3,1)}.mm.open{transform:translateX(0)}
    a:focus-visible,button:focus-visible{outline:2px solid ${C.accent};outline-offset:2px;border-radius:2px}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
    @media(max-width:900px){.g2{grid-template-columns:1fr!important;gap:48px!important}}
    @media(max-width:768px){.dn{display:none!important}.mb{display:block!important}}
  `;
  document.head.appendChild(s);
};

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("v"); obs.unobserve(el); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function R({ children, cls = "", d = 0 }) {
  const ref = useReveal();
  return <div ref={ref} className={`rv ${d ? `d${d}` : ""} ${cls}`}>{children}</div>;
}

const NAV = [
  { label: "About", href: "#about" },
  { label: "What We Grow", href: "#produce" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "12px 0", transition: "all .3s ease" }} className="nav-s">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/logo-medium.png" alt="Debis Farms" style={{ height: NAV_LOGO_HEIGHT }} />
          </a>
          <div className="dn" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {NAV.map(n => (
              <a key={n.label} href={n.href} style={{ textDecoration: "none", fontSize: 13, fontWeight: 500, color: C.muted, letterSpacing: ".02em", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>{n.label}</a>
            ))}
            <a href="#contact" className="bp" style={{ textDecoration: "none", padding: "10px 24px", borderRadius: 4, fontSize: 13, fontWeight: 600 }}>Get In Touch</a>
          </div>
          <button className="mb" onClick={() => setOpen(true)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>
      <div
        className={`mm ${open ? "open" : ""}`}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: C.bg,
          display: "flex",
          flexDirection: "column",
          padding: 32,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .4s cubic-bezier(.16,1,.3,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src="/logo-medium.png" alt="Debis Farms" style={{ height: NAV_LOGO_HEIGHT }} />
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }}>
          {NAV.map(n => <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="sf" style={{ textDecoration: "none", fontSize: 40, color: C.text }}>{n.label}</a>)}
        </div>
        <a href="#contact" onClick={() => setOpen(false)} className="bp" style={{ textDecoration: "none", padding: "16px 32px", borderRadius: 4, fontSize: 15, fontWeight: 600, textAlign: "center", display: "block" }}>CONTACT US</a>
      </div>
    </>
  );
}

function Hero() {
  const [ok, setOk] = useState(false);
  useEffect(() => { setTimeout(() => setOk(true), 100); }, []);
  const t = (delay) => ({ opacity: ok ? 1 : 0, transform: ok ? "translateY(0)" : "translateY(24px)", transition: `all .8s cubic-bezier(.16,1,.3,1) ${delay}` });

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden", background: C.bgDark }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,15,10,.95) 0%, rgba(12,15,10,.4) 50%, rgba(12,15,10,.65) 100%)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 32px 80px", width: "100%" }}>
        <div style={{ ...t(".2s"), display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 40, height: 1, background: C.accent }} />
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.accent }}>Cultivating Nigeria's Future</span>
        </div>
        <h1 className="sf" style={{ fontSize: "clamp(42px,7vw,88px)", lineHeight: 1.02, color: C.light, maxWidth: 900, letterSpacing: "-.025em", ...t(".4s") }}>
          From Soil <em style={{ color: C.accent, fontStyle: "italic" }}>to Scale</em>
        </h1>
        <p style={{ fontSize: "clamp(16px,1.6vw,20px)", lineHeight: 1.6, color: C.lightMuted, maxWidth: 520, marginTop: 24, ...t(".6s") }}>
          Debis Farms Nigeria Limited is building one of the most trusted agricultural operations in West Africa — rooted in precision, powered by ambition.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap", ...t(".8s") }}>
          <a href="#about" className="bp" style={{ textDecoration: "none", padding: "14px 32px", borderRadius: 4, fontSize: 14, fontWeight: 600 }}>Our Story</a>
          <a href="#produce" style={{ textDecoration: "none", padding: "14px 32px", borderRadius: 4, fontSize: 14, fontWeight: 500, color: C.light, border: "1px solid rgba(232,229,221,.2)", transition: "all .3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(196,162,78,.5)"; e.currentTarget.style.color = C.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(232,229,221,.2)"; e.currentTarget.style.color = C.light; }}>Explore Produce</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 32, marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(232,229,221,.1)", maxWidth: 600, ...t("1s") }}>
          {[{ v: "5,000+", l: "Hectares Cultivated" }, { v: "12", l: "Crop Varieties" }, { v: "200+", l: "Jobs Created" }].map(s => (
            <div key={s.l}><div className="sf" style={{ fontSize: 32, color: C.light, letterSpacing: "-.02em" }}>{s.v}</div><div style={{ fontSize: 12, color: C.lightMuted, marginTop: 4 }}>{s.l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: ok ? .4 : 0, transition: "opacity 1s ease 1.2s" }}>
        <span style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: C.lightMuted }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom,${C.lightMuted},transparent)` }} />
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Premium Quality", "Sustainable Farming", "West African Heritage", "Precision Agriculture", "From Farm to Market", "Building Communities"];
  const d = [...items, ...items];
  return (
    <div style={{ background: C.accent, padding: "14px 0", overflow: "hidden" }}>
      <div className="mq-track" style={{ whiteSpace: "nowrap" }}>
        {d.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 32, marginRight: 32 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: C.bgDark }}>{t}</span>
            <span style={{ fontSize: 8, color: C.bgDark, opacity: .4 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Eyebrow({ text }) {
  return (
    <R>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 32, height: 1, background: C.accent }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.accent }}>{text}</span>
      </div>
    </R>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "120px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <R>
          <div style={{ position: "relative" }}>
            <div className="iz" style={{ borderRadius: 4, aspectRatio: "4/5" }}>
              <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80" alt="Farmer in field" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }} />
            </div>
            <div style={{ position: "absolute", bottom: -24, right: -24, background: C.bgDark, padding: "24px 28px", borderRadius: 4, maxWidth: 220 }}>
              <div className="sf" style={{ fontSize: 36, color: C.accent }}>15+</div>
              <div style={{ fontSize: 13, color: C.lightMuted, marginTop: 4, lineHeight: 1.5 }}>Years of agricultural excellence in Nigeria</div>
            </div>
          </div>
        </R>
        <div>
          <Eyebrow text="About Us" />
          <R d={1}><h2 className="sf" style={{ fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>Built on the land, <em style={{ color: C.accent }}>driven by purpose</em></h2></R>
          <R d={2}><p style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, marginTop: 24 }}>Debis Farms Nigeria Limited is a diversified agricultural enterprise with operations spanning crop cultivation, processing, and distribution across Nigeria. We combine deep local knowledge with modern farming techniques to deliver consistent, high-quality produce at scale.</p></R>
          <R d={3}><p style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, marginTop: 16 }}>Our mission is straightforward: feed communities, create opportunity, and steward the land responsibly for the next generation.</p></R>
          <R d={4}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 40 }}>
              {[{ l: "Crop Cultivation", d: "Large-scale farming across key food staples" }, { l: "Processing", d: "Post-harvest handling and value addition" }, { l: "Distribution", d: "Direct-to-market supply chain operations" }, { l: "Community", d: "Employment and local economic development" }].map(i => (
                <div key={i.l} style={{ paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{i.l}</div>
                  <div style={{ fontSize: 13, color: C.muted, marginTop: 4, lineHeight: 1.5 }}>{i.d}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

const PRODUCE = [
  { name: "Cassava", desc: "Premium-grade cassava supplying processors and food manufacturers across the region.", cat: "Staple" },
  { name: "Maize", desc: "High-yield hybrid varieties harvested at peak season for feed, flour, and industrial applications.", cat: "Cash Crop" },
  { name: "Soybean", desc: "Protein-rich soybean cultivated for domestic consumption and West African export markets.", cat: "Export" },
  { name: "Yam", desc: "Heritage-variety yam grown with traditional knowledge and modern precision agriculture.", cat: "Heritage" },
  { name: "Palm Produce", desc: "Sustainably harvested palm fruit and oil from managed plantations.", cat: "Plantation" },
  { name: "Vegetables", desc: "Seasonal vegetable farming serving local markets with fresh, quality produce year-round.", cat: "Market" },
];

function ProduceSection() {
  return (
    <section id="produce" style={{ background: C.surface, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div><Eyebrow text="Our Produce" /><R d={1}><h2 className="sf" style={{ fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>What we <em style={{ color: C.accent }}>grow</em></h2></R></div>
          <R d={2}><p style={{ fontSize: 15, color: C.muted, maxWidth: 400, lineHeight: 1.7 }}>Six core crop lines cultivated with precision and care — from soil preparation through harvest and distribution.</p></R>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 20, marginTop: 56 }}>
          {PRODUCE.map((p, i) => (
            <R key={p.name} d={Math.min(i + 1, 5)}>
              <div className="pc" style={{ background: C.white, borderRadius: 6, padding: "36px 32px", border: `1px solid ${C.border}`, cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="cn" style={{ fontSize: 13, fontWeight: 700, color: C.border, fontFamily: "monospace", transition: "color .3s" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.muted, background: C.surface, padding: "4px 10px", borderRadius: 2 }}>{p.cat}</span>
                </div>
                <h3 className="sf" style={{ fontSize: 28, marginTop: 20, letterSpacing: "-.02em" }}>{p.name}</h3>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginTop: 12, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 24, color: C.accent, fontSize: 13, fontWeight: 600 }}>
                  <span>Learn more</span>
                  <svg className="ca" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="13" x2="13" y2="1"/><polyline points="4,1 13,1 13,10"/></svg>
                </div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section id="impact" style={{ background: C.bgDark, padding: "120px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 500, background: "radial-gradient(circle,rgba(196,162,78,.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <Eyebrow text="Our Impact" />
            <R d={1}><h2 className="sf" style={{ fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.1, letterSpacing: "-.025em", color: C.light }}>Agriculture is more than <em style={{ color: C.accent }}>farming</em></h2></R>
            <R d={2}><p style={{ fontSize: 16, lineHeight: 1.8, color: C.lightMuted, marginTop: 24 }}>We see agriculture as infrastructure — the foundation on which food security, economic mobility, and community resilience are built. Every hectare we cultivate strengthens that foundation.</p></R>
            <R d={3}>
              <blockquote className="sf" style={{ fontSize: 22, lineHeight: 1.5, fontStyle: "italic", color: C.accent, marginTop: 40, paddingLeft: 24, borderLeft: `2px solid ${C.accent}` }}>
                "When the soil thrives, everything above it does too."
              </blockquote>
            </R>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {[{ m: "5,000+", l: "Hectares under active cultivation across multiple Nigerian states" }, { m: "200+", l: "Direct and indirect employment opportunities created" }, { m: "3", l: "Processing and distribution centres operational" }, { m: "100%", l: "Commitment to sustainable farming practices" }].map((item, i) => (
              <R key={item.m} d={Math.min(i + 1, 5)}>
                <div style={{ padding: "28px 0", borderBottom: i < 3 ? "1px solid rgba(232,229,221,.1)" : "none", display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, alignItems: "baseline" }}>
                  <div className="sf" style={{ fontSize: 32, color: C.accent }}>{item.m}</div>
                  <div style={{ fontSize: 14, color: C.lightMuted, lineHeight: 1.6 }}>{item.l}</div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" style={{ padding: "120px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
        <div>
          <Eyebrow text="Contact" />
          <R d={1}><h2 className="sf" style={{ fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>Let's <em style={{ color: C.accent }}>talk</em></h2></R>
          <R d={2}><p style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, marginTop: 24 }}>Reach out for business enquiries, partnership opportunities, or to learn more about our operations.</p></R>
          <R d={3}>
            <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
              <div><div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>Email</div><div style={{ fontSize: 16, color: C.text }}>info@debisfarms.ng</div></div>
              <div><div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>WhatsApp</div><a href="https://wa.me/2348130680144" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#25D366", fontSize: 16, fontWeight: 500, transition: "opacity .2s" }} onMouseEnter={e => e.currentTarget.style.opacity = ".7"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}><svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg><span>Chat with us</span></a></div>
              <div><div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>Location</div><div style={{ fontSize: 16, color: C.text }}>Lagos, Nigeria</div></div>
            </div>
          </R>
        </div>
        <R d={2}>
          <div style={{ background: C.surface, borderRadius: 6, padding: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[{ l: "Full Name", p: "Your full name", t: "text" }, { l: "Email Address", p: "your@email.com", t: "email" }, { l: "Company", p: "Company or organisation", t: "text" }].map(f => (
                <div key={f.l}>
                  <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: 8 }}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 4, fontSize: 15, background: C.white, color: C.text, outline: "none", fontFamily: "'Satoshi',sans-serif" }}
                    onFocus={e => e.currentTarget.style.borderColor = C.accent} onBlur={e => e.currentTarget.style.borderColor = C.border} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: 8 }}>Message</label>
                <textarea rows={4} placeholder="Tell us about your enquiry..." style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 4, fontSize: 15, background: C.white, color: C.text, outline: "none", resize: "vertical", fontFamily: "'Satoshi',sans-serif" }}
                  onFocus={e => e.currentTarget.style.borderColor = C.accent} onBlur={e => e.currentTarget.style.borderColor = C.border} />
              </div>
              <button className="bp" style={{ padding: "14px 32px", borderRadius: 4, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", marginTop: 8 }}>Send Enquiry</button>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#2A2D26", padding: "64px 32px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, paddingBottom: 40, borderBottom: "1px solid rgba(232,229,221,.1)" }}>
          <div>
            <img src="/logo-medium.png" alt="Debis Farms" style={{ height: FOOTER_LOGO_HEIGHT, marginBottom: 12 }} />
            <p style={{ fontSize: 14, color: C.lightMuted, marginTop: 0, maxWidth: 280, lineHeight: 1.6 }}>Cultivating excellence across Nigeria, one harvest at a time.</p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[{ h: "Company", links: ["About", "Produce", "Impact", "Contact"] }, { h: "Connect", links: ["LinkedIn", "Instagram", "Twitter"] }].map(g => (
              <div key={g.h}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: C.lightMuted, marginBottom: 16 }}>{g.h}</div>
                {g.links.map(l => <a key={l} href={`#${l.toLowerCase()}`} style={{ display: "block", textDecoration: "none", fontSize: 14, color: C.lightMuted, marginBottom: 10, transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.accent} onMouseLeave={e => e.currentTarget.style.color = C.lightMuted}>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontSize: 12, color: C.lightMuted }}>© 2026 Debis Farms Nigeria Limited. All rights reserved.</span>
          <span style={{ fontSize: 12, color: C.lightMuted }}>Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => { injectStyles(); }, []);
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <ProduceSection />
      <ImpactSection />
      <section style={{ padding: "80px 32px", background: C.bg }}>
        <R>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <h2 className="sf" style={{ fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 1.15, letterSpacing: "-.025em" }}>Interested in partnering with us?</h2>
            <p style={{ fontSize: 16, color: C.muted, marginTop: 16, lineHeight: 1.7, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>Whether you're a buyer, distributor, or potential investor — we'd like to hear from you.</p>
            <div style={{ marginTop: 32 }}><a href="#contact" className="bp" style={{ textDecoration: "none", padding: "14px 36px", borderRadius: 4, fontSize: 14, fontWeight: 600, display: "inline-block" }}>Contact Us</a></div>
          </div>
        </R>
      </section>
      <ContactSection />
      <Footer />
    </>
  );
}
