/* ================================================================
   CONFIGURACIÓN DEL SITIO — Coope San Gabriel
   Todo lo marcado con "PENDIENTE" debe confirmarse con la cooperativa.
   Cambiar aquí actualiza todas las páginas.
   ================================================================ */
window.CSG = {
  nombre: "Coope San Gabriel R.L.",
  nombreCorto: "Coope San Gabriel",
  fundacion: 1997,

  /* Logo oficial (assets/logo-csg-original.png es la versión grande) */
  logo: "assets/logo-csg.png",

  contacto: {
    whatsapp: "50670343412",          // PENDIENTE: confirmar el número oficial (hoy hay dos: 7034-3412 y 8686-9905)
    whatsappVisible: "7034-3412",     // PENDIENTE
    telefono: "4001-2656",                 // Fijo, del sitio actual
    correo: "clienteselecto@coopesangabriel.com",
    movil: "6156-5903",                     // Móvil, del sitio actual
    direccion: "Zapote, San José: 150 m oeste del Registro Nacional, Centro Comercial Plaza del Castillo, 2.º piso, local 30",
    horario: "Lunes a viernes, 8:00 a.m. a 5:00 p.m.",
    mapaUrl: "https://waze.com/ul/hd1u0rmgt2"           // Waze, del sitio actual
  },

  /* Medición: pegar aquí los IDs cuando existan las cuentas.
     Vacío = no se carga nada. */
  medicion: {
    ga4: "",          // PENDIENTE: ID de Google Analytics 4, ej. "G-XXXXXXX"
    metaPixel: "",    // PENDIENTE: ID del píxel de Meta, ej. "123456789012345"
    tiktokPixel: ""   // PENDIENTE: ID del píxel de TikTok, ej. "CXXXXXXXXXXXXXXX"
  },

  enlaces: {
    estadoCuenta: "https://coopesangabriel.com/estado-de-cuenta/", // PENDIENTE: URL real del estado de cuenta
    tiendita: "https://tienditacsg.com",                         // PENDIENTE: confirmar cuál dominio queda (hay dos)
    facebook: "https://www.facebook.com/CoopeSanGabrielRL",
    instagram: "https://www.instagram.com/coopesangabriel/",
    youtube: "https://www.youtube.com/@coopesangabrielrl9205"
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
      color: "red",
      beneficios: ["Beneficio por confirmar", "Beneficio por confirmar", "Beneficio por confirmar"],
      precio: null,            // PENDIENTE: monto mensual en colones, ej. 8500
      cubre: "Coberturas por confirmar",
      costo: "Por confirmar",
      pago: "Rebajo de planilla"
    },
    {
      id: "funerario",
      nombre: "Plan funerario",
      icono: "flower",
      resumen: "Tranquilidad para tu familia en el momento más difícil.",
      color: "orange",
      beneficios: ["Servicio funerario familiar", "Cobertura por confirmar", "Cobertura por confirmar"],
      precio: null,            // PENDIENTE
      cubre: "Servicio funerario familiar (detalle por confirmar)",
      costo: "Por confirmar",
      pago: "Rebajo de planilla"
    },
    {
      id: "seguros-ins",
      nombre: "Seguros colectivos INS",
      icono: "shield",
      resumen: "Vida e incendio en póliza colectiva del INS.",
      color: "yellow",
      beneficios: ["Vida: ₡5.000.000", "Gastos funerarios: ₡2.000.000", "Incendio y asistencia en el hogar"],
      precio: null,            // PENDIENTE (según póliza)
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
