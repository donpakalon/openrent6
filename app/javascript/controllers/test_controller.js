// app/javascript/controllers/test_controller.js

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  update(event) {
    console.log("Update action triggered!");

    const form = event.target.form;
    clearTimeout(this.timeout);

    // Delay form submission to prevent too many requests
    this.timeout = setTimeout(() => {
      form.requestSubmit(); // Trigger the form submit
    }, 300); // 300ms debounce
  }
}
