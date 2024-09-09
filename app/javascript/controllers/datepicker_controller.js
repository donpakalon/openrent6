import { Controller } from "@hotwired/stimulus"
import flatpickr from "flatpickr";

export default class extends Controller {
  connect() {
    flatpickr(this.element, {
      dateFormat: "d/m/Y H:i",
      enableTime: true,
      time_24hr: true,
      minuteIncrement: 30,
      minDate: "today",
    });
  }
}
