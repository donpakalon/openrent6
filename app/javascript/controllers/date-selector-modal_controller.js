import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {

  }

  static targets = ["modal"]

  connect() {
    console.log("connected")
  }

  openModal() {
    this.modalTarget.classList.add('is-visible')
  }

  closeModal() {
    this.modalTarget.classList.remove('is-visible')
  }
}
