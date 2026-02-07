class AplikaceRozpocet {
  constructor() {

  this.kategorie = JSON.parse(localStorage.getItem("kategorie")) || [];
  this.polozky = JSON.parse(localStorage.getItem("polozky")) || [];
  this.role = localStorage.getItem("role") || "uzivatel";

  this.getElement_tabulka_kategorie = document.getElementById("tabulka_kategorie");
  this.getElement_kategorie_polozky = document.getElementById("kategorie_polozky");
  this.getElement_posledni_transakce = document.getElementById("posledni_transakce");
  this.getElement_stav_uctu = document.getElementById("stav_uctu").innerText = stav;
  this.getElement_nazev_kategorie = document.getElementById("nazev_kategorie").value;
  this.getElement_typ_transakce = document.getElementById("typ_transakce").value
  this.getElement_nazev_polozky = document.getElementById("nazev_polozky").value;
  this.getElement_castka = document.getElementById("castka").value;
  this.getElement_kategorie_polozky = document.getElementById("kategorie_polozky").value || "";


  function uloz() {
    localStorage.setItem("kategorie", JSON.stringify(kategorie));
    localStorage.setItem("polozky", JSON.stringify(polozky));
  }

  function nacteni_kategorii() {
    //let tk = document.getElementById("tabulka_kategorie");
    tk.innerHTML = "";
    for (let i = 0; i < kategorie.length; i++) {
      let tr = document.createElement("tr");
       tr.innerHTML = `<td>${kategorie[i].nazev}</td><td>${kategorie[i].typ}</td><td><div class="spravce"><button onclick="smaz_kategorii(${i})">Smazat</div></button></td>`;
      tk.appendChild(tr);
    }

    //let sel = document.getElementById("kategorie_polozky");
    sel.innerHTML = "";
    for (let i = 0; i < kategorie.length; i++) {
      sel.innerHTML += `<option value="${kategorie[i].nazev}">${kategorie[i].nazev}</option>`;
    }
  }

function vykresli_polozky() {
 // let t = document.getElementById("posledni_transakce");
  t.innerHTML = "";

  for (let i = polozky.length - 1; i >= 0; i--) {
    let p = polozky[i];
    t.innerHTML +=
      `<tr><td>${p.nazev}</td><td>${p.castka}</td><td>${p.kategorie}</td><td>${p.typ}</td>` +
      `<td><button onclick="smaz_polozku(${i})">Smazat</button></td></tr>`;
  }

  let stav = 0;
  for (let i = 0; i < polozky.length; i++) {
    let c = Number(polozky[i].castka) || 0;
    stav += (polozky[i].typ === "prijem") ? c : -c;
  }
  //document.getElementById("stav_uctu").innerText = stav;
}

  function pridej_kategorii() {
    //let nazev = document.getElementById("nazev_kategorie").value;
    //let typ_transakce = document.getElementById("typ_transakce").value;
    if (nazev === "") { alert("Zadejte název kategorie"); return; }

    kategorie.push(new Kategorie(nazev, typ_transakce));
    uloz();
    nacteni_kategorii();
  }

function pridej_polozku() {
 // let nazev = document.getElementById("nazev_polozky").value;
 // let castka = document.getElementById("castka").value;
 // let kat = document.getElementById("kategorie_polozky").value || "";
  
  if (kat === "") { alert("Vyberte kategorii"); return; }
  if (castka === "") { alert("Zadejte částku"); return; }
  if (nazev === "") { alert("Zadejte název"); return; }

  let typ = (kategorie.find(k => k.nazev === kat) || {}).typ;  
  polozky.push(new Polozka(nazev, castka, typ, kat));

  uloz();
  vykresli_polozky();
}

  function smaz_polozku(i) {
    polozky.splice(i, 1);
    uloz();
    vykresli_polozky();
  }

  function smaz_kategorii(i) {
  kategorie.splice(i, 1);
  uloz();
  nacteni_kategorii();
}

  function vymazani_localstorage() {
  localStorage.clear();
  kategorie = [];
  polozky = [];
  nacteni_kategorii();
  vykresli_polozky();
}
  nacteni_kategorii();
  vykresli_polozky();

  
  document.getElementById("role").value = role;

function zmen_roli() {
  role = document.getElementById("role").value;
  localStorage.setItem("role", role);
  nastav_opravneni();
}

function nastav_opravneni() {
  document.querySelectorAll(".spravce")
    .forEach(e => e.style.display = (role === "spravce") ? "block" : "none");
}

nastav_opravneni();
