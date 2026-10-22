"use strict";
const data = window.MARIAGE;
const normalize = text => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr").replace(/[’'\-]/g, " ").replace(/\s+/g, " ").trim();
const element = (tag, text, cls) => { const el = document.createElement(tag); if (text !== undefined) el.textContent = text; if (cls) el.className = cls; return el; };
const search = document.querySelector("#search");
const results = document.querySelector("#results");
const status = document.querySelector("#status");
const clear = document.querySelector("#clear");
const details = [];
const english = () => window.mariageLangue === "en";
const guestLabel = n => english() ? `${n} guest${n === 1 ? "" : "s"}` : `${n} invité${n === 1 ? "" : "s"}`;
document.querySelector("#date").textContent = data.date;
document.querySelector("#demo").hidden = !data.demonstration;
document.querySelector("#count").textContent = `${data.tables.length} tables · ${data.tables.reduce((sum, table) => sum + table.invites.length, 0)} invités`;
data.tables.forEach((table, index) => {
  const card = element("details", undefined, "table"); card.id = `table-${index}`;
  const heading = element("summary");
  heading.append(element("span", `TABLE ${String(table.numero).padStart(2, "0")}`, "eyebrow"), element("span", table.nom, "table-name"), element("span", `${table.invites.length} invités`, "guest-count"), element("span", "+", "expand"));
  const list = element("ul", undefined, "guests");
  table.invites.forEach(name => list.append(element("li", name)));
  card.append(heading, list); document.querySelector("#tables").append(card); details.push(card);
});
function update() {
  const query = normalize(search.value); const tokens = query.split(" ").filter(Boolean);
  clear.hidden = !search.value; results.replaceChildren();
  if (!query) { status.textContent = ""; return; }
  const matches = [];
  data.tables.forEach((table, index) => table.invites.forEach(name => { if (tokens.every(token => normalize(name).includes(token))) matches.push({ name, table, index }); }));
  status.textContent = matches.length ? (english() ? `${guestLabel(matches.length)} found` : `${guestLabel(matches.length)} trouvé${matches.length > 1 ? "s" : ""}`) : (english() ? "No name found. Try another first name or ask our loved ones for help." : "Aucun nom trouvé. Essayez un autre prénom ou demandez à nos proches de vous aider.");
  matches.forEach(({ name, table, index }) => {
    const item = element("li"); const button = element("button", undefined, "result"); button.type = "button";
    button.append(element("span", name), element("span", `Table ${table.numero} · ${table.nom} ↗`, "result-table"));
    button.addEventListener("click", () => { const card = details[index]; card.open = true; card.querySelector("summary").focus(); card.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" }); });
    item.append(button); results.append(item);
  });
}
search.addEventListener("input", update);
clear.addEventListener("click", () => { search.value = ""; update(); search.focus(); });
function refreshLanguage() {
  document.querySelector("#date").textContent = english() && data.date === "29 mai 2027" ? "29 May 2027" : data.date;
  document.querySelector("#count").textContent = `${data.tables.length} tables · ${guestLabel(data.tables.reduce((sum, table) => sum + table.invites.length, 0))}`;
  details.forEach((card, i) => { card.querySelector(".guest-count").textContent = guestLabel(data.tables[i].invites.length); });
  update();
}
document.addEventListener("mariage:language", refreshLanguage);
refreshLanguage();
