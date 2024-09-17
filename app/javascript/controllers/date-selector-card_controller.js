import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    startDate: { type: Date, default: new Date() },
    endDate: { type: Date, default: new Date() }
  };

  static targets = [
    "startDateDayOfWeek", "startDateDay", "startDateMonth", "startDateYear", "startTime",
    "endDateDayOfWeek", "endDateDay", "endDateMonth", "endDateYear", "endTime"
  ];

  connect() {
    this.updateDisplay();
  }

  updateDisplay() {
    const { startDateValue, endDateValue } = this;

    // Update start date display
    if (startDateValue) {
      this.startDateDayOfWeekTarget.textContent = startDateValue.toLocaleDateString("fr-FR", { weekday: "long" }).toUpperCase();
      this.startDateDayTarget.textContent = startDateValue.getDate();
      this.startDateMonthTarget.textContent = startDateValue.toLocaleDateString("fr-FR", { month: "short" });
      this.startDateYearTarget.textContent = startDateValue.getFullYear();
      this.startTimeTarget.textContent = this.getTimeHHMM(startDateValue);
    }

    // Update end date display
    if (endDateValue) {
      this.endDateDayOfWeekTarget.textContent = endDateValue.toLocaleDateString("fr-FR", { weekday: "long" }).toUpperCase();
      this.endDateDayTarget.textContent = endDateValue.getDate();
      this.endDateMonthTarget.textContent = endDateValue.toLocaleDateString("fr-FR", { month: "short" });
      this.endDateYearTarget.textContent = endDateValue.getFullYear();
      this.endTimeTarget.textContent = this.getTimeHHMM(endDateValue);
    }
  }

  // Utility to get the time in HH:MM format
  getTimeHHMM(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  dateListener({ detail: { startDate, endDate } }) {
    // Check if both startDate and endDate are valid Date objects
    if (this.isValidDate(startDate) && this.isValidDate(endDate)) {
      // Update startDateValue
      this.startDateValue.setMonth(startDate.getMonth());
      this.startDateValue.setDate(startDate.getDate());
      this.startDateValue.setFullYear(startDate.getFullYear());

      // Update endDateValue
      this.endDateValue.setMonth(endDate.getMonth());
      this.endDateValue.setDate(endDate.getDate());
      this.endDateValue.setFullYear(endDate.getFullYear());

      this.updateDisplay();
    } else {
      console.error("Received invalid Date object(s)");
    }
  }

  // Helper function to check if a value is a valid Date object
  isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

}
