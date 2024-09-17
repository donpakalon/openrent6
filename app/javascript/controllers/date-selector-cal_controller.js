import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["monthYear", "dateGrid", "day", "overlay"];
  static values = {
    currentDate: { type: Date, default: new Date() },
    startDate: { type: Date, default: new Date() },
    endDate: { type: Date, default: new Date() },
    selection: { type: Boolean, default: false }
  };

  connect() {
    this.renderCalendar();
  }

  updateText(element, newText) {
    const firstChild = element.firstChild;

    if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
      firstChild.textContent = newText;
    } else {
      element.insertBefore(document.createTextNode(newText), firstChild);
    }
  }

  changeMonth(event) {
    const step = parseInt(event.currentTarget.dataset.step, 10);
    this.currentDateValue.setMonth(this.currentDateValue.getMonth() + step);
    this.renderCalendar();
  }

  renderCalendar() {
    const year = this.currentDateValue.getFullYear();
    const month = this.currentDateValue.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();


    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize the time for comparison

    this.monthYearTarget.textContent = this.currentDateValue.toLocaleString("fr-FR", {
      month: "short",
      year: "numeric"
    });

    // Get all grid slots and reset them
    const dayElements = this.dayTargets;
    const overlayElements = this.overlayTargets;

    dayElements.forEach((element) => {
      this.updateText(element, "");
      element.className = "day";
      element.classList.add("empty");
      element.removeAttribute("data-day");
      element.removeAttribute("data-month");
      element.removeAttribute("data-year");
      element.removeAttribute("data-action");
    });

    let dayIndex = adjustedFirstDay;
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = dayElements[dayIndex];
      this.updateText(dayElement, day);
      dayElement.classList.remove("empty");

      const dateString = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const dateObj = new Date(dateString);
      dayElement.dataset.year = year;
      dayElement.dataset.month = month;
      dayElement.dataset.day = day;
      if (dateObj < today) {
        dayElement.classList.add("disabled-day");
      } else {
        dayElement.setAttribute("data-action", "click->date-selector-cal#selectDate");
      }

      dayIndex++;
    }
    this.markDates()
  }

  selectDate(event) {
    const selectedDate = new Date()
    selectedDate.setFullYear(event.currentTarget.dataset.year)
    selectedDate.setMonth(event.currentTarget.dataset.month, event.currentTarget.dataset.day)

    if (this.selectionValue && selectedDate >= this.startDateValue) {
      this.endDateValue.setMonth(event.currentTarget.dataset.month, event.currentTarget.dataset.day)
      this.endDateValue.setFullYear(event.currentTarget.dataset.year)
      this.selectionValue = !this.selectionValue;
    } else if (!this.selectionValue && selectedDate <= this.endDateValue) {
      this.startDateValue.setMonth(event.currentTarget.dataset.month, event.currentTarget.dataset.day)
      this.startDateValue.setFullYear(event.currentTarget.dataset.year)
      this.selectionValue = !this.selectionValue;
    } else if (!this.selectionValue) {
      this.endDateValue.setMonth(event.currentTarget.dataset.month, event.currentTarget.dataset.day)
      this.endDateValue.setFullYear(event.currentTarget.dataset.year)
    } else {
      this.startDateValue.setMonth(event.currentTarget.dataset.month, event.currentTarget.dataset.day)
      this.startDateValue.setFullYear(event.currentTarget.dataset.year)
    }

    this.dispatch("dateSender", { detail: { startDate: this.startDateValue, endDate: this.endDateValue, nextSelectedDate: this.selectionValue } })
    event.currentTarget.firstElementChild.classList.add("visible")

    this.markDates();
  }

  resetOverlays() {
    this.overlayTargets.forEach(overlay => {
      overlay.className = "overlay";
      overlay.style.cssText = "";
    });
  }

  markDates() {
    this.resetOverlays();
    const startDate = this.startDateValue;
    const endDate = this.endDateValue;

    if (this.areDatesEqual(startDate, endDate)) {
      this.markOneDay(startDate);
    } else {
      this.markRangeDays(startDate, endDate);
    }
  }

  markOneDay(date) {
    this.dayTargets.forEach((dayElement, index) => {
      const dayDate = this.getDateFromElement(dayElement);
      if (this.areDatesEqual(dayDate, date)) {
        const overlay = this.overlayTargets[index];
        overlay.classList.add("one-day", "visible");
      }
    });
  }

  markRangeDays(startDate, endDate) {
    this.dayTargets.forEach((dayElement, index) => {
      const dayDate = this.getDateFromElement(dayElement);

      if (this.areDatesEqual(dayDate, startDate)) {
        // Mark the first day
        const overlay = this.overlayTargets[index];
        overlay.classList.add("start-day", "visible");
        this.setFirstDayStyles(overlay, startDate);
      } else if (this.areDatesEqual(dayDate, endDate)) {
        // Mark the last day
        const overlay = this.overlayTargets[index];
        this.setLastDayStyles(overlay, endDate);
        overlay.classList.add("end-day", "visible");
      } else if (dayDate > startDate && dayDate < endDate) {
        // Mark mid-days
        const overlay = this.overlayTargets[index];
        overlay.classList.add("mid-day", "visible");
      }
    });
  }

  getDateFromElement(element) {
    const year = parseInt(element.dataset.year, 10);
    const month = parseInt(element.dataset.month, 10); // Remember that month is 0-based
    const day = parseInt(element.dataset.day, 10);

    return new Date(year, month, day);
  }

  areDatesEqual(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  setFirstDayStyles(overlay, startDate) {
    const hours = startDate.getHours();
    const remainingHours = 24 - hours;

    const widthPercentage = (remainingHours / 24) * 100;
    const leftPercentage = 100 - widthPercentage;

    overlay.style.width = `${widthPercentage}%`;
    overlay.style.left = `${leftPercentage}%`;
  }

  setLastDayStyles(overlay, endDate) {
    const hoursPassed = endDate.getHours();

    const widthPercentage = (hoursPassed / 24) * 100;
    const leftPercentage = 0;

    overlay.style.width = `${widthPercentage}%`;
    overlay.style.left = `${leftPercentage}%`;
  }

}
