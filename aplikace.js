class AplikaceRozpocet {
  constructor() {
    this.model = new ModelRozpocet();
    this.getElement_tabulka_kategorie = document.getElementById("tabulka_kategorie");
    this.getElement_kategorie_polozky = document.getElementById("kategorie_polozky");
    this.getElement_posledni_transakce = document.getElementById("posledni_transakce");
    this.getElement_stav_uctu = document.getElementById("stav_uctu");
    this.getElement_nazev_kategorie = document.getElementById("nazev_kategorie");
    this.getElement_typ_transakce = document.getElementById("typ_transakce");
    this.getElement_nazev_polozky = document.getElementById("nazev_polozky");
    this.getElement_castka = document.getElementById("castka");
    this.getElement_role = document.getElementById("role");
  }

  inicializace() {
    this.nacteni_kategorii();
    this.vykresli_polozky();
    this.getElement_role.value = this.model.role;
    this.nastav_opravneni();
  }

  uloz() {
    this.model.uloz();
  }

  nacteni_kategorii() {
    this.getElement_tabulka_kategorie.innerHTML = "";

    for (let i = 0; i < this.model.kategorie.length; i++) {
      let tr = document.createElement("tr");
      tr.innerHTML =
        `<td>${this.model.kategorie[i].nazev}</td>` +
        `<td>${this.model.kategorie[i].typ}</td>` +
        `<td><div class="spravce"><button onclick="smaz_kategorii(${i})">Smazat</button></div></td>`;
      this.getElement_tabulka_kategorie.appendChild(tr);
    }

    this.getElement_kategorie_polozky.innerHTML = "";
    for (let i = 0; i < this.model.kategorie.length; i++) {
      this.getElement_kategorie_polozky.innerHTML +=
        `<option value="${this.model.kategorie[i].nazev}">${this.model.kategorie[i].nazev}</option>`;
    }
  }

  vykresli_polozky() {
    this.getElement_posledni_transakce.innerHTML = "";

    for (let i = this.model.polozky.length - 1; i >= 0; i--) {
      let p = this.model.polozky[i];
      this.getElement_posledni_transakce.innerHTML +=
        `<tr><td>${p.nazev}</td><td>${p.castka}</td><td>${p.kategorie}</td><td>${p.typ}</td>` +
        `<td><button onclick="smaz_polozku(${i})">Smazat</button></td></tr>`;
    }

    let stav = 0;
    for (let i = 0; i < this.model.polozky.length; i++) {
      let c = Number(this.model.polozky[i].castka) || 0;
      stav += (this.model.polozky[i].typ === "prijem") ? c : -c;
    }
    this.getElement_stav_uctu.innerText = stav;
  }

  pridej_kategorii() {
    if (this.getElement_nazev_kategorie.value === "") {
      alert("Zadejte název kategorie");
      return;
    }

    this.model.kategorie.push(
      new Kategorie(this.getElement_nazev_kategorie.value, this.getElement_typ_transakce.value)
    );

    this.uloz();
    this.nacteni_kategorii();
  }

  pridej_polozku() {
    let kat = this.getElement_kategorie_polozky.value || "";

    if (kat === "") { alert("Vyberte kategorii"); return; }
    if (this.getElement_castka.value === "") { alert("Zadejte částku"); return; }
    if (this.getElement_nazev_polozky.value === "") { alert("Zadejte název"); return; }

    let typ = (this.model.kategorie.find(k => k.nazev === kat) || {}).typ;

    this.model.polozky.push(
      new Polozka(this.getElement_nazev_polozky.value, this.getElement_castka.value, typ, kat)
    );

    this.uloz();
    this.vykresli_polozky();
  }

  smaz_polozku(i) {
    this.model.polozky.splice(i, 1);
    this.uloz();
    this.vykresli_polozky();
  }

  smaz_kategorii(i) {
    this.model.kategorie.splice(i, 1);
    this.uloz();
    this.nacteni_kategorii();
  }

  vymazani_localstorage() {
    this.model.vymazani_localstorage();
    this.nacteni_kategorii();
    this.vykresli_polozky();
    this.getElement_role.value = this.model.role;
    this.nastav_opravneni();
  }

  zmen_roli() {
    this.model.role = this.getElement_role.value;
    this.uloz();
    this.nastav_opravneni();
  }

  nastav_opravneni() {
    document.querySelectorAll(".spravce")
      .forEach(e => e.style.display = (this.model.role === "spravce") ? "block" : "none");
  }
}

function smaz_kategorii(i) { aplikace.smaz_kategorii(i); }
function smaz_polozku(i) { aplikace.smaz_polozku(i); }
function pridej_kategorii() { aplikace.pridej_kategorii(); }
function pridej_polozku() { aplikace.pridej_polozku(); }
function vymazani_localstorage() { aplikace.vymazani_localstorage(); }
function zmen_roli() { aplikace.zmen_roli(); }

let aplikace = new AplikaceRozpocet();
aplikace.inicializace();
