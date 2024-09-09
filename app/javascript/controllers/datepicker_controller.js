import { Controller } from "@hotwired/stimulus"
import flatpickr from "flatpickr";

export default class extends Controller {
  connect() {
    flatpickr(this.element, {
      dateFormat: "d/m/Y H:i", // French date format with time
      enableTime: true, // Allow time selection
      time_24hr: true, // Use 24-hour format
      minuteIncrement: 30, // Set 30-minute increments for time selection
      minDate: "today", // Prevent selecting past dates
    });
  }
}
