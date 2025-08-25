/* ========================================================================== */
/*                              LAYOUT CODING                                 */
/* ========================================================================== */
const qs = s => document.querySelector(s);
const qa = s => document.querySelectorAll(s);
const binderModal = qs('#binderModal');
const sellModal = qs('#sellModal');

qs('#openBinder').addEventListener('click', () => {
    binderModal.classList.remove('hidden');
    binderModal.setAttribute('aria-hidden','false');
    renderSpread();

});

function closeBinder(){ binderModal.classList.add('hidden'); binderModal.setAttribute('aria-hidden','true'); }
qs('#btnCloseBinder').addEventListener('click', closeBinder);
binderModal.addEventListener('click', e => { if (e.target.dataset.close === 'binder') closeBinder(); });

function openSell(){ sellModal.classList.remove('hidden'); sellModal.setAttribute('aria-hidden','false'); }
function closeSell(){ sellModal.classList.add('hidden'); sellModal.setAttribute('aria-hidden','true'); }
qs('#sellCancel').addEventListener('click', closeSell);
sellModal.addEventListener('click', e => { if (e.target.dataset.close === 'sell') closeSell(); });
qs('#sellConfirm').addEventListener('click', ()=>{ console.log('Confirm sell (stub)'); closeSell(); });

// Populate all slots on both pages with placeholder pocket
document.querySelectorAll('.slot').forEach((el)=>{
	el.innerHTML = `
            <div class="slot">
                <div class="pocket" onclick="openSellDialog()">
                <div class="price-chip">$0.00</div>
                <div class="qty-chip">x0</div>
                <div class="thumb"></div>
                </div>
            </div>`;
});

function openSellDialog(){
  // Open your sell modal here
  alert("Sell card dialog goes here!");
}

/* ========================================================================== */
/*                             TIER MAPPING                                   */
/* ========================================================================== */

const CHAR_TIER = {
	ichika:1, saki:1, honami:1, shiho:1, minori:1, haruka:1,
	airi:2, shizuku:1, kohane:2, an:1,
	akito:3, toya:3, tsukasa:3, emu:2, nene:2, rui:3,
	kanade:3, mafuyu:3, ena:3, mizuki:3,
	miku:2, rin:1, len:1, luka:1, meiko:1, kaito:1
};

const PRICE_UNTRAINED = 0.90;
const PRICE_TRAINED   = { 1:1.00, 2:2.00, 3:2.50 };
const PRICE_FOIL      = { 1:5.00, 2:9.00, 3:16.00 };

function parseCardFile(filename){
  const clean   = filename.replace(/\.(png|jpg)$/i, "");
  const parts   = clean.split("_");   // ["1A","12","toya","untrained"]
  const vol     = parts[0];           // "1A"
  const num     = parseInt(parts[1], 10);
  const char    = parts[2];
  const variant = parts.slice(3).join("_"); // "untrained", "trained", "trained_foil", "tkt"

  const tier = CHAR_TIER[char.toLowerCase()] ?? 1;
  const foil = variant.includes("foil");

let price = PRICE_UNTRAINED;
if (foil || variant === "tkt") {
	price = PRICE_FOIL[tier];
} else if (variant === "trained") {
	price = PRICE_TRAINED[tier];
}

return {
// now includes volume in the ID → "1A_12_untrained"
id: `${vol}_${num}_${variant}`,    
volume: vol,
char,
num,
variant,
foil,
tkt: variant === "tkt",
img: `images/${vol}/${filename}`,
price: +price.toFixed(2)
};
}

/* ========================================================================== */
/*                                FILELIST                                    */
/* ========================================================================== */

const fileList1A = [
  "1A_01_ichika_tkt.png",
  "1A_02_saki_trained.png",
  "1A_02_saki_trained_foil.png",
  "1A_02_saki_untrained.png",
  "1A_03_honami_trained.png",
  "1A_03_honami_trained_foil.png",
  "1A_03_honami_untrained.png",
  "1A_04_shiho_trained.png",
  "1A_04_shiho_trained_foil.png",
  "1A_04_shiho_untrained.png",
  "1A_09_kohane_trained.png",
  "1A_09_kohane_trained_foil.png",
  "1A_09_kohane_untrained.png",
  "1A_10_an_trained.png",
  "1A_10_an_trained_foil.png",
  "1A_10_an_untrained.png",
  "1A_11_akito_trained.png",
  "1A_11_akito_trained_foil.png",
  "1A_11_akito_untrained.png",
  "1A_12_toya_trained.png",
  "1A_12_toya_trained_foil.png",
  "1A_12_toya_untrained.png",
  "1A_23_len_tkt.png",
  "1A_24_luka_trained.png",
  "1A_24_luka_trained_foil.png",
  "1A_24_luka_untrained.png"
]

