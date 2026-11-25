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
    wa: '<path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2L9 9.5z"/>'
  };
  const icon = (n, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ""}</svg>`;
  window.CSGicon = icon;

  const colones = n => "₡" + Math.round(n).toLocaleString("es-CR");

  /* ---------- WhatsApp ---------- */
  const waLink = msg => `https://wa.me/${C.contacto.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.CSGwa = waLink;

  /* ---------- Header ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  const links = [
    ["credicash.html", "CrédiCash"],
    ["proteccion.html", "Protección"],
    [C.enlaces.tiendita, "Tiendita", true],
    ["nosotros.html", "Nosotros"],
    ["contacto.html", "Contacto"]
  ];
  const header = $("#site-header");
  if (header) {
    header.className = "header";
    header.innerHTML = `
      <div class="container header__in">
        <a class="logo" href="index.html" aria-label="${C.nombreCorto}, inicio">
          <img src="${C.logo}" alt="${C.nombre}">
        </a>
        <button class="nav__toggle" aria-expanded="false" aria-controls="nav" aria-label="Abrir menú">${icon("menu")}</button>
        <nav class="nav" id="nav" aria-label="Principal">
          ${links.map(([h, t, ext]) => `<a href="${h}"${ext ? ' target="_blank" rel="noopener"' : ""}${here === h ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
          <a class="btn btn--sm" href="${C.enlaces.estadoCuenta}" target="_blank" rel="noopener">${icon("user", "icon--sm")} Mi estado de cuenta</a>
        </nav>
      </div>`;
    const t = $(".nav__toggle", header), nav = $("#nav", header);
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
            <a class="logo" href="index.html"><img src="${C.logo}" alt="${C.nombre}" style="height:72px;background:#fff;border-radius:12px;padding:6px 10px"></a>
            <p style="margin-top:14px">Crédito, protección y compras para funcionarios públicos desde ${C.fundacion}. Afiliada a FECOSER.</p>
          </div>
          <div><h3>Servicios</h3><ul>
            <li><a href="credicash.html">CrédiCash</a></li>
            <li><a href="proteccion.html">Planes de protección</a></li>
            <li><a href="${C.enlaces.tiendita}" target="_blank" rel="noopener">Tiendita CSG</a></li>
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
          <p>${C.nombre}, Cooperativa de Servicios Múltiples San Gabriel R.L., está supervisada solamente en materia de prevención de legitimación de capitales y financiamiento al terrorismo. La SUGEF no supervisa a la cooperativa en materia financiera, ni sus negocios, ni su solvencia.</p>
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
    const card = (ic, t, v, href) => `<div class="card" style="display:flex;gap:14px;align-items:flex-start">
      <span style="color:var(--brand)">${icon(ic)}</span><div><strong>${t}</strong><br>${v ? (href ? `<a href="${href}">${v}</a>` : `<span class="muted">${v}</span>`) : '<span class="tiny">Por confirmar</span>'}</div></div>`;
    box.innerHTML = [
      card("wa", "WhatsApp", k.whatsappVisible, waLink("Hola, quiero información.")),
      card("phone", "Teléfono", k.telefono, k.telefono ? "tel:+506" + k.telefono.replace(/\D/g, "") : ""),
      card("mail", "Correo", k.correo, k.correo ? "mailto:" + k.correo : ""),
      card("pin", "Oficina", k.direccion, k.mapaUrl),
      card("clock", "Horario", k.horario)
    ].join("");
  });

  /* Fotos de los pasos: se muestran solo si el archivo existe */
  $$("[data-photo]").forEach(box => {
    const img = new Image();
    img.onload = () => { img.alt = box.dataset.alt || ""; img.loading = "lazy"; box.textContent = ""; box.appendChild(img); box.classList.add("has-img"); };
    img.src = box.dataset.photo;
  });

  if ($("[data-mobile-cta]")) document.body.classList.add("has-mobile-cta");
})();
