const dialog = document.querySelector("#demo-dialog");
const demoButton = document.querySelector(".demo-button");
const closeButton = document.querySelector(".dialog-close");
const menuButton = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");
const languageToggle = document.querySelector(".language-toggle");
const locales = window.GEROA_LOCALES;
const originalText = new Map();
const spanishRepresentativeCopy = {
  "What Geroa handles": "Qué puede gestionar",
  "Your personal representative. One message away.": "Tu representante personal. A un mensaje de distancia.",
  "You set the goal.": "Tú marcas el objetivo.",
  "handles": "se encarga",
  "the rest.": "del resto.",
  "Give Geroa the job. It calls providers, negotiates better terms, manages paperwork, makes bookings, and coordinates payments — always with your authorization.": "Encárgaselo a Geroa. Llama a proveedores, negocia mejores condiciones, gestiona trámites, hace reservas y coordina pagos, siempre con tu autorización.",
  "Get a representative": "Consigue un representante",
  "See what it handles": "Mira todo lo que puede hacer",
  "Join 10,000+ people delegating the hassle": "Únete a más de 10.000 personas que ya delegan lo pesado",
  "Your decision.": "Tú decides.",
  "We handle it.": "Nosotros lo gestionamos.",
  "New mobile plan negotiated ✓": "Nueva tarifa móvil negociada ✓",
  "Vodafone · €18/month saved · Awaiting your approval": "Vodafone · Ahorras 18 €/mes · Pendiente de tu aprobación",
  "Delegate the complicated stuff": "Delega lo complicado",
  "Ask once. Approve once. Consider it handled.": "Pídelo una vez. Apruébalo una vez. Dalo por hecho.",
  "Tell Geroa the outcome": "Dile a Geroa qué quieres conseguir",
  "Lower my bill, switch provider, book the trip, resolve the charge — explain the result you want.": "Bajar mi factura, cambiar de proveedor, reservar el viaje o reclamar un cobro: explica el resultado que buscas.",
  "“Call my mobile provider and negotiate a cheaper plan without losing my current data allowance.”": "«Llama a mi operadora y negocia una tarifa más barata sin que pierda los datos que ya tengo.»",
  "Your representative gets to work": "Tu representante se pone manos a la obra",
  "Geroa calls, compares options, negotiates, fills forms, and follows up with the business.": "Geroa llama, compara opciones, negocia, rellena formularios y hace seguimiento con la empresa.",
  "Telecom and utility negotiations": "Negociaciones con operadoras y suministros",
  "Forms, calls, and follow-ups": "Formularios, llamadas y seguimiento",
  "Bookings and payment coordination": "Reservas y coordinación de pagos",
  "You stay in control": "Tú mantienes el control",
  "Review the result, approve any contract or payment, and receive a complete confirmation.": "Revisa el resultado, aprueba cualquier contrato o pago y recibe una confirmación completa.",
  "One representative for real life": "Un representante para la vida real",
  "From monthly bills": "Desde las facturas de cada mes",
  "to once-in-a-lifetime plans.": "hasta los planes de una vida.",
  "If it involves a provider, a negotiation, a booking, or a payment, delegate it to Geroa.": "Si implica un proveedor, una negociación, una reserva o un pago, delégaselo a Geroa.",
  "Phone & internet": "Telefonía e internet",
  "Negotiate with Vodafone, AT&T, and other providers. Change plans or dispute charges.": "Negocia con Vodafone, AT&T y otras operadoras. Cambia de tarifa o reclama cobros.",
  "Electricity, gas & water": "Electricidad, gas y agua",
  "Compare tariffs, switch providers, manage contracts, and resolve billing issues.": "Compara tarifas, cambia de compañía, gestiona contratos y resuelve problemas de facturación.",
  "Travel & stays": "Viajes y estancias",
  "Book hotels and transport, request upgrades, and coordinate special requirements.": "Reserva hoteles y transporte, solicita mejoras y coordina necesidades especiales.",
  "Bookings with payment": "Reservas con pago",
  "Geroa prepares the booking and payment. You review and approve before any charge.": "Geroa prepara la reserva y el pago. Tú revisas y apruebas antes de que se haga ningún cargo.",
  "Complex requests": "Gestiones complejas",
  "Appointments, claims, cancellations, waitlists, and tasks that require persistence.": "Citas, reclamaciones, cancelaciones, listas de espera y tareas que requieren insistencia.",
  "More than an assistant": "Más que un asistente",
  "A representative that acts.": "Un representante que actúa.",
  "A user who stays in control.": "Tú mantienes el control.",
  "Geroa can navigate real conversations and complex processes. It pauses whenever your identity, signature, contract acceptance, or payment approval is required.": "Geroa sabe desenvolverse en conversaciones reales y procesos complejos. Se detiene cuando hace falta tu identidad, firma, aceptación de un contrato o aprobación de un pago.",
  "Negotiates for you": "Negocia por ti",
  "Explains your case, compares offers, and pushes for better terms.": "Explica tu caso, compara ofertas y pelea por mejores condiciones.",
  "Handles the process": "Gestiona todo el proceso",
  "Calls, forms, documents, follow-ups, and confirmations in one place.": "Llamadas, formularios, documentos, seguimiento y confirmaciones en un solo lugar.",
  "Works with permission": "Actúa con tu permiso",
  "You define the limits and approve binding decisions before they happen.": "Tú defines los límites y apruebas cualquier decisión vinculante antes de que ocurra.",
  "Coordinates payment": "Coordina el pago",
  "Geroa prepares the transaction; you authorize the final charge securely.": "Geroa prepara la operación; tú autorizas el cobro final de forma segura.",
  "Your time is worth more": "Tu tiempo vale más",
  "Stop managing providers.": "Deja de gestionar proveedores.",
  "Start delegating outcomes.": "Empieza a delegar resultados.",
  "You approve contracts and payments. Geroa handles everything around them.": "Tú apruebas contratos y pagos. Geroa se encarga de todo lo demás.",
  "My internet bill went up again. Negotiate a better rate or find me a better provider.": "Mi factura de internet ha vuelto a subir. Negocia una tarifa mejor o búscame otra compañía.",
  "On it. I’ll review your plan, call retention, and compare alternatives.": "Voy con ello. Revisaré tu tarifa, llamaré a retenciones y compararé alternativas.",
  "I negotiated €18 off per month with no loss of speed. Review the new terms and approve the change.": "He conseguido una rebaja de 18 € al mes sin perder velocidad. Revisa las nuevas condiciones y aprueba el cambio.",
  "Your personal AI representative. For what’s next.": "Tu representante personal con IA. Para lo que venga.",
  "Negotiations · Providers · Bookings · Payments": "Negociaciones · Proveedores · Reservas · Pagos",
  "One message. Your representative gets to work.": "Un mensaje. Tu representante se pone manos a la obra.",
  "Tell Geroa the outcome you want. It handles calls, negotiations, paperwork, bookings, and payment preparation — then asks for approval when it matters.": "Dile a Geroa qué quieres conseguir. Se ocupa de llamadas, negociaciones, trámites, reservas y preparación de pagos, y te pide aprobación cuando importa."
};