const fileList1B = [
  "1B_05_minori_trained.png",
  "1B_05_minori_trained_foil.png",
  "1B_05_minori_untrained.png",
  "1B_06_haruka_tkt.png",
  "1B_07_airi_trained.png",
  "1B_07_airi_trained_foil.png",
  "1B_07_airi_untrained.png",
  "1B_08_shizuku_trained.png",
  "1B_08_shizuku_trained_foil.png",
  "1B_08_shizuku_untrained.png",
  "1B_13_tsukasa_tkt.png",
  "1B_14_emu_trained.png",
  "1B_14_emu_trained_foil.png",
  "1B_14_emu_untrained.png",
  "1B_15_nene_trained.png",
  "1B_15_nene_trained_foil.png",
  "1B_15_nene_untrained.png",
  "1B_16_rui_trained.png",
  "1B_16_rui_trained_foil.png",
  "1B_16_rui_untrained.png",
  "1B_22_rin_trained.png",
  "1B_22_rin_trained_foil.png",
  "1B_22_rin_untrained.png",
  "1B_23_len_trained.png",
  "1B_23_len_trained_foil.png",
  "1B_23_len_untrained.png"
]

const fileList1C = [
  "1C_02_saki_trained.png",
  "1C_02_saki_trained_foil.png",
  "1C_02_saki_untrained.png",
  "1C_03_honami_tkt.png",
  "1C_12_toya_trained.png",
  "1C_12_toya_trained_foil.png",
  "1C_12_toya_untrained.png",
  "1C_13_tsukasa_trained.png",
  "1C_13_tsukasa_trained_foil.png",
  "1C_13_tsukasa_untrained.png",
  "1C_17_kanade_trained.png",
  "1C_17_kanade_trained_foil.png",
  "1C_17_kanade_untrained.png",
  "1C_18_mafuyu_tkt.png",
  "1C_19_ena_trained.png",
  "1C_19_ena_trained_foil.png",
  "1C_19_ena_untrained.png",
  "1C_20_mizuki_trained.png",
  "1C_20_mizuki_trained_foil.png",
  "1C_20_mizuki_untrained.png",
  "1C_24_luka_trained.png",
  "1C_24_luka_trained_foil.png",
  "1C_24_luka_untrained.png",
  "1C_25_meiko_trained.png",
  "1C_25_meiko_trained_foil.png",
  "1C_25_meiko_untrained.png"
];

const VAR_ORDER = { untrained:0, trained:1, trained_foil:2, tkt:3 };

function buildVolume(fileList){
  return fileList
    .map(parseCardFile)
    .sort((a,b)=>{
      if (a.tkt && !b.tkt) return 1;
      if (b.tkt && !a.tkt) return -1;
      if (a.num !== b.num) return a.num - b.num;
      return (VAR_ORDER[a.variant] ?? 99) - (VAR_ORDER[b.variant] ?? 99);
    });
}

const volumes = {
  "1A": buildVolume(fileList1A),
  "1B": buildVolume(fileList1B),
  "1C": buildVolume(fileList1C),
};

Object.defineProperties(volumes, {
	get:  { value: function(key){ return this[key] || []; }, enumerable: false },
	has:  { value: function(key){ return Object.prototype.hasOwnProperty.call(this, key); }, enumerable: false },
	keys: { value: function(){ return Object.keys(this); }, enumerable: false }
});

// key for localStorage
const BOX_LS = 'cpick_active_box';

// populate options
const keys = Object.keys(volumes);
for (const key of keys){
	const opt = document.createElement('option');
	opt.value = key;
	opt.textContent = key;
	boxSelect.appendChild(opt);
}

// init selected value
const saved = localStorage.getItem(BOX_LS);
const initial = (saved && keys.includes(saved)) ? saved : (keys[0] || '');
boxSelect.value = initial;
let activeBox = initial;

// handle changes
boxSelect.addEventListener('change', e => {
	activeBox = e.target.value;
	localStorage.setItem(BOX_LS, activeBox);
});

/* ========================================================================== */
/*                                VOL LAYOUTS                                 */
/* ========================================================================== */

// Character ID ranges reminder:
// leo: 1–4, mmj: 5–8, vbs: 9–12, wxs: 13–16, n25: 17–20   // vocals: 21–26

const PAGE_SIZE = 13;      // 13 cards per page
const PAGES_PER_VOL = 2;   // exactly 2 pages per volume

const PAGE_ORDER = {
"1A": [
    { cols: [2, 3, 4, 24],  tkt: 1 },   
    { cols: [9,10,11, 12], tkt: 23 },   
  ],
"1B": [
    { cols: [5,7,8,22], tkt: 6 },   
    { cols: [14,15,16,23], tkt: 13 },   
  ],
"1C": [
    { cols: [2,12,13,24], tkt: 3 },   
    { cols: [17,19,20,25], tkt: 18 },   
  ]
};

/* ========= STATE ========= */
let spreadIndex = 0;          // 0 = first volume (e.g., 1A)
let activeVolume = "1A";      // will be synced from spreadIndex

// binder state (cardId → qty)
const BINDER_LS = 'cpick_binder';
let binder = JSON.parse(localStorage.getItem(BINDER_LS) || '{}');

