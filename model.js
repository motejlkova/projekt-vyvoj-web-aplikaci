class ModelRozpocet {
  constructor() {
    this.kategorie = JSON.parse(localStorage.getItem("kategorie")) || [];
    this.polozky = JSON.parse(localStorage.getItem("polozky")) || [];
    this.role = localStorage.getItem("role") || "uzivatel";
  }

  uloz() {
    localStorage.setItem("kategorie", JSON.stringify(this.kategorie));
    localStorage.setItem("polozky", JSON.stringify(this.polozky));
    localStorage.setItem("role", this.role);
  }

  vymazani_localstorage() {
    localStorage.clear();
    this.kategorie = [];
    this.polozky = [];
    this.role = "uzivatel";
  }
}