Object.assign(locales.es.translations, spanishRepresentativeCopy);
Object.assign(locales.es.translations, {
  "The app that fights your battles.": "La app que pelea tus batallas.",
  "Your problem.": "Tu problema.",
  "Geroa’s": "La llamada",
  "phone call.": "de Geroa.",
  "Bills creeping up? Refund going nowhere? Need a booking that takes six calls and a deposit? Drop it on Geroa. Your representative calls, argues, compares, books, and follows up. You step in only to approve.": "¿Te han vuelto a subir la factura? ¿Ese reembolso no llega? ¿La reserva exige seis llamadas y una señal? Pásaselo a Geroa. Tu representante llama, insiste, compara, reserva y hace seguimiento. Tú solo entras para aprobar.",
  "Hand over the headache": "Pásanos el marrón",
  "See Geroa in action": "Mira a Geroa en acción",
  "10,000+ people already stopped doing it themselves": "Más de 10.000 personas ya han dejado de hacerlo todo ellas",
  "You say go.": "Tú das el sí.",
  "We get it done.": "Nosotros lo hacemos.",
  "Vodafone backed down ✓": "Vodafone ha cedido ✓",
  "€18/month saved · Same data · Approve the deal?": "Ahorras 18 €/mes · Mismos datos · ¿Apruebas el acuerdo?",
  "No scripts. No hold music. No surrender.": "Sin guiones. Sin música de espera. Sin rendirse.",
  "Send the mess. Get back the result.": "Manda el lío. Recibe el resultado.",
  "Drop the problem": "Suéltanos el problema",
  "A bill, a booking, a cancellation, a claim. Tell us what “done” looks like.": "Una factura, una reserva, una cancelación o una reclamación. Dinos qué significa «resuelto».",
  "“Vodafone raised my bill again. Get the old price back or move me somewhere better. Keep my number.”": "«Vodafone me ha vuelto a subir la factura. Recupera el precio anterior o llévame a una compañía mejor. Quiero conservar mi número.»",
  "We become the annoying one": "Nosotros nos ponemos pesados",
  "Geroa calls, waits, escalates, compares, negotiates, fills the forms, and calls again.": "Geroa llama, espera, escala, compara, negocia, rellena formularios y vuelve a llamar.",
  "Real calls to real companies": "Llamadas reales a empresas reales",
  "Escalations, claims, and follow-ups": "Escalados, reclamaciones y seguimiento",
  "Bookings, deposits, and paperwork": "Reservas, señales y papeleo",
  "You make the final call": "Tú tienes la última palabra",
  "We bring you the deal. Nothing gets signed, switched, or charged until you say yes.": "Nosotros conseguimos el acuerdo. Nada se firma, se cambia ni se cobra hasta que tú digas sí.",
  "Your personal department of getting stuff done": "Tu departamento personal de hacer que las cosas pasen",
  "Too annoying for you.": "Demasiado pesado para ti.",
  "Perfect for Geroa.": "Perfecto para Geroa.",
  "If there’s a phone number, a form, a queue, or someone saying “computer says no,” send it our way.": "Si hay un teléfono, un formulario, una cola o alguien diciendo «el sistema no me deja», mándanoslo.",
  "Make Vodafone, AT&T, and the rest compete for your money. Cut bills, fight charges, switch plans.": "Haz que Vodafone, AT&T y las demás compitan por tu dinero. Baja facturas, reclama cobros y cambia de tarifa.",
  "Challenge the bill. Find a better tariff. Switch without spending your week on hold.": "Discute la factura. Encuentra una tarifa mejor. Cámbiate sin pasar la semana al teléfono.",
  "Travel & impossible tables": "Viajes y mesas imposibles",
  "Hotels, transport, sold-out restaurants, upgrades, groups, and special requests.": "Hoteles, transporte, restaurantes completos, mejoras, grupos y peticiones especiales.",
  "We line up the booking and deposit. You check it, approve it, and only then does the card move.": "Preparamos la reserva y la señal. Tú lo revisas, lo apruebas y solo entonces se cobra.",
  "Claims & cancellations": "Reclamaciones y cancelaciones",
  "Refunds, mystery charges, missed deadlines, endless email chains. We keep pushing.": "Reembolsos, cobros fantasma, plazos incumplidos y cadenas eternas de emails. Nosotros seguimos insistiendo.",
  "Insurance & paperwork": "Seguros y papeleo",
  "Quotes, renewals, claims, forms, documents, and the follow-up nobody wants to do.": "Presupuestos, renovaciones, siniestros, formularios, documentos y el seguimiento que nadie quiere hacer.",
  "Subscriptions": "Suscripciones",
  "Cancel the gym. Downgrade the software. Recover the promo price. Kill the zombie charges.": "Cancela el gimnasio. Baja el plan del software. Recupera el precio promocional. Mata los cobros zombis.",
  "Life admin": "Burocracia cotidiana",
  "Appointments, renewals, waiting lists, registrations, and every task you keep postponing.": "Citas, renovaciones, listas de espera, registros y cada tarea que sigues posponiendo.",
  "Calling Vodafone retention…": "Llamando a retenciones de Vodafone…",
  "◉   Negotiating your plan…": "◉   Negociando tu tarifa…",
  "“The monthly price increased with no change in service. What can you offer to keep this customer?”": "«El precio mensual ha subido sin ninguna mejora del servicio. ¿Qué podéis ofrecer para conservar a este cliente?»",
  "Not advice. Action.": "No son consejos. Son acciones.",
  "It doesn’t tell you what to do.": "No te dice lo que tienes que hacer.",
  "It goes and does it.": "Va y lo hace.",
  "Geroa navigates the people, policies, transfers, forms, and fine print. When a signature, identity check, contract, or payment needs you, we stop and ask.": "Geroa se abre paso entre personas, políticas, transferencias, formularios y letra pequeña. Cuando hace falta una firma, verificar tu identidad, aceptar un contrato o pagar, nos detenemos y te preguntamos.",
  "Pushes past the first no": "No se queda con el primer no",
  "Explains your case, asks for retention, compares offers, and escalates.": "Explica tu caso, pide hablar con retenciones, compara ofertas y escala.",
  "Owns the whole mess": "Se come todo el marrón",
  "Calls, forms, documents, follow-ups, reminders, and proof in one place.": "Llamadas, formularios, documentos, seguimiento, recordatorios y justificantes en un solo lugar.",
  "Never freelances with your money": "Nunca improvisa con tu dinero",
  "You set the limits. Contracts, switches, and charges wait for your yes.": "Tú marcas los límites. Los contratos, cambios y cobros esperan a tu sí.",
  "Doesn’t forget to chase": "No se olvida de insistir",
  "Geroa follows up until the company delivers what it promised.": "Geroa hace seguimiento hasta que la empresa cumple lo prometido.",
  "Life is too short for “your call is important to us”": "La vida es demasiado corta para «tu llamada es importante para nosotros»",
  "Send us the problem.": "Mándanos el problema.",
  "Get on with your life.": "Sigue con tu vida.",
  "No surprise charges. No unauthorized changes. Your yes is the final step.": "Sin cargos sorpresa. Sin cambios no autorizados. Tu sí es el último paso.",
  "Vodafone raised my bill again. Fix it. I’m happy to leave if they won’t.": "Vodafone me ha vuelto a subir la factura. Arréglalo. Si no ceden, me voy.",
  "Good. I’m calling retention and checking two competing offers. Keep your number, same data or better.": "Perfecto. Llamo a retenciones y comparo dos ofertas rivales. Conservamos tu número y los mismos datos o más.",
  "They folded: €18 less per month, same data, no new lock-in. Say yes and I’ll close it.": "Han cedido: 18 € menos al mes, los mismos datos y sin nueva permanencia. Di que sí y lo cierro.",
  "Give us the headache.": "Pásanos el marrón.",
  "One message starts the calls, comparisons, negotiations, forms, bookings, and follow-ups. You return when there’s a decision worth making.": "Un mensaje pone en marcha llamadas, comparaciones, negociaciones, formularios, reservas y seguimiento. Tú vuelves cuando hay una decisión que merece tu atención."
});

function textNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
  }
  return nodes;
}

textNodes(document.body).forEach((node) => originalText.set(node, node.nodeValue));

function setLanguage(code) {
  const locale = locales[code] || locales.en;

  originalText.forEach((original, node) => {
    const source = original.trim();
    const translated = locale.translations[source] || source;
    node.nodeValue = original.replace(source, translated);
  });

  document.documentElement.lang = code;
  document.documentElement.dir = "ltr";
  document.title = code === "en"
    ? "Geroa — Your Personal AI Representative"
    : `Geroa — ${locale.translations["Your personal AI representative. For what’s next."]}`;
  languageToggle.textContent = code === "es" ? "EN" : "ES";
  languageToggle.setAttribute(
    "aria-label",
    code === "es" ? "Switch language to English" : "Cambiar idioma a español"
  );
  localStorage.setItem("geroa-language", code);
}

languageToggle.addEventListener("click", () => {
  setLanguage(document.documentElement.lang === "es" ? "en" : "es");
});

demoButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("mobile-open");
  menuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("mobile-open");
    menuButton.textContent = "☰";
  });
});

const savedLanguage = localStorage.getItem("geroa-language");
setLanguage(savedLanguage === "es" ? "es" : "en");
