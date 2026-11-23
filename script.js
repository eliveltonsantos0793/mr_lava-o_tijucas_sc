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
      { id: "wax", name: "Enceramento e proteção", desc: "Acabamento e proteção da pintura." }
    ]
  },
  sedan: {
    label: "Sedan", icon: "🚘", services: [
      { id: "wash", name: "Lavagem completa", desc: "Limpeza externa completa." },
      { id: "interior", name: "Higienização interna", desc: "Limpeza interna detalhada." },
      { id: "wax", name: "Enceramento e proteção", desc: "Acabamento e proteção da pintura." }
    ]
  },
  suv: {
    label: "SUV / Picape", icon: "🚙", services: [
      { id: "wash", name: "Lavagem completa", desc: "Limpeza externa completa." },
      { id: "interior", name: "Higienização interna", desc: "Limpeza interna detalhada." },
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
    const options = Object.entries(VEHICLE_TYPES).map(([key, item]) => `<option value="${key}" ${vehicle.type === key ? "selected" : ""}>${item.label}</option>`).join("");
    const serviceCards = type.services.map(service => `
      <label class="service-option">
        <input type="checkbox" data-vehicle="${vehicle.id}" data-service="${service.id}" ${vehicle.selected.includes(service.id) ? "checked" : ""}>
        <span><strong>${service.name}</strong><small>${service.desc}</small></span>
      </label>`).join("");
    let priceNote = "Selecione serviços para consultar a combinação.";
    if (vehicle.selected.length) {
      priceNote = result.known
        ? (result.combo ? `Combo identificado: ${result.combo.name}` : "Valores individuais cadastrados.")
        : "Preços aguardando definição pela empresa.";
    }
    return `<article class="vehicle-card" data-card="${vehicle.id}">
      <div class="vehicle-card-head">
        <div class="vehicle-title"><span class="vehicle-symbol">${type.icon}</span><div><h3>${type.label}</h3><p>VEÍCULO ${String(index + 1).padStart(2, "0")}</p></div></div>
        <div style="display:flex;align-items:center;gap:12px">
          <label class="sr-only" for="type-${vehicle.id}">Categoria do veículo ${index + 1}</label>
          <select id="type-${vehicle.id}" class="vehicle-type" data-type="${vehicle.id}" aria-label="Categoria do veículo ${index + 1}">${options}</select>
          ${vehicles.length > 1 ? `<button class="vehicle-remove" data-remove="${vehicle.id}" aria-label="Remover veículo ${index + 1}">×</button>` : ""}
        </div>
      </div>
      <div class="service-grid">${serviceCards}</div>
      <p class="vehicle-combo-note">${priceNote}</p>
    </article>`;
  }).join("");
  root.querySelectorAll("[data-vehicle][data-service]").forEach(input => input.addEventListener("change", event => {
    const vehicle = vehicles.find(item => item.id === Number(event.target.dataset.vehicle));
    if (!vehicle) return;
    const service = event.target.dataset.service;
    vehicle.selected = event.target.checked ? [...vehicle.selected, service] : vehicle.selected.filter(id => id !== service);
    renderVehicles(); renderSummary();
  }));
  root.querySelectorAll("[data-type]").forEach(select => select.addEventListener("change", event => {
    const vehicle = vehicles.find(item => item.id === Number(event.target.dataset.type));
    if (vehicle) { vehicle.type = event.target.value; vehicle.selected = []; renderVehicles(); renderSummary(); }
  }));
  root.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => {
    vehicles = vehicles.filter(item => item.id !== Number(button.dataset.remove)); renderVehicles(); renderSummary();
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
    return `<div class="summary-vehicle"><strong>${type.label} — veículo ${index + 1}</strong><ul>${names.map(name => `<li>${name}</li>`).join("")}</ul><div class="summary-price">${result.combo ? `Combo ${result.combo.name}: ` : ""}${priceText}</div></div>`;
  }).join("");
  $("#orderTotal").textContent = allKnown ? money(total) : "A definir";
  $("#whatsappButton").disabled = !CONFIG.whatsappNumber || !/^\\d{10,15}$/.test(CONFIG.whatsappNumber);
  $("#whatsappStatus").textContent = CONFIG.whatsappNumber ? "A solicitação será enviada para o WhatsApp oficial." : "O WhatsApp oficial será configurado próximo à inauguração.";
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
$("#addVehicle").addEventListener("click", () => { vehicles.push({ id: nextVehicleId++, type: "hatch", selected: [] }); renderVehicles(); renderSummary(); });
$("#whatsappButton").addEventListener("click", () => {
  if (!CONFIG.whatsappNumber) return;
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
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); }));
renderVehicles(); renderSummary();