/* ========================================================================== */
/*                           POPULATING BINDER                                */
/* ========================================================================== */
// Only include volumes that have cards AND a page order config (2 pages)
function volumeKeys() {
  return Object.keys(volumes).filter(k => (volumes[k]?.length ?? 0) > 0 && Array.isArray(PAGE_ORDER[k]) && PAGE_ORDER[k].length >= 2);
}

function buildIndex(cards){
  // num -> { untrained, trained, trained_foil, tkt }
  const byNum = new Map();
  for (const c of cards){
    if (!byNum.has(c.num)) byNum.set(c.num, {});
    byNum.get(c.num)[c.variant] = c;
  }
  return byNum;
}

// Ensure binder container exists
function ensureBinderDom() {
  let spread = document.querySelector(".binder-spread");
  if (!spread) {
    spread = document.createElement("div");
    spread.className = "binder-spread";
    document.body.appendChild(spread);
  }
  let spine = spread.querySelector(".binder-spine");
  if (!spine) {
    spine = document.createElement("div");
    spine.className = "binder-spine";
    spread.appendChild(spine);
  }
  return { spread, spine };
}

function renderBinderPage(allCards, pageIndex, volumeKey = activeVolume) {
  const byNum  = buildIndex(allCards); // num -> {untrained, trained, trained_foil, tkt}
  const pageCfg = PAGE_ORDER[volumeKey]?.[pageIndex];
  const pageEl  = document.createElement("section");
  pageEl.className = "binder-page";

  if (!pageCfg) {
    // no config -> return empty page
    return pageEl;
  }

  // Ensure exactly 4 columns; pad with nulls if less
  const cols = (pageCfg.cols || []).slice(0, 4);
  while (cols.length < 4) cols.push(null);

  // Helper to pick a variant or null if missing
  const get = (n, v) => (n != null ? (byNum.get(n)?.[v] || null) : null);

  const row1 = cols.map(n => get(n, "untrained"));
  const row2 = cols.map(n => get(n, "trained"));
  const row3 = cols.map(n => get(n, "trained_foil"));

  // Ticket in last cell (explicit ID). If absent in this volume, leave blank.
  const tktId = pageCfg.tkt;
  const tktCard = (tktId != null) ? (byNum.get(tktId)?.tkt || null) : null;
  row3.push(tktCard);

  const sheet = document.createElement("div");
  sheet.className = "sheet";

  [[row1, "row4"], [row2, "row4"], [row3, "row5"]].forEach(([rowCards, rowCls], rIdx) => {
    const rowEl = document.createElement("div");
    rowEl.className = `row ${rowCls}`;

    rowCards.forEach((card, cIdx) => {
      const slotEl = document.createElement("div");
      slotEl.className = "slot";
      // useful for debugging layout
      slotEl.dataset.row = String(rIdx + 1);
      slotEl.dataset.col = String(cIdx + 1);

      const pocket = document.createElement("div");
      pocket.className = "pocket";

    if (card) {
        const qtyVal = binder[card.id] || 0;

        // image
        const img = document.createElement("img");
        img.src = card.img;
        img.alt = card.name || card.id;
        img.className = qtyVal > 0 ? "card-img owned" : "card-img peek-img";
        pocket.appendChild(img);

        // price chip
        const priceChip = document.createElement("div");
        priceChip.className = "price-chip";
        priceChip.textContent = qtyVal > 0 ? `$${Number(card.price ?? 1).toFixed(2)}` : "$?";

        if (qtyVal > 0) {
            // 👉 make the pocket clickable and identifiable
            pocket.dataset.id   = card.id;          // <-- for lookup
            pocket.classList.add("owned");          // <-- for styling / event target
            pocket.tabIndex = 0;                    // keyboard focusable
            pocket.setAttribute("role","button");
            pocket.setAttribute("aria-label", `Sell ${card.char} ${card.variant}`);

            const qtyChip = document.createElement("div");
            qtyChip.className = "qty-chip";
            qtyChip.textContent = `x${qtyVal}`;

            if (card.variant === "trained_foil") {
                const foil = document.createElement("div");
                foil.className = "foil-chip";
                foil.textContent = "FOIL";
                pocket.appendChild(foil);
            }

            pocket.append(priceChip, qtyChip);
        } else {
            pocket.classList.add("reveal-on-hover");
            pocket.append(priceChip);
        }
    } else {
    // truly empty slot
    pocket.style.display = "grid";
    pocket.style.placeItems = "center";
    pocket.textContent = "–";
    pocket.style.color = "#778";
    }

      slotEl.appendChild(pocket);
      rowEl.appendChild(slotEl);
    });

    sheet.appendChild(rowEl);
  });

  pageEl.appendChild(sheet);
  return pageEl;
}



document.addEventListener("DOMContentLoaded", () => {
	renderSpread();
});

