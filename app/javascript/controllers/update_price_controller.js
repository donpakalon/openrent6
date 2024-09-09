import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="update-price"
export default class extends Controller {
  static targets = ["start", "end", "form", "price"]
  static values = { id: Number }

  connect() {
    console.log(this.priceTarget)
  }

  price() {
    console.log("Price action triggered!");

    const start = this.startTarget.value
    const end = this.endTarget.value
    // const url = `/${this.idValue}`
    const base_url = this.formTarget.action
    const url = `${base_url}?start_date=${start}&end_date=${end}`
    fetch(url, {headers: {"Accept": "text/plain"}})
      .then(response => response.text())
      .then((data) => {
        // this.priceTarget.outerHTML = data
        this.priceTarget.outerHTML = data
      })
  }
}
