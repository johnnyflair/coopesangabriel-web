/* ================================================================
   Botones flotantes: WhatsApp + Asistente virtual guiado
   El asistente responde solo con los datos de assets/config.js.
   Si no reconoce la pregunta, ofrece pasarla a WhatsApp.
   ================================================================ */
(function () {
  const C = window.CSG, icon = window.CSGicon, wa = window.CSGwa;
  if (!C || !icon || !wa) return;
  const cc = C.credicash, k = C.contacto;
  const colones = n => "₡" + Math.round(n).toLocaleString("es-CR");
  const evento = (nombre, datos) => { try { if (window.gtag) gtag("event", nombre, datos || {}); } catch (e) {} };
  const plan = id => C.planes.find(p => p.id === id) || {};
  const precio = p => p.precio ? `${colones(p.precio)} por mes` : "el precio te lo confirmamos por WhatsApp";

  /* ---------- Respuestas ---------- */
  const R = {
    hola: () => ({ t: "¡Hola! Soy el asistente de Coope San Gabriel. Preguntame sobre CrédiCash, los planes o cómo contactarnos.", q: ["¿Califico para CrédiCash?", "Requisitos", "¿Cuánto pagaría?", "Planes de salud"] }),
    califico: () => ({ t: "CrédiCash es para funcionarios públicos que pagan por rebajo de planilla. Si tu institución tiene convenio con nosotros, calificás. Escribinos y te lo confirmamos en minutos.", q: ["Requisitos", "¿Cuánto pagaría?"], wa: "Hola, quiero saber si califico para CrédiCash." }),
    requisitos: () => ({ t: "Para CrédiCash necesitás:\n• " + cc.requisitos.join("\n• "), q: ["¿Necesito fiador?", "¿Cuánto tarda?"], wa: "Hola, quiero solicitar CrédiCash." }),
    fiador: () => ({ t: `No. CrédiCash es sin fiador y sin prima, hasta ${colones(cc.montoMaximo)}, y se paga por rebajo de planilla.`, q: ["Requisitos", "¿Cuánto pagaría?"] }),
    monto: () => ({ t: `Prestamos desde ${colones(cc.montoMinimo)} hasta ${colones(cc.montoMaximo)}, con plazos de ${cc.plazoMinimo} a ${cc.plazoMaximo} meses.`, q: ["¿Cuánto pagaría?", "Requisitos"] }),
    cuota: () => ({ t: "Movés el monto y el plazo en la calculadora de arriba y ves tu cuota mensual al instante. ¿Te llevo?", accion: "calc", q: ["Requisitos", "¿Cuánto tarda?"] }),
    tasa: () => ({ t: cc.mostrarTasa ? `La tasa anual es de ${cc.tasaAnual}%. La cuota final depende del análisis y de tu capacidad de pago.` : "La tasa depende de tu perfil. Escribinos por WhatsApp y te damos tu tasa y tu cuota exacta.", wa: "Hola, quiero saber la tasa de CrédiCash.", q: ["¿Cuánto pagaría?"] }),
    tiempo: () => ({ t: `El trámite es 100% digital: nos escribís, firmás desde el celular y recibís el dinero en ${cc.desembolso}.`, q: ["Requisitos", "¿Califico para CrédiCash?"] }),
    asociado: () => ({ t: "No necesitás ser asociado. CrédiCash no requiere afiliación a la cooperativa.", q: ["Requisitos"] }),
    abonos: () => ({ t: "Podés hacer abonos o cancelar el crédito antes, sin penalidad.", q: ["¿Cuánto pagaría?"] }),
    salud: () => { const p = plan("cuidarte-mas"); return { t: `${p.nombre}: ${p.resumen} Se paga por rebajo de planilla; ${precio(p)}.`, ir: "#cuidarte-mas", q: ["Plan funerario", "Seguros INS"], wa: "Hola, quiero información de " + p.nombre + "." }; },
    funerario: () => { const p = plan("funerario"); return { t: `${p.nombre}: ${p.resumen} Se paga por rebajo de planilla; ${precio(p)}.`, ir: "#funerario", q: ["Planes de salud", "Seguros INS"], wa: "Hola, quiero información del " + p.nombre + "." }; },
    seguros: () => { const p = plan("seguros-ins"); return { t: `${p.nombre}: ${p.cubre}`, ir: "#seguros-ins", q: ["Planes de salud", "Plan funerario"], wa: "Hola, quiero información de los seguros colectivos INS." }; },
    tiendita: () => ({ t: "En la Tiendita CSG comprás a cuotas con rebajo de planilla.", link: { href: C.enlaces.tiendita, txt: "Ir a la Tiendita" }, q: ["Planes de salud"] }),
    estado: () => ({ t: "Podés consultar tu estado de cuenta en línea.", link: { href: C.enlaces.estadoCuenta, txt: "Ver mi estado de cuenta" } }),
    contacto: () => {
      const l = [`WhatsApp: ${k.whatsappVisible}`];
      if (k.telefono) l.push(`Teléfono: ${k.telefono}`);
      if (k.movil) l.push(`Móvil: ${k.movil}`);
      if (k.correo) l.push(`Correo: ${k.correo}`);
      if (k.direccion) l.push(`Oficina: ${k.direccion}`);
      if (k.horario) l.push(`Horario: ${k.horario}`);
      return { t: "Nos encontrás así:\n• " + l.join("\n• ") + (l.length < 3 ? "\nLa forma más rápida es WhatsApp." : ""), wa: "Hola, quiero información." };
    },
    gracias: () => ({ t: "¡Con gusto! Si necesitás algo más, aquí estoy.", q: ["¿Califico para CrédiCash?", "Planes de salud"] }),
    humano: () => ({ t: "Claro, te paso con una persona del equipo por WhatsApp.", wa: "Hola, quiero hablar con una persona." })
  };

  /* Palabras clave → respuesta (se revisan en orden) */
  const REGLAS = [
    [/persona|humano|asesor|agente|hablar con/, "humano"],
    [/hola|buenas|buenos|saludos|^hey/, "hola"],
    [/gracias|genial|perfecto|excelente/, "gracias"],
    [/fiador|prima|garant/, "fiador"],
    [/requisit|document|necesito para|que ocupo|qué ocupo|papeles/, "requisitos"],
    [/califico|calificar|instituci|convenio|puedo pedir|quien puede|quién puede/, "califico"],
    [/tasa|inter[eé]s|porcentaje/, "tasa"],
    [/cuota|cu[aá]nto pag|mensual|calcul|simul/, "cuota"],
    [/monto|cu[aá]nto (me )?prest|m[aá]ximo|m[ií]nimo|plazo|meses/, "monto"],
    [/tarda|demora|r[aá]pido|cu[aá]ndo|48|horas|d[ií]as|desembolso/, "tiempo"],
    [/asociad|afiliac|afiliar|socio/, "asociado"],
    [/abono|cancelar|adelant|penal|anticip/, "abonos"],
    [/salud|m[eé]dic|cuidarte/, "salud"],
    [/funer|sepel|fallec/, "funerario"],
    [/seguro|\bins\b|incendio|p[oó]liza/, "seguros"],
    [/tiend|comprar|electro|art[ií]culo/, "tiendita"],
    [/estado de cuenta|saldo|cu[aá]nto debo|mi cuenta/, "estado"],
    [/horario|abren|cierran|direcci|d[oó]nde|ubica|oficina|tel[eé]fono|correo|contact|llamar/, "contacto"]
  ];
  const BOTONES = { "¿Califico para CrédiCash?": "califico", "Requisitos": "requisitos", "¿Cuánto pagaría?": "cuota", "¿Necesito fiador?": "fiador", "¿Cuánto tarda?": "tiempo", "Planes de salud": "salud", "Plan funerario": "funerario", "Seguros INS": "seguros" };
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const entender = txt => { const t = norm(txt); for (const [re, id] of REGLAS) if (re.test(t) || re.test(txt.toLowerCase())) return id; return null; };

  /* ---------- Interfaz ---------- */
  const root = document.createElement("div");
  root.className = "fabs";
  root.innerHTML = `
    <section class="bot" id="asistente" role="dialog" aria-label="Asistente virtual de Coope San Gabriel" hidden>
      <header class="bot__head">
        <span class="bot__av">${icon("chat")}</span>
        <div><strong>Asistente CSG</strong><small>Respondo al instante</small></div>
        <button class="bot__x" type="button" aria-label="Cerrar asistente">${icon("x")}</button>
      </header>
      <div class="bot__body" aria-live="polite"></div>
      <form class="bot__form" autocomplete="off">
        <label class="sr-only" for="bot-input">Escribí tu pregunta</label>
        <input id="bot-input" type="text" placeholder="Escribí tu pregunta…" maxlength="200">
        <button type="submit" aria-label="Enviar">${icon("send")}</button>
      </form>
    </section>
    <div class="fabs__row">
      <span class="fabs__hint">Preguntale al asistente</span>
      <button class="fab fab--bot" type="button" aria-controls="asistente" aria-expanded="false" aria-label="Abrir asistente virtual">${icon("chat")}</button>
    </div>
    <a class="fab fab--wa" href="${wa("Hola, quiero información.")}" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">${icon("wa")}</a>`;
  document.body.appendChild(root);

  const panel = $(".bot"), body = $(".bot__body"), form = $(".bot__form"), input = $("#bot-input"), btn = $(".fab--bot");
  function $(s) { return root.querySelector(s); }
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function burbuja(txt, quien) {
    const el = document.createElement("div");
    el.className = "msg msg--" + quien;
    el.innerHTML = esc(txt).replace(/\n/g, "<br>");
    body.appendChild(el); body.scrollTop = body.scrollHeight;
    return el;
  }
  function responder(r, pregunta) {
    const el = burbuja(r.t, "bot");
    const extra = document.createElement("div");
    extra.className = "msg__acts";
    if (r.accion === "calc") extra.innerHTML += `<button type="button" class="chip chip--main" data-go="#calculadora">${icon("arrow", "icon--sm")} Ir a la calculadora</button>`;
    if (r.ir) extra.innerHTML += `<button type="button" class="chip" data-go="${r.ir}">Ver el plan</button>`;
    if (r.link) extra.innerHTML += `<a class="chip" href="${r.link.href}" target="_blank" rel="noopener">${r.link.txt}</a>`;
    if (r.wa) extra.innerHTML += `<a class="chip chip--wa" href="${wa(r.wa)}" target="_blank" rel="noopener">${icon("wa", "icon--sm")} Seguir por WhatsApp</a>`;
    (r.q || []).forEach(q => extra.innerHTML += `<button type="button" class="chip" data-q="${q}">${q}</button>`);
    if (extra.innerHTML) el.after(extra);
    body.scrollTop = body.scrollHeight;
  }
  function preguntar(txt, id) {
    burbuja(txt, "me");
    const intent = id || entender(txt);
    evento("asistente_pregunta", { tema: intent || "sin_respuesta" });
    setTimeout(() => {
      if (intent) responder(R[intent]());
      else responder({ t: "Esa no la tengo clara. Te paso con una persona del equipo por WhatsApp, con tu pregunta ya escrita.", wa: "Hola, tengo una consulta: " + txt, q: ["Requisitos", "¿Cuánto pagaría?"] });
    }, 350);
  }

  let iniciado = false;
  function abrir(v) {
    panel.hidden = !v; btn.setAttribute("aria-expanded", v); root.classList.toggle("is-open", v);
    btn.innerHTML = v ? icon("x") : icon("chat");
    btn.setAttribute("aria-label", v ? "Cerrar asistente virtual" : "Abrir asistente virtual");
    if (v && !iniciado) { iniciado = true; responder(R.hola()); evento("asistente_abierto"); }
    if (v && window.matchMedia("(min-width:701px)").matches) input.focus();
  }
  btn.addEventListener("click", () => abrir(panel.hidden));
  $(".bot__x").addEventListener("click", () => abrir(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) { abrir(false); btn.focus(); } });
  form.addEventListener("submit", e => { e.preventDefault(); const t = input.value.trim(); if (!t) return; input.value = ""; preguntar(t); });
  body.addEventListener("click", e => {
    const q = e.target.closest("[data-q]"), go = e.target.closest("[data-go]");
    if (q) preguntar(q.dataset.q, BOTONES[q.dataset.q]);
    if (go) { abrir(false); const d = document.querySelector(go.dataset.go); if (d) d.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
  /* La pista "Preguntale al asistente" aparece unos segundos y se va */
  setTimeout(() => root.classList.add("show-hint"), 2500);
  setTimeout(() => root.classList.remove("show-hint"), 9000);
})();