function renderSpread() {
  const { spread, spine } = ensureBinderDom();

  // pick current volume from spreadIndex
  const keys = volumeKeys();
  if (!keys.length) return;
  if (spreadIndex < 0) spreadIndex = 0;
  if (spreadIndex >= keys.length) spreadIndex = keys.length - 1;
  activeVolume = keys[spreadIndex];

  // clear old pages/label
  spread.querySelectorAll(".binder-page, .volume-label").forEach(n => n.remove());

  const volCards = volumes[activeVolume] || [];
  const leftPageEl  = renderBinderPage(volCards, 0, activeVolume);
  const rightPageEl = renderBinderPage(volCards, 1, activeVolume);

  spread.insertBefore(leftPageEl, spine);
  spread.insertBefore(rightPageEl, spine.nextSibling);

  // bottom center label
  const label = document.createElement("div");
  label.className = "volume-label";
  label.textContent = activeVolume;
  spread.appendChild(label);
}

/* ========= NAVIGATION ========= */

function prevSpread() {
  if (spreadIndex > 0) {
    spreadIndex--;
    renderSpread();
  }
}
function nextSpread() {
  const keys = volumeKeys();
  if (spreadIndex + 1 < keys.length) {
    spreadIndex++;
    renderSpread();
  }
}

document.getElementById("btnPrevPage")?.addEventListener("click", prevSpread);
document.getElementById("btnNextPage")?.addEventListener("click", nextSpread);


window.addEventListener("keydown", (e) => {
	const k = e.key.toLowerCase();
	if (k === "a") prevSpread();
	if (k === "b") nextSpread();
	if (k === "q") document.getElementById("btnCloseBinder")?.click();
});

document.addEventListener("DOMContentLoaded", renderSpread);

/* ========================================================================== */
/* ========================================================================== */
/*                              GAME CODE                                     */
/* ========================================================================== */
/* ========================================================================== */





/* ========================================================================== */
/*                              RESET CODE                                    */
/* ========================================================================== */
function clearRollLog(){
	if (rollGrid) rollGrid.innerHTML = '';
}

// Reset save: clears localStorage and resets money
document.getElementById("clearroll").addEventListener("click", () => {
    clearRollLog();
});


function resetSave() {
  // clear in-memory binder
  binder = {};
  // clear from localStorage
  localStorage.removeItem("cpick_binder");
  // refresh binder view
  renderSpread();
  clearRollLog();
}

// Reset save: clears localStorage and resets money
document.getElementById("resetSave").addEventListener("click", () => {
    /*
	if (confirm("Are you sure you want to reset your save?")) {
		localStorage.removeItem(MONEY_KEY);
		// later: also remove binder storage keys
		money = 30;
		saveMoney();
		updateMoneyUI();
		alert("Save reset! You now have $30 again.");
	}
    */

    localStorage.removeItem(MONEY_KEY);
		// later: also remove binder storage keysq
		money = 30;
		saveMoney();
		updateMoneyUI();
        resetSave();
});

/* ========================================================================== */
/*                              MONEY SYSTEM                                  */
/* ========================================================================== */
const MONEY_KEY = "cpick_money";

// Try to load from localStorage
let money = parseFloat(localStorage.getItem(MONEY_KEY));

// If nothing saved, start at $30
if (isNaN(money)) {
	money = 30;
	localStorage.setItem(MONEY_KEY, money); // save it immediately
}

// Grab money chip element
const moneyEl = document.getElementById("money");

// Update UI right away
updateMoneyUI();

function updateMoneyUI(){
	moneyEl.textContent = `$${money.toFixed(2)}`;
}

function saveMoney(){
	localStorage.setItem(MONEY_KEY, money);
}

function spend(amount){
	if (money >= amount){
		money -= amount;
		saveMoney();
		updateMoneyUI();
		return true;
	}
	return false;
}

function earn(amount){
	money += amount;
	saveMoney();
	updateMoneyUI();
}

// --- Pack buttons ---
const open1Btn = document.getElementById("open1");
const open10Btn = document.getElementById("open10");

open1Btn.addEventListener("click", () => {
	if (spend(3)) {
		console.log("Opened 1 pack (2 cards)");
		openPacks(1);
	} else {
		alert("Not enough money for a pack!");
	}
});

open10Btn.addEventListener("click", () => {
	if (spend(30)) {
		console.log("Opened 1 box (10 packs, 20 cards)");
        openPacks(10, { useBox:true })
	} else {
		alert("Not enough money for a box!");
	}
});

/* ========================================================================== */
/*                              SAVE TO COLLECTION                            */
/* ========================================================================== */
function saveBinder(){ localStorage.setItem(BINDER_LS, JSON.stringify(binder)); }
function qtyOf(id){ return binder[id] || 0; }

// add +1 to an existing card (or create if first time)
function addToBinder(cardOrId, delta=1){
	const id = typeof cardOrId === 'string' ? cardOrId : (cardOrId.id || cardOrId.meta?.id);
	if (!id) return;
	binder[id] = Math.max(0, (binder[id] || 0) + delta);
	if (binder[id] === 0) delete binder[id];
	saveBinder();
	updateQtyChip(id);
}

