/* MR Lavação — lógica de interface e pedido
   Preços, combos e telefone oficial são intencionalmente deixados sem valores fictícios.
   Preencha CONFIG quando a empresa definir as informações comerciais. */
const CONFIG = {
  whatsappNumber: "", // Formato internacional, somente números. Ex.: 55DDDNUMERO
  prices: {
    hatch: {}, sedan: {}, suv: {}, motorcycle: {}
  },
  combos: {
    hatch: [], sedan: [], suv: [], motorcycle: []
  }
};

const VEHICLE_TYPES = {
  hatch: {
    label: "Hatch", icon: "🚗", services: [
      { id: "wash", name: "Lavagem completa", desc: "Limpeza externa completa." },
      { id: "interior", name: "Higienização interna", desc: "Limpeza interna detalhada." },
      { id: "interior-simple", name: "Limpeza interna simples", desc: "Limpeza interna básica para a oferta Uber." },
      { id: "wax", name: "Enceramento e proteção", desc: "Acabamento e proteção da pintura." }
    ]
  },
  sedan: {
    label: "Sedan", icon: "🚘", services: [
      { id: "wash", name: "Lavagem completa", desc: "Limpeza externa completa." },
      { id: "interior", name: "Higienização interna", desc: "Limpeza interna detalhada." },
      { id: "interior-simple", name: "Limpeza interna simples", desc: "Limpeza interna básica para a oferta Uber." },
      { id: "wax", name: "Enceramento e proteção", desc: "Acabamento e proteção da pintura." }
    ]
  },
  suv: {
    label: "SUV / Picape", icon: "🚙", services: [
      { id: "wash", name: "Lavagem completa", desc: "Limpeza externa completa." },
      { id: "interior", name: "Higienização interna", desc: "Limpeza interna detalhada." },
      { id: "interior-simple", name: "Limpeza interna simples", desc: "Limpeza interna básica para a oferta Uber." },
      { id: "wax", name: "Enceramento e proteção", desc: "Acabamento e proteção da pintura." }
    ]
  },
  motorcycle: {
    label: "Motocicleta", icon: "🏍️", services: [
      { id: "moto-wash", name: "Lavagem de motocicletas", desc: "Limpeza externa da motocicleta." },
      { id: "moto-detail", name: "Limpeza detalhada", desc: "Atenção aos detalhes e acabamentos." },
      { id: "moto-wax", name: "Enceramento e proteção", desc: "Acabamento e proteção." }
    ]
  }
};

let vehicles = [{ id: 1, type: "hatch", selected: [] }];
let nextVehicleId = 2;
const $ = (selector, root = document) => root.querySelector(selector);

// Escapa valores dinâmicos antes de inseri-los em templates HTML.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
const money = value => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

