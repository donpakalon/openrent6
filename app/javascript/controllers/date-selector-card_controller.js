import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    startDateString: { type: String },
    endDateString: { type: String },
    startDate: { type: Date, default: new Date() },
    endDate: { type: Date, default: new Date() },
    selection: { type: String, default: "start-date" }
  };

  static targets = [
    "startDateDayOfWeek", "startDateDay", "startDateMonth", "startDateYear", "startTime",
    "endDateDayOfWeek", "endDateDay", "endDateMonth", "endDateYear", "endTime",
    "startDateButton", "endDateButton", "startTimeButton", "endTimeButton"
  ];

  connect() {
    this.startDateValue.setDate(new Date(this.startDateStringValue).getDate())
    this.startDateValue.setMonth(new Date(this.startDateStringValue).getMonth())
    this.startDateValue.setFullYear(new Date(this.startDateStringValue).getFullYear())
    this.endDateValue.setDate(new Date(this.endDateStringValue).getDate())
    this.endDateValue.setMonth(new Date(this.endDateStringValue).getMonth())
    this.endDateValue.setFullYear(new Date(this.endDateStringValue).getFullYear())


    this.updateDisplay()
    this.selectionSender()
    console.log("connecting and this is my selection: "+this.selectionValue);

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

    this.highlightSelectedButton()
  }

  // Utility to get the time in HH:MM format
  getTimeHHMM(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  dateListener({ detail: { startDate, endDate, nextSelectedDate } }) {
    this.selectionValue = nextSelectedDate
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
    this.selectionSender()
    this.updateDisplay()
  }

  timeListener({ detail: { startTime, endTime, nextSelectedTime } }){
    this.selectionValue = nextSelectedTime

    if (this.isValidDate(startTime) && this.isValidDate(endTime)) {
      // Update startDateValue
      this.startDateValue.setHours(startTime.getHours());
      this.startDateValue.setMinutes(startTime.getMinutes());

      // Update endDateValue
      this.endDateValue.setHours(endTime.getHours());
      this.endDateValue.setMinutes(endTime.getMinutes());

      this.updateDisplay();
    } else {
      console.error("Received invalid Date object(s)");
    }
    this.selectionSender()
    this.updateDisplay()
  }

  highlightSelectedButton() {
    // Remove the 'selected-selector-section' class from all button targets
    this.startTimeButtonTarget.classList.remove("selected-selector-section");
    this.endTimeButtonTarget.classList.remove("selected-selector-section");
    this.startDateButtonTarget.classList.remove("selected-selector-section");
    this.endDateButtonTarget.classList.remove("selected-selector-section");

    const selectedValue = this.selectionValue;

    // Add the 'selected-selector-section' class to the corresponding button
    switch (selectedValue) {
      case 'start-time':
        this.startTimeButtonTarget.classList.add("selected-selector-section");
        break;
      case 'start-date':
        this.startDateButtonTarget.classList.add("selected-selector-section");
        break;
      case 'end-time':
        this.endTimeButtonTarget.classList.add("selected-selector-section");
        break;
      case 'end-date':
        this.endDateButtonTarget.classList.add("selected-selector-section");
        break;
      default:
        console.error(`Invalid selected value: ${selectedValue}`);
    }
  }

  selectionSender(){
    this.dispatch("selectionSender", { detail: { nextSelectedDate: this.selectionValue } })
    console.log("sending selection on click: "+this.selectionValue);

  }

  changeNextSelection(event){
    this.selectionValue = event.currentTarget.dataset.selection
    this.selectionSender()
    this.updateDisplay()
  }


  // Helper function to check if a value is a valid Date object
  isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

}