// update UI badges for one card
function updateQtyChip(cardId){
	const qtyEl = document.querySelector(`[data-card-id="${cardId}"] .qtyVal`);
	if (qtyEl) qtyEl.textContent = qtyOf(cardId);
	// optional: show "$?" until owned
	const priceEl = document.querySelector(`[data-card-id="${cardId}"] .priceVal`);
	if (priceEl){
		const owned = qtyOf(cardId) > 0;
		priceEl.textContent = owned ? (priceEl.dataset.price || priceEl.textContent) : '$?';
	}
}

/* ========================================================================== */
/*                              OPENING 1 PACK                                */
/* ========================================================================== */
function drawPackFromSeries(boxName){
	const pool = (volumes.get(boxName) || []).filter(c => !String(c.id||c.meta?.id||c.name).includes("tkt"));
	const { foil, normal } = splitPoolByFoil(pool);

	const isFoilPack = Math.random() < 0.20;
	const foilSlot = Math.random() < 0.5 ? 0 : 1;

	let a=null, b=null;

	if (isFoilPack && foil.length && normal.length){
		if (foilSlot === 0){
			a = pickOne(foil);
			do { b = pickOne(normal); } while (b === a && normal.length > 1);
		}else{
			a = pickOne(normal);
			do { b = pickOne(foil); } while (b === a && foil.length > 1);
		}
	}else{
		const base = normal.length ? normal : pool;
		a = pickOne(base);
		do { b = pickOne(base); } while (b === a && base.length > 1);
	}

	return [a,b];
}

function splitPoolByFoil(pool){
	const foil = [], normal = [];
	for (const c of (pool || [])){
		const variant = String(
			c?.meta?.variant ?? c?.variant ?? (c?.foil ? 'foil' : '')
		).toLowerCase();
		(variant.endsWith('foil') ? foil : normal).push(c);
	}
	return { foil, normal };
}
function pickOne(arr){ return arr[Math.floor(Math.random()*arr.length)] }


// helper
const getImg = c => c?.img || c?.url || c?.src || '';

async function openPacks(countPacks, { useBox=false } = {}){
	if (useBox){
		const res = openBoxFromSeries(activeBox);
		if (res?.error){ alert(res.error); return; }

		for (const [A, B] of res.packs){
			await revealPack(getImg(A), getImg(B));
			addPackResults([A,B], activeBox);
			addToBinder(A); addToBinder(B);
		}
        revealPack()
		await showTktChoice(res.bonus); // bonus at end
		return;
	}

	// legacy: random packs (no box constraints)
	for (let p=0; p<countPacks; p++){
		const [A, B] = drawPackFromSeries(activeBox);
		await revealPack(getImg(A), getImg(B));
		addPackResults([A,B], activeBox);
		addToBinder(A); addToBinder(B);
	}
}

const modal=document.getElementById('revealModal');
const slot1=document.getElementById('slot1');
const slot2=document.getElementById('slot2');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

// Reveal two cards, then auto-hide
async function revealPack(imgA,imgB,{between=450, linger=900, fade=300}={}){
    slot1.querySelector('img').src=imgA||'';
    slot2.querySelector('img').src=imgB||'';
    slot1.classList.remove('show'); slot2.classList.remove('show');

    modal.classList.add('show'); modal.classList.remove('hidden'); modal.setAttribute('aria-hidden','false');
    await sleep(60);  slot1.classList.add('show');
    await sleep(between); slot2.classList.add('show');
    await sleep(linger);                 // keep on screen briefly
    modal.style.transitionDuration=fade+'ms';
    modal.classList.remove('show');     // fade out
    await sleep(fade);
    modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true');
}

// ==== Roll Log (new) ====
const resultsEl = document.getElementById('results');
const activeBoxBadge = document.getElementById('activeBox');
const MAX_LOG_ITEMS = 100;

function addResult(card, boxName = activeBox){
	const grid = document.getElementById('rollGrid');
	if (!grid) return;

	const img = card?.url || card?.img || '';
	const name = card?.meta?.name ?? card?.name ?? 'Card';
	const id = card?.meta?.id ?? card?.id ?? '';
	const setName = card?.meta?.set ?? boxName ?? '';
	const variant = String(card?.meta?.variant ?? card?.variant ?? 'normal').replace(/_/g,' / ');

	const label = `${name}${id ? ` · ${id}` : ''} · ${variant}${setName ? ` • ${setName}` : ''}`;

	const el = document.createElement('div');
	el.className = 'card-tile';
	el.innerHTML = `
		<div class="card-frame"><img src="${img}" alt="${name}"></div>
		<small class="muted">${label}</small>
	`;
	grid.prepend(el); // newest first

	// trim log (use grid, not resultsEl)
	const MAX_LOG_ITEMS = 200; // or your constant
	while (grid.children.length > MAX_LOG_ITEMS) grid.lastElementChild.remove();

	if (activeBoxBadge) activeBoxBadge.textContent = 'Newest first';
}

// Helper to log both cards of a pack at once (newest first)
function addPackResults(cards, boxName = activeBox){
	// log second then first so the first shows on top if you prefer that order
	if (cards?.[1]) addResult(cards[1], boxName);
	if (cards?.[0]) addResult(cards[0], boxName);
}

