(function () {
  const C = window.CSG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Íconos (SVG en línea, sin dependencias) ---------- */
  const P = {
    check: '<path d="M5 12l5 5L20 7"/>',
    cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>',
    heart: '<path d="M19.5 12.6L12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6z"/>',
    flower: '<circle cx="12" cy="9" r="2.5"/><path d="M12 11.5V21M12 6.5a3 3 0 1 0-3 3M12 6.5a3 3 0 1 1 3 3M9 9.5a3 3 0 1 0 3 2M15 9.5a3 3 0 1 1-3 2M12 17c-2 0-4-1-5-3M12 17c2 0 4-1 5-3"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    bag: '<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    send: '<path d="M4 12l16-8-6 16-2-7-8-1z"/>',
    wa: '<path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2L9 9.5z"/>'
  };
  const icon = (n, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ""}</svg>`;
  window.CSGicon = icon;

  const colones = n => "₡" + Math.round(n).toLocaleString("es-CR");

  /* ---------- Origen de la visita ----------
     Guarda de dónde viene la persona (campaña, red o búsqueda) durante 30 días
     y lo agrega al mensaje de WhatsApp como "Ref: ...". Así cada solicitud
     llega con su origen y se puede conciliar con los desembolsos. */
  const ORIGEN_KEY = "csg_origen", ORIGEN_DIAS = 30;
  const origen = (() => {
    const q = new URLSearchParams(location.search);
    const limpio = v => (v || "").toLowerCase().replace(/[^a-z0-9._-]+/g, "-").slice(0, 40);
    let nuevo = null;
    if (q.get("utm_source")) {
      nuevo = { fuente: limpio(q.get("utm_source")), medio: limpio(q.get("utm_medium")), campana: limpio(q.get("utm_campaign")) };
    } else if (q.get("gclid")) nuevo = { fuente: "google", medio: "cpc", campana: "" };
    else if (q.get("fbclid")) nuevo = { fuente: "meta", medio: "social", campana: "" };
    else if (q.get("ttclid")) nuevo = { fuente: "tiktok", medio: "cpc", campana: "" };
    else if (document.referrer) {
      try {
        const h = new URL(document.referrer).hostname.replace(/^www\./, "");
        if (h && h !== location.hostname.replace(/^www\./, "")) {
          const buscador = /google\.|bing\.|yahoo\.|duckduckgo\./.test(h);
          const red = /facebook\.|instagram\.|tiktok\.|t\.co$|twitter\.|x\.com|youtube\.|linkedin\./.test(h);
          nuevo = { fuente: h.split(".").slice(-2, -1)[0] || h, medio: buscador ? "organico" : red ? "social" : "referido", campana: "" };
        }
      } catch (e) {}
    }
    let guardado = null;
    try { guardado = JSON.parse(localStorage.getItem(ORIGEN_KEY) || "null"); } catch (e) {}
    if (guardado && Date.now() - guardado.t > ORIGEN_DIAS * 864e5) guardado = null;
    const o = nuevo || (guardado && guardado.o) || { fuente: "directo", medio: "", campana: "" };
    if (nuevo) { try { localStorage.setItem(ORIGEN_KEY, JSON.stringify({ o: nuevo, t: Date.now() })); } catch (e) {} }
    o.ref = [o.fuente, o.campana || o.medio].filter(Boolean).join("/");
    return o;
  })();
  window.CSGorigen = origen;

  /* ---------- WhatsApp ---------- */
  const waLink = msg => `https://wa.me/${C.contacto.whatsapp}?text=${encodeURIComponent(msg + "\n\nRef: " + origen.ref)}`;
  window.CSGwa = waLink;

  /* ---------- Header ---------- */
  const here = "";
  const links = [
    ["#credicash", "CrédiCash"],
    ["#proteccion", "Protección"],
    ["#tiendita", "Tiendita"],
    ["#nosotros", "Nosotros"],
    ["#contacto", "Contacto"]
  ];
  const header = $("#site-header");
  if (header) {
    header.className = "header";
    header.innerHTML = `
      <div class="container header__in">
        <a class="logo" href="#inicio" aria-label="${C.nombreCorto}, inicio">
          <img src="${C.logo}" alt="${C.nombre}">
        </a>
        <button class="nav__toggle" aria-expanded="false" aria-controls="nav" aria-label="Abrir menú">${icon("menu")}</button>
        <nav class="nav" id="nav" aria-label="Principal">
          ${links.map(([h, t, ext]) => `<a href="${h}"${ext ? ' target="_blank" rel="noopener"' : ""}${here === h ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
          <a class="btn btn--sm" href="${C.enlaces.estadoCuenta}" target="_blank" rel="noopener">${icon("user", "icon--sm")} Mi estado de cuenta</a>
        </nav>
      </div>`;
    const t = $(".nav__toggle", header), nav = $("#nav", header);
    nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("is-open"); t.setAttribute("aria-expanded", false); } });
    t.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      t.setAttribute("aria-expanded", open);
      t.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
  }

  /* ---------- Footer ---------- */
  const footer = $("#site-footer");
  if (footer) {
    const k = C.contacto;
    const item = (ic, txt, href) => txt ? `<li style="display:flex;gap:8px;align-items:flex-start">${icon(ic, "icon--sm")}${href ? `<a href="${href}">${txt}</a>` : `<span>${txt}</span>`}</li>` : "";
    footer.className = "footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer__grid">
          <div>
            <a class="logo" href="#inicio"><img src="${C.logo}" alt="${C.nombre}" style="height:72px;background:#fff;border-radius:12px;padding:6px 10px"></a>
            <p style="margin-top:14px">Crédito, protección y compras para funcionarios públicos desde ${C.fundacion}. Afiliada a FECOSER.</p>
          </div>
          <div><h3>Servicios</h3><ul>
            <li><a href="#credicash">CrédiCash</a></li>
            <li><a href="#proteccion">Planes de protección</a></li>
            <li><a href="#tiendita">Tiendita CSG</a></li>
            <li><a href="${C.enlaces.estadoCuenta}" target="_blank" rel="noopener">Estado de cuenta</a></li>
          </ul></div>
          <div><h3>Contacto</h3><ul>
            ${item("wa", "WhatsApp " + k.whatsappVisible, waLink("Hola, quiero información."))}
            ${item("phone", k.telefono, k.telefono ? "tel:+506" + k.telefono.replace(/\D/g, "") : "")}
            ${item("mail", k.correo, k.correo ? "mailto:" + k.correo : "")}
            ${item("pin", k.direccion, k.mapaUrl)}
            ${item("clock", k.horario)}
          </ul></div>
          <div><h3>Seguinos</h3><ul>
            <li><a href="${C.enlaces.facebook}" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="${C.enlaces.instagram}" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="${C.enlaces.youtube}" target="_blank" rel="noopener">YouTube</a></li>
          </ul></div>
        </div>
        <div class="footer__legal">
          <p>ADVERTENCIA: Se advierte al público que la Cooperativa de Servicios Múltiples San Gabriel R.L. es supervisada solamente en materia de prevención de legitimación de capitales, financiamiento al terrorismo y financiamiento de la proliferación de armas de destrucción masiva, y además se encuentra sujeta a disposiciones vinculantes de la Unidad de Inteligencia Financiera del Instituto Costarricense sobre Drogas. Por lo tanto, la SUGEF no supervisa en materia financiera a Coopesangabriel R.L., ni los negocios que ofrece, ni su seguridad, estabilidad o solvencia.</p>
          <div class="footer__bottom"><p style="margin:0">© ${new Date().getFullYear()} ${C.nombre} Todos los derechos reservados.</p>
          <p style="margin:0">Desarrollado por <a href="https://www.ariatechcr.co" target="_blank" rel="noopener">Aria Martech Studio</a></p></div>
        </div>
      </div>`;
  }

  /* ---------- Calculadora CrédiCash ---------- */
  function cuota(monto, meses, tasaAnual) {
    const r = tasaAnual / 100 / 12;
    if (!r) return monto / meses;
    return monto * r / (1 - Math.pow(1 + r, -meses));
  }
  function fill(el) {
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.setProperty("--pct", pct + "%");
  }
  $$("[data-calc]").forEach(box => {
    const cc = C.credicash;
    const m = $("[data-monto]", box), p = $("[data-plazo]", box);
    m.min = cc.montoMinimo; m.max = cc.montoMaximo; m.step = 10000;
    m.value = Math.min(Math.max(400000, cc.montoMinimo), cc.montoMaximo);
    p.min = cc.plazoMinimo; p.max = cc.plazoMaximo; p.step = cc.pasoPlazo;
    p.value = Math.min(Math.max(24, cc.plazoMinimo), cc.plazoMaximo);
    $$("[data-min]", box).forEach(e => e.textContent = colones(cc.montoMinimo));
    $$("[data-max]", box).forEach(e => e.textContent = colones(cc.montoMaximo));
    $$("[data-pmin]", box).forEach(e => e.textContent = cc.plazoMinimo + " meses");
    $$("[data-pmax]", box).forEach(e => e.textContent = cc.plazoMaximo + " meses");
    const out = {
      m: $("[data-out-monto]", box), p: $("[data-out-plazo]", box), c: $("[data-out-cuota]", box)
    };
    const btn = $("[data-solicitar]", box);
    function update() {
      const monto = +m.value, meses = +p.value, q = cuota(monto, meses, cc.tasaAnual);
      out.m.textContent = colones(monto);
      out.p.textContent = meses + " meses";
      out.c.textContent = colones(q);
      fill(m); fill(p);
      const msg = `Hola, quiero solicitar CrédiCash por ${colones(monto)} a ${meses} meses.`;
      btn.href = waLink(msg);
      $$("[data-sync-monto]").forEach(e => e.textContent = colones(monto));
      $$("[data-mobile-cta]").forEach(a => { a.href = waLink(msg); const s = $("[data-mobile-monto]", a); if (s) s.textContent = colones(monto); });
    }
    m.addEventListener("input", update); p.addEventListener("input", update);
    update();
  });

  /* ---------- Textos dinámicos ---------- */
  $$("[data-max-text]").forEach(e => e.textContent = colones(C.credicash.montoMaximo));
  $$("[data-plazo-max-text]").forEach(e => e.textContent = C.credicash.plazoMaximo + " meses");
  $$("[data-tasa-text]").forEach(e => e.textContent = C.credicash.mostrarTasa ? C.credicash.tasaAnual + "%" : "Consultá");
  $$("[data-desembolso-text]").forEach(e => e.textContent = C.credicash.desembolso);
  $$("[data-icon]").forEach(e => e.innerHTML = icon(e.dataset.icon, e.dataset.iconClass || ""));
  $$("[data-wa]").forEach(a => a.href = waLink(a.dataset.wa));
  $$("[data-estado-cuenta]").forEach(a => a.href = C.enlaces.estadoCuenta);
  $$("[data-tiendita]").forEach(a => a.href = C.enlaces.tiendita);

  /* ---------- Requisitos ---------- */
  $$("[data-requisitos]").forEach(ul => {
    ul.innerHTML = C.credicash.requisitos.map(r => `<li>${icon("check")}<span>${r}</span></li>`).join("");
  });

  /* ---------- Planes (tabla) ---------- */
  $$("[data-planes-tabla]").forEach(t => {
    const pl = C.planes;
    const row = (label, key) => `<tr><th scope="row">${label}</th>${pl.map(x => `<td>${x[key]}</td>`).join("")}</tr>`;
    t.innerHTML = `
      <thead><tr><th scope="col"><span class="sr-only">Característica</span></th>${pl.map(x => `<th scope="col">${x.nombre}</th>`).join("")}</tr></thead>
      <tbody>
        ${row("Para qué", "resumen")}
        ${row("Qué cubre", "cubre")}
        ${row("Costo", "costo")}
        ${row("Forma de pago", "pago")}
        <tr><th scope="row"></th>${pl.map(x => `<td><a class="btn btn--sm" href="${waLink("Hola, quiero información del plan " + x.nombre + ".")}" target="_blank" rel="noopener">Quiero este plan</a></td>`).join("")}</tr>
      </tbody>`;
  });

  /* ---------- Planes: tarjetas ---------- */
  const ICONS = { red: "heart", orange: "flower", yellow: "shield" };
  const precioTxt = p => p ? `<span class="plan-card__from">desde</span> <strong>${colones(p)}</strong> <span class="plan-card__from">/mes</span>` : `<strong class="plan-card__tbd">Precio por confirmar</strong>`;
  $$("[data-planes-cards]").forEach(box => {
    box.innerHTML = C.planes.map(x => `
      <article class="plan-card plan-card--${x.color}" id="${x.id}">
        <span class="plan-card__ic ic-${x.color}">${icon(ICONS[x.color] || "heart")}</span>
        <h3>${x.nombre}</h3>
        <p class="plan-card__sum">${x.resumen}</p>
        <ul class="plan-card__list">${x.beneficios.map(b => `<li>${icon("check", "icon--sm")}<span>${b}</span></li>`).join("")}</ul>
        <div class="plan-card__foot">
          <p class="plan-card__price">${precioTxt(x.precio)}</p>
          <a class="btn btn--primary btn--block" href="${waLink("Hola, quiero el plan " + x.nombre + ".")}" target="_blank" rel="noopener">Quiero este plan</a>
          <details class="plan-card__details"><summary>Ver detalle</summary>
            <dl><dt>Qué cubre</dt><dd>${x.cubre}</dd><dt>Costo</dt><dd>${x.costo}</dd><dt>Forma de pago</dt><dd>${x.pago}</dd></dl>
          </details>
        </div>
      </article>`).join("");
  });

  /* ---------- Planes: armá tu protección ---------- */
  $$("[data-planes-builder]").forEach(box => {
    const list = $("[data-builder-list]", box);
    list.innerHTML = C.planes.map((x, i) => `
      <label class="builder__item">
        <input type="checkbox" value="${i}" ${i < 2 ? "checked" : ""}>
        <span class="plan-card__ic ic-${x.color}">${icon(ICONS[x.color] || "heart", "icon--sm")}</span>
        <span class="builder__name"><strong>${x.nombre}</strong><span>${x.resumen}</span></span>
        <span class="builder__price">${x.precio ? colones(x.precio) + "/mes" : "Por confirmar"}</span>
      </label>`).join("");
    const total = $("[data-builder-total]", box), note = $("[data-builder-note]", box), cta = $("[data-builder-cta]", box);
    const update = () => {
      const sel = $$("input:checked", list).map(i => C.planes[+i.value]);
      const allPriced = sel.length && sel.every(x => x.precio);
      total.textContent = !sel.length ? "₡0" : allPriced ? colones(sel.reduce((a, x) => a + x.precio, 0)) : "Te lo cotizamos";
      note.textContent = sel.length ? (allPriced ? "Se rebaja de tu planilla cada mes." : "Te confirmamos el monto exacto por WhatsApp.") : "Escogé al menos un plan.";
      cta.href = waLink(sel.length ? "Hola, quiero estos planes: " + sel.map(x => x.nombre).join(", ") + "." : "Hola, quiero información de los planes de protección.");
      $$(".builder__item", list).forEach(l => l.classList.toggle("is-on", $("input", l).checked));
    };
    list.addEventListener("change", update); update();
  });

  /* ---------- FAQ ---------- */
  $$("[data-faq]").forEach(box => {
    const n = +(box.dataset.faq || 99);
    box.innerHTML = C.faq.slice(0, n).map(f => `<details><summary>${f.p}</summary><p>${f.r}</p></details>`).join("");
    // Datos estructurados para Google
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: C.faq.map(f => ({ "@type": "Question", name: f.p, acceptedAnswer: { "@type": "Answer", text: f.r } }))
    });
    document.head.appendChild(ld);
  });

  /* ---------- Contacto ---------- */
  $$("[data-contacto]").forEach(box => {
    const k = C.contacto;
    const row = (ic, t, v, href) => {
      const val = v ? (href ? `<a href="${href}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${v}</a>` : `<span>${v}</span>`) : '<span class="contact-row__tbd">Por confirmar</span>';
      return `<li class="contact-row${v && v.length > 24 ? " contact-row--long" : ""}${v && v.length > 60 ? " contact-row--full" : ""}"><span class="contact-row__ic">${icon(ic, "icon--sm")}</span><span class="contact-row__t">${t}</span>${val}</li>`;
    };
    box.className = "contact-list";
    box.innerHTML = [
      row("wa", "WhatsApp", k.whatsappVisible, waLink("Hola, quiero información.")),
      row("phone", "Teléfono", k.telefono, k.telefono ? "tel:+506" + k.telefono.replace(/\D/g, "") : ""),
      row("phone", "Móvil", k.movil, k.movil ? "tel:+506" + k.movil.replace(/\D/g, "") : ""),
      row("mail", "Correo", k.correo, k.correo ? "mailto:" + k.correo : ""),
      row("clock", "Horario", k.horario),
      row("pin", "Oficina", k.direccion ? k.direccion + " · Abrir en Waze" : "", k.mapaUrl)
    ].join("");
  });

  /* Fotos de los pasos: se muestran solo si el archivo existe */
  $$("[data-photo]").forEach(box => {
    const img = new Image();
    img.onload = () => {
      img.alt = box.dataset.alt || "";
      box.textContent = ""; box.appendChild(img); box.classList.add("has-img");
      if (box.dataset.bright) img.classList.add("is-bright");
      const [fx, fy] = (box.dataset.focus || "0.5 0.5").split(" ").map(Number);
      const z = Number(box.dataset.zoom || 1);
      /* Centra el rostro (fx, fy) dentro del recuadro, sin dejar bordes vacíos */
      const place = () => {
        const W = box.clientWidth, H = box.clientHeight, iw = img.naturalWidth, ih = img.naturalHeight;
        const s = Math.max(W / iw, H / ih) * z, w = iw * s, hh = ih * s;
        const left = Math.min(0, Math.max(W - w, W / 2 - fx * w));
        const top = Math.min(0, Math.max(H - hh, H / 2 - fy * hh));
        Object.assign(img.style, { width: w + "px", height: hh + "px", left: left + "px", top: top + "px" });
      };
      place(); window.addEventListener("resize", place);
    };
    img.src = box.dataset.photo;
  });

  if ($("[data-mobile-cta]")) document.body.classList.add("has-mobile-cta");

  /* ---------- Medición: GA4, Meta y TikTok ----------
     Se cargan solo si el ID está puesto en assets/config.js (medicion). */
  const M = C.medicion || {};
  const cargar = src => { const s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s); };
  if (M.ga4) {
    cargar("https://www.googletagmanager.com/gtag/js?id=" + M.ga4);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", M.ga4, { origen: origen.ref });
  }
  if (M.metaPixel) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", M.metaPixel); fbq("track", "PageView");
  }
  if (M.tiktokPixel) {
    !function (w, d, t) { w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"]; ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; }; for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]); ttq.load = function (e) { var a = d.createElement("script"); a.async = !0; a.src = "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + e + "&lib=" + t; var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(a, s); }; ttq.load(M.tiktokPixel); ttq.page(); }(window, document, "ttq");
  }

  /* Cada clic a WhatsApp cuenta como solicitud (lead), con su producto y origen */
  document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (!a) return;
    const txt = decodeURIComponent((a.href.split("text=")[1] || "")).split("\n")[0];
    const producto = /credicash/i.test(txt) ? "credicash" : /plan/i.test(txt) ? "planes" : "general";
    const datos = { producto, origen: origen.ref, fuente: origen.fuente, campana: origen.campana || "" };
    try { if (window.gtag) { gtag("event", "whatsapp_click", datos); gtag("event", "generate_lead", datos); } } catch (err) {}
    try { if (window.fbq) fbq("track", "Lead", { content_name: producto }); } catch (err) {}
    try { if (window.ttq) ttq.track("Contact", { content_id: producto }); } catch (err) {}
  });
})();
