import { Controller } from "@hotwired/stimulus"
import flatpickr from "flatpickr";

// Connects to data-controller="datepicker"
export default class extends Controller {

  connect() {
    if (this.element._flatpickr) {
      this.element._flatpickr.destroy();
    }
    flatpickr(this.element,
      {
        disableMobile: "true",
      }
    );
  }
}