/* ========================================================================== */
/*                              OPENING 1 BOX                                */
/* ========================================================================== */
/* ======================= classifiers (parsed fields) ======================= */
const isFoil      = c => !!c.foil;
const isUntrained = c => c.variant === 'untrained';
const isTrained   = c => c.variant === 'trained';
const noTkt       = c => !c.tkt;
const charOf      = c => String(c.char).toLowerCase();

/* ================================ helpers ================================= */
const rnd = n => Math.floor(Math.random()*n);
const shuffle = arr => { for (let i=arr.length-1;i>0;i--){ const j=rnd(i+1); [arr[i],arr[j]]=[arr[j],arr[i]] } return arr; };

const sameChar = (a,b) => charOf(a) === charOf(b);

function pickUniqueByChar(pool, n){
	const byChar = new Map(); // char -> [cards]
	for (const c of pool){
		const ch = charOf(c);
		if (!byChar.has(ch)) byChar.set(ch, []);
		byChar.get(ch).push(c);
	}
	const out = [];
	for (const ch of shuffle([...byChar.keys()])){
		if (out.length >= n) break;
		const list = byChar.get(ch);
		out.push(list[rnd(list.length)]);
	}
	return out;
}

// pair so no pack has untrained+trained of the same char
function pairIntoPacks(cards){
	const list = shuffle(cards.slice());
	const packs = [];
	for (let i=0; i<list.length; i+=2){
		if (i+1 >= list.length) break;
		let A = list[i], B = list[i+1];

		const violates = sameChar(A,B) && (
			(isUntrained(A)&&isTrained(B)) || (isTrained(A)&&isUntrained(B))
		);

		if (violates){
			let swapped = false;
			for (let j=i+2; j<list.length; j++){
				const C = list[j];
				const bad = sameChar(A,C) && (
					(isUntrained(A)&&isTrained(C)) || (isTrained(A)&&isUntrained(C))
				);
				if (!bad){ [list[i+1], list[j]] = [list[j], list[i+1]]; B = list[i+1]; swapped = true; break; }
			}
			if (!swapped){
				const tail = list.splice(i, list.length - i);
				shuffle(tail); list.push(...tail); i -= 2; continue; // retry
			}
		}
		packs.push([A,B]);
	}
	return packs;
}

/* ============================== open one box ============================== */
/**
 * 10 packs (20 cards):
 *  - 8 unique-by-char UNTRAINED (non-foil)
 *  - 8 unique-by-char TRAINED   (non-foil)
 *  - 2 random dupes from those 16
 *  - 2 random FOILS
 *  - Never pair U+T of same char in a single pack
 *  - Return bonus ticket choice separately
 */
function openBoxFromSeries(boxName){
	const pool      = (volumes.get(boxName) || []).filter(noTkt);
	const untrained = pool.filter(isUntrained);
	const trained   = pool.filter(isTrained);
	const foils     = pool.filter(isFoil);

	const uniqU = new Set(untrained.map(charOf)).size;
	const uniqT = new Set(trained.map(charOf)).size;

	if (uniqU < 8) return { error:`Not enough unique UNTRAINED (have ${uniqU}, need 8).` };
	if (uniqT < 8) return { error:`Not enough unique TRAINED (have ${uniqT}, need 8).` };
	if (foils.length < 2) return { error:`Not enough FOILS (have ${foils.length}, need 2).` };

	const picksU = pickUniqueByChar(untrained, 8);
	const picksT = pickUniqueByChar(trained,   8);

	const sixteen = [...picksU, ...picksT];

	// 2 random dupes (exact repeats allowed)
	const dupes = [sixteen[rnd(sixteen.length)], sixteen[rnd(sixteen.length)]];

	// 2 random foils
	const foilPool = foils.slice();
	const foilPicks = [
		foilPool.splice(rnd(foilPool.length),1)[0],
		foilPool.splice(rnd(foilPool.length),1)[0],
	];

	const all = [...sixteen, ...dupes, ...foilPicks];
	const packs = pairIntoPacks(all);

	const tkts = getBoxTkts(boxName);
    const bonus = tkts.length ? { type:'tkt_choice', options: tkts.slice(0,2) } : null;
	return { packs, bonus };
}

// tickets available in a given box (e.g., 1A has ichika_tkt & len_tkt)
function getBoxTkts(boxName){
	return (volumes.get(boxName) || []).filter(c => c.tkt);
}