function comboFor(type, selected) {
  const key = [...selected].sort().join("|");
  return (CONFIG.combos[type] || []).find(combo => [...combo.services].sort().join("|") === key) || null;
}
function calculateVehicle(vehicle) {
  if (!vehicle.selected.length) return { known: true, total: 0, combo: null };
  const combo = comboFor(vehicle.type, vehicle.selected);
  const priceMap = CONFIG.prices[vehicle.type] || {};
  if (combo && Number.isFinite(combo.price)) return { known: true, total: combo.price, combo };
  const values = vehicle.selected.map(id => priceMap[id]);
  if (values.every(value => Number.isFinite(value))) return { known: true, total: values.reduce((a, b) => a + b, 0), combo: null };
  return { known: false, total: null, combo: null };
}
function renderVehicles() {
  const root = $("#vehicleList");
  root.innerHTML = vehicles.map((vehicle, index) => {
    const type = VEHICLE_TYPES[vehicle.type];
    const result = calculateVehicle(vehicle);
    const categoryCards = Object.entries(VEHICLE_TYPES).map(([key, item]) => `
      <button type="button" class="vehicle-category ${vehicle.type === key ? "is-selected" : ""}"
        data-type="${vehicle.id}" data-category="${key}" aria-pressed="${vehicle.type === key}">
        <span class="category-icon" aria-hidden="true">${item.icon}</span>
        <span class="category-name">${escapeHTML(item.label)}</span>
        <span class="category-check" aria-hidden="true">${vehicle.type === key ? "✓" : "+"}</span>
      </button>`).join("");
    const serviceCards = type.services.map(service => `
      <label class="service-option">
        <input type="checkbox" data-vehicle="${vehicle.id}" data-service="${service.id}" ${vehicle.selected.includes(service.id) ? "checked" : ""}>
        <span><strong>${escapeHTML(service.name)}</strong><small>${escapeHTML(service.desc)}</small></span>
      </label>`).join("");
    let priceNote = "Selecione serviços para consultar a combinação.";
    if (vehicle.selected.length) {
      priceNote = result.known
        ? (result.combo ? `Combo identificado: ${escapeHTML(result.combo.name)}` : "Valores individuais cadastrados.")
        : "Preços aguardando definição pela empresa.";
    }
    return `<article class="vehicle-card" data-card="${vehicle.id}">
      <div class="vehicle-card-head">
        <div class="vehicle-title"><span class="vehicle-symbol">${type.icon}</span><div><h3>Veículo ${String(index + 1).padStart(2, "0")}</h3><p>ESCOLHA A CATEGORIA</p></div></div>
        ${vehicles.length > 1 ? `<button class="vehicle-remove" data-remove="${vehicle.id}" aria-label="Remover veículo ${index + 1}">×</button>` : ""}
      </div>
      <div class="vehicle-category-grid" role="group" aria-label="Categoria do veículo ${index + 1}">${categoryCards}</div>
      <div class="service-heading"><h4>Serviços disponíveis</h4><span>Selecione um ou mais</span></div>
      <div class="service-grid">${serviceCards}</div>
      <p class="vehicle-combo-note" aria-live="polite">${priceNote}</p>
    </article>`;
  }).join("");
  root.querySelectorAll("[data-vehicle][data-service]").forEach(input => input.addEventListener("change", event => {
    const vehicle = vehicles.find(item => item.id === Number(event.target.dataset.vehicle));
    if (!vehicle) return;
    const service = event.target.dataset.service;
    vehicle.selected = event.target.checked ? [...vehicle.selected, service] : vehicle.selected.filter(id => id !== service);
    renderVehicles(); renderSummary();
  }));
  root.querySelectorAll("[data-type][data-category]").forEach(button => button.addEventListener("click", () => {
    const vehicle = vehicles.find(item => item.id === Number(button.dataset.type));
    if (!vehicle || vehicle.type === button.dataset.category) return;
    vehicle.type = button.dataset.category;
    vehicle.selected = [];
    renderVehicles(); renderSummary();
  }));
  root.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => {
    vehicles = vehicles.filter(item => item.id !== Number(button.dataset.remove));
    renderVehicles(); renderSummary();
  }));
}
function renderSummary() {
  const chosen = vehicles.filter(vehicle => vehicle.selected.length);
  $("#orderCount").textContent = String(vehicles.length).padStart(2, "0");
  if (!chosen.length) {
    $("#orderSummary").innerHTML = '<p class="empty-state">Selecione os serviços para começar a montar seu pedido.</p>';
    $("#orderTotal").textContent = "A definir";
    $("#whatsappButton").disabled = true;
    return;
  }
  let allKnown = true, total = 0;
  $("#orderSummary").innerHTML = chosen.map((vehicle, index) => {
    const type = VEHICLE_TYPES[vehicle.type], result = calculateVehicle(vehicle);
    if (!result.known) allKnown = false; else total += result.total;
    const names = vehicle.selected.map(id => type.services.find(service => service.id === id)?.name || id);
    const priceText = result.known ? money(result.total) : "Preço a definir";
    return `<div class="summary-vehicle"><strong>${escapeHTML(type.label)} — veículo ${index + 1}</strong><ul>${names.map(name => `<li>${escapeHTML(name)}</li>`).join("")}</ul><div class="summary-price">${result.combo ? `Combo ${result.combo.name}: ` : ""}${priceText}</div></div>`;
  }).join("");
  $("#orderTotal").textContent = allKnown ? money(total) : "A definir";
  const whatsappIsValid = /^\d{10,15}$/.test(CONFIG.whatsappNumber);
  $("#whatsappButton").disabled = !whatsappIsValid;
  $("#whatsappStatus").textContent = whatsappIsValid
    ? "A solicitação será enviada para o WhatsApp oficial."
    : "O WhatsApp oficial será configurado próximo à inauguração."; 

}
function buildMessage() {
  const lines = ["Olá! Gostaria de solicitar um atendimento na MR Lavação.", "", "Meu pedido:"];
  vehicles.forEach((vehicle, index) => {
    if (!vehicle.selected.length) return;
    const type = VEHICLE_TYPES[vehicle.type], result = calculateVehicle(vehicle);
    lines.push("", `Veículo ${index + 1}: ${type.label}`);
    vehicle.selected.forEach(id => lines.push(`- ${type.services.find(service => service.id === id)?.name || id}`));
    lines.push(result.known ? `Valor estimado: ${money(result.total)}${result.combo ? ` (Combo ${result.combo.name})` : ""}` : "Valor: a confirmar");
  });
  const date = $("#preferredDate").value, time = $("#preferredTime").value;
  lines.push("", `Data pretendida: ${date ? new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR") : "A combinar"}`);
  lines.push(`Horário pretendido: ${time || "A combinar"}`);
  lines.push("", "Gostaria de confirmar disponibilidade e condições. Obrigado(a)!");
  return lines.join("\n");
}
document.querySelectorAll("[data-promo='uber']").forEach(button => button.addEventListener("click", () => {
  const vehicle = vehicles.find(item => item.type !== "motorcycle") || vehicles[0];
  if (!vehicle || vehicle.type === "motorcycle") {
    $("#promoFeedback").textContent = "A oferta Uber está disponível para veículos de passeio.";
    return;
  }
  vehicle.selected = ["wash", "interior-simple"];
  $("#promoFeedback").textContent = "Oferta selecionada no veículo " + (vehicles.indexOf(vehicle) + 1) + ". Confira o resumo do pedido.";
  renderVehicles(); renderSummary();
  $("#servicos").scrollIntoView({ behavior: "smooth", block: "start" });
}));
$("#addVehicle").addEventListener("click", () => { vehicles.push({ id: nextVehicleId++, type: "hatch", selected: [] }); renderVehicles(); renderSummary(); });
$("#whatsappButton").addEventListener("click", () => {
  if (!/^\d{10,15}$/.test(CONFIG.whatsappNumber)) return;
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(buildMessage())}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
const themeToggle = $("#themeToggle");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("mr-lavacao-theme", theme); } catch (e) { }
  const isDark = theme === "dark";
  themeToggle.querySelector(".theme-icon").textContent = isDark ? "☼" : "☾";
  themeToggle.querySelector(".theme-label").textContent = isDark ? "Tema claro" : "Tema escuro";
  themeToggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
}
let savedTheme = "dark"; try { savedTheme = localStorage.getItem("mr-lavacao-theme") || "dark"; } catch (e) { }
applyTheme(savedTheme);
themeToggle.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
$("#currentYear").textContent = new Date().getFullYear();
const menuToggle = $("#menuToggle"), nav = $("#mainNav");
function setMobileMenu(open, returnFocus = false) {
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  if (open && window.matchMedia("(max-width: 760px)").matches) {
    nav.querySelector("a")?.focus();
  } else if (!open && returnFocus) {
    menuToggle.focus();
  }
}
menuToggle.addEventListener("click", () => {
  setMobileMenu(!nav.classList.contains("open"));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 760px)").matches) setMobileMenu(false);
}));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("open") &&
      window.matchMedia("(max-width: 760px)").matches) {
    setMobileMenu(false, true);
  }
});
document.addEventListener("click", event => {
  if (!nav.classList.contains("open") ||
      !window.matchMedia("(max-width: 760px)").matches) return;
  if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
    setMobileMenu(false);
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 760 && nav.classList.contains("open")) setMobileMenu(false);
});
renderVehicles(); renderSummary();
