/* ================================================================
   CONFIGURACIÓN DEL SITIO — Coope San Gabriel
   Todo lo marcado con "PENDIENTE" debe confirmarse con la cooperativa.
   Cambiar aquí actualiza todas las páginas.
   ================================================================ */
window.CSG = {
  nombre: "Coope San Gabriel R.L.",
  nombreCorto: "Coope San Gabriel",
  fundacion: 1997,

  /* Logos oficiales. Copiar los archivos a /assets para no depender del WordPress actual.
     Mientras no estén, se cargan desde coopesangabriel.com como respaldo. */
  logo: "assets/logo-csg.png",
  logoRespaldo: "https://coopesangabriel.com/wp-content/uploads/2026/03/Copia-de-presupuesto-MAR-2-24.png",
  logoBlanco: "assets/logo-csg-blanco.png",
  logoBlancoRespaldo: "https://coopesangabriel.com/wp-content/uploads/2024/08/LOGO-CSG-Blanco.png",

  contacto: {
    whatsapp: "50670343412",          // PENDIENTE: confirmar el número oficial (hoy hay dos: 7034-3412 y 8686-9905)
    whatsappVisible: "7034-3412",     // PENDIENTE
    telefono: "",                     // PENDIENTE: teléfono fijo, ej. "2222-2222"
    correo: "",                       // PENDIENTE: ej. "info@coopesangabriel.com"
    direccion: "",                    // PENDIENTE: dirección de la oficina
    horario: "",                      // PENDIENTE: ej. "Lunes a viernes, 8:00 a.m. a 5:00 p.m."
    mapaUrl: ""                       // PENDIENTE: enlace de Google Maps
  },

  enlaces: {
    estadoCuenta: "https://coopesangabriel.com/estado-de-cuenta/", // PENDIENTE: URL real del estado de cuenta
    tiendita: "https://tienditacsg.com",                         // PENDIENTE: confirmar cuál dominio queda (hay dos)
    facebook: "https://www.facebook.com/",                       // PENDIENTE
    instagram: "https://www.instagram.com/",                     // PENDIENTE
    youtube: "https://www.youtube.com/"                          // PENDIENTE
  },

  credicash: {
    montoMinimo: 50000,     // PENDIENTE: confirmar
    montoMaximo: 690000,    // Confirmado
    plazoMinimo: 6,         // PENDIENTE: meses
    plazoMaximo: 36,        // PENDIENTE: meses
    pasoPlazo: 6,
    tasaAnual: 24,          // PENDIENTE: tasa anual real (%). Se usa para calcular la cuota.
    mostrarTasa: false,     // Cambiar a true cuando la tasa esté confirmada
    desembolso: "menos de 48 horas",
    requisitos: [           // PENDIENTE: confirmar lista
      "Ser funcionario público con nombramiento vigente",
      "Cédula de identidad vigente",
      "Orden patronal o última colilla de pago"
    ]
  },

  planes: [                 // PENDIENTE: coberturas y precios reales
    {
      id: "cuidarte-mas",
      nombre: "Cuidarte Más",
      icono: "heart",
      resumen: "Plan de salud para vos y tu familia.",
      cubre: "Coberturas por confirmar",
      costo: "Por confirmar",
      pago: "Rebajo de planilla"
    },
    {
      id: "funerario",
      nombre: "Plan funerario",
      icono: "flower",
      resumen: "Tranquilidad para tu familia en el momento más difícil.",
      cubre: "Servicio funerario familiar (detalle por confirmar)",
      costo: "Por confirmar",
      pago: "Rebajo de planilla"
    },
    {
      id: "seguros-ins",
      nombre: "Seguros colectivos INS",
      icono: "shield",
      resumen: "Vida e incendio en póliza colectiva del INS.",
      cubre: "Vida: ₡5.000.000 por muerte natural o accidental y ₡2.000.000 para gastos funerarios. Incendio: incendio y rayo, coberturas C y D, asistencia en el hogar.",
      costo: "Según póliza",
      pago: "Rebajo de planilla"
    }
  ],

  faq: [                    // PENDIENTE: validar respuestas con la cooperativa
    { p: "¿Qué instituciones califican para CrédiCash?", r: "CrédiCash es para funcionarios públicos con pago por rebajo de planilla. Escribinos y te confirmamos si tu institución tiene convenio." },
    { p: "¿Necesito ser asociado?", r: "No. CrédiCash no requiere afiliación a la cooperativa." },
    { p: "¿Necesito fiador o prima?", r: "No. CrédiCash es sin fiador y sin prima." },
    { p: "¿Puedo cancelar el crédito antes?", r: "Sí. No cobramos penalización por pago anticipado." },
    { p: "¿Cuánto dura el trámite?", r: "El trámite es 100% digital y el desembolso se realiza en menos de 48 horas una vez aprobado." }
  ]
};