async function showTktChoice(bonus){
	if (!bonus || bonus.type !== 'tkt_choice' || !bonus.options?.length) return;

	// inject tiny CSS once
	if (!document.getElementById('tktChoiceCSS')){
		const css = document.createElement('style'); css.id='tktChoiceCSS';
		css.textContent = `
		.tktOverlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:grid;place-items:center;z-index:9999}
		.tktPanel{background:#101424;border:1px solid #20263e;border-radius:16px;padding:16px 18px;min-width:280px}
		.tktGrid{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:10px}
		.tktCard{background:none;border:none;cursor:pointer;padding:0;outline:none}
		.tktCard img{width:160px;max-width:38vw;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.45)}
		.tktCard:focus img,.tktCard:hover img{transform:translateY(-2px);transition:.15s}
		`; document.head.appendChild(css);
	}

	const overlay = document.createElement('div'); overlay.className='tktOverlay';
	const panel   = document.createElement('div'); panel.className='tktPanel';
	panel.innerHTML = `<h3 style="margin:0 0 6px">Bonus Ticket</h3><div class="muted">Choose one:</div>`;
	const grid = document.createElement('div'); grid.className='tktGrid';

	const choose = (card) => {
		addPackResults([card], activeBox);   // log it
		addToBinder(card);                   // grant it
		document.body.removeChild(overlay);
	};

	for (const card of bonus.options.slice(0,2)){
		const btn = document.createElement('button'); btn.className='tktCard';
		const img = new Image(); img.src = card.img; img.alt = card.id || card.char || 'ticket';
		btn.appendChild(img);
		btn.addEventListener('click', ()=>choose(card));
		grid.appendChild(btn);
	}
	panel.appendChild(grid);
	overlay.appendChild(panel);
	document.body.appendChild(overlay);
}

/* ========================================================================== */
/*                              SELLING                                       */
/* ========================================================================== */
function binderCount(id){ return +binder[id] || 0; }

// ===== centered-in-binder sell modal (bigger text, green confirm) =====
function ensureSellCSS(){
	if (document.getElementById('sellCSS4')) return;
	const css = document.createElement('style'); css.id='sellCSS4';
	css.textContent = `
	:root{ --ink:#e8ecff; --muted:#a4acc7; --line:#20263e; --panel:#0f1424;
	       --success:#14532d; --successHi:#166534; }
	/* overlay is bounded to binder area */
    .sellOverlay{position:fixed; inset:0; z-index:10000;}
    .sellOverlay .backdrop{position:absolute; inset:0; background:rgba(0,0,0,.45);}
    .sellPanel{
        position:fixed; /* crucial: fixed, not absolute */
        max-width:780px; width:min(92vw,780px);
        background:#0f1320; color:#e8ecff; border:1px solid #232947;
        border-radius:16px; box-shadow:0 22px 60px rgba(0,0,0,.6); padding:18px;
    }
	/* two-column layout: image left, everything else right */
	.sellBody{display:grid; grid-template-columns:180px 1fr; gap:18px; align-items:center}
	.sellImg{width:180px; border-radius:14px; box-shadow:0 12px 40px rgba(0,0,0,.45)}
	/* top info block */
	.sellTitle{margin:0 0 2px; font-size:30px; font-weight:850}
	.kv{display:flex; justify-content:space-between; gap:16px; margin:4px 0}
	.kv .label{color:var(--muted)}
	.kv .val{font-weight:750}
	/* qty + buttons inline on the right */
	.sellRight .controls{display:flex; align-items:center; gap:12px; margin-top:12px}
	.qtyCtrl{display:flex; align-items:center; gap:8px}
	.qtyBtn{width:36px; height:36px; border-radius:10px; border:1px solid var(--line);
		background:#11152a; color:var(--ink); cursor:pointer; font-size:18px}
	.qtyInput{width:92px; text-align:center; padding:8px; border-radius:10px;
		border:1px solid var(--line); background:#0b0f1c; color:var(--ink); font-weight:700}
	.total{margin-left:auto}
	/* actions inline (right of image) */
	.actions{display:flex; gap:10px; justify-content:flex-end; margin-top:12px}
	.btn{padding:10px 14px; border-radius:12px; border:1px solid var(--line);
		background:#11152a; color:var(--ink); cursor:pointer; font-weight:800}
	.btn.ghost{background:transparent}
	.btn.success{background:var(--success); border-color:var(--success); color:#eafff3}
	.btn.success:hover{background:var(--successHi); border-color:var(--successHi)}
	/* make sure clicks inside modal always work */
	.sellPanel, .sellPanel * { pointer-events:auto }
	`;
	document.head.appendChild(css);
}

// Helper: get the binder rect; fallback to viewport
function getBinderRect(){
	const binder = document.querySelector('.binder') ||
		document.getElementById('binderRoot') ||
		document.querySelector('.binder-wrap') ||
		document.querySelector('.binder-page')?.parentElement;
	if (!binder){
		return {left:0, top:0, width:window.innerWidth, height:window.innerHeight};
	}
	const r = binder.getBoundingClientRect();
	return { left: r.left + window.scrollX, top: r.top + window.scrollY, width: r.width, height: r.height };
}

function openSellModal(card){
	ensureSellCSS();
	const owned = (binder?.[card.id] ?? 0); if (!owned) return;

	const overlay = document.createElement('div');
	overlay.className = 'sellOverlay';          // fixed, covers viewport
	overlay.innerHTML = `
		<div class="backdrop" data-action="cancel"></div>
		<div class="sellPanel" role="dialog" aria-modal="true">
			<div class="sellBody">
				<img class="sellImg" src="${card.img}" alt="">
				<div class="sellRight">
					<h3 class="sellTitle">${card.char} — ${card.variant}${card.foil?' (foil)':''}</h3>
					<div class="kv"><span class="label">Price</span><span class="val">$${card.price.toFixed(2)}</span></div>
					<div class="kv"><span class="label">You own</span><span class="val">x${owned}</span></div>
					<div class="controls">
						<span class="label">Qty to sell</span>
						<div class="qtyCtrl">
							<button class="qtyBtn" data-action="minus">−</button>
							<input class="qtyInput" id="sellQty" type="number" min="1" max="${owned}" value="1" step="1">
							<button class="qtyBtn" data-action="plus">+</button>
						</div>
						<div class="total">Total: <b id="sellTotal">$${card.price.toFixed(2)}</b></div>
					</div>
					<div class="actions">
						<button class="btn ghost" data-action="cancel">Cancel</button>
						<button class="btn success" data-action="confirm">Confirm Sell</button>
					</div>
				</div>
			</div>
		</div>`;
	document.body.appendChild(overlay);

	// center panel inside binder (not the whole screen)
	const panel = overlay.querySelector('.sellPanel');

	const qty   = overlay.querySelector('#sellQty');
	const total = overlay.querySelector('#sellTotal');
	const clamp = v => Math.max(1, Math.min(owned, parseInt(v||'1',10)));
	const update = ()=>{ const q=clamp(qty.value); qty.value=q; total.textContent='$'+(q*card.price).toFixed(2); };

	function close(){
		overlay.remove();
	}

	function confirm(){
		const q = clamp(qty.value);
		binder[card.id] = (binder[card.id]||0) - q;
		if (binder[card.id] <= 0) delete binder[card.id];
		localStorage.setItem('cpick_binder', JSON.stringify(binder));
		earn(card.price * q); // your money func
        renderSpread();
		close();
	}

	// backdrop click closes
	overlay.addEventListener('click', (e)=>{
		if (e.target === overlay) close();
		const btn = e.target.closest('[data-action]'); if (!btn) return;
		switch(btn.dataset.action){
			case 'minus': qty.value = clamp(qty.value-1); update(); break;
			case 'plus':  qty.value = clamp(+qty.value+1); update(); break;
			case 'cancel': close(); break;
			case 'confirm': confirm(); break;
		}
	});
	document.addEventListener('keydown', function onEsc(e){
		if (e.key === 'Escape'){ close(); document.removeEventListener('keydown', onEsc); }
	});

	update(); qty.focus();
}

// --- volumes adapters (works with Map or plain object) ---
const volGet = k => (volumes instanceof Map ? volumes.get(k) : volumes[k]);
const volEntries = () => (volumes instanceof Map ? volumes.entries() : Object.entries(volumes));

// rebuild id -> card index (call this AFTER volumes is populated)
let cardIndex = {};
function buildCardIndex(){
	cardIndex = {};
	for (const [vol, list] of volEntries()){
		for (const c of list) cardIndex[c.id] = c;
	}
}
buildCardIndex();

// container that holds your pages (adjust selector)
const binderRoot = document.querySelector('.binder') || document.getElementById('binderGrid');

function onBinderActivate(e){
	const el = e.target.closest('.pocket.owned[data-id]');
	if (!el || !binderRoot.contains(el)) return;
	const id = el.dataset.id;
	const card = cardIndex[id];
	if (card) openSellModal(card);   // uses the sell modal from earlier
}

if (binderRoot){
	binderRoot.addEventListener('click', onBinderActivate);
	binderRoot.addEventListener('keydown', (e)=>{
		if (e.key === 'Enter' || e.key === ' ') onBinderActivate(e);
	});
<<<<<<< HEAD
<<<<<<< HEAD
}

/* ========================================================================== */
/*                              VIEW FIX                                       */
/* ========================================================================== */

// Scale-to-fit for tall phones (e.g., 1080×2412). Assumes your whole game is inside #appRoot.
(function(){
	const app = document.getElementById('appRoot'); // wrap your whole game in this
	const DESIGN_W = 1024, DESIGN_H = 768;          // your intended base size; adjust if needed

	function fit(){
		const vw = window.innerWidth, vh = window.innerHeight;
		// leave small gutters so iOS bars/gesture areas don’t clip
		const w = vw * 0.98, h = vh * 0.98;
		const scale = Math.min(w / DESIGN_W, h / DESIGN_H, 1); // never upscale above 1
		app.style.transform = `scale(${scale})`;
		// center horizontally; allow page scroll vertically if needed
		const scaledW = DESIGN_W * scale;
		app.style.marginLeft = Math.max(0, (vw - scaledW) / 2) + 'px';
	}

	window.addEventListener('resize', fit, {passive:true});
	window.addEventListener('orientationchange', fit, {passive:true});
	document.addEventListener('DOMContentLoaded', fit);
	requestAnimationFrame(()=>requestAnimationFrame(fit)); // after first layout
})();
=======
}
>>>>>>> parent of 9c8d1f1 (mobile optimization)
=======
}
>>>>>>> parent of 9c8d1f1 (mobile optimization)
