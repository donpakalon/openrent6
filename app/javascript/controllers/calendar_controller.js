import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modal", "calendarContainer", "startDateButton", "endDateButton", "startTimeButton", "endTimeButton", "timeContainer"];
  static values = { startDate: String, endDate: String, startTime: String, endTime: String };

  // Define time ranges and corresponding time slots
  timeRanges = {
    "matin tôt": ["00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00"],
    "avant midi": ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
    "après midi": ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
    "avant minuit": ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]
  };


  connect() {
    this.isSelectingStartDate = true;
    this.isSelectingTime = false;
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    if (this.hasCalendarContainerTarget) {
      this.generateCalendar(this.currentMonth, this.currentYear);
    }

    this.updateButtons();

    if (this.startDateValue) {
      this.markDay(this.startDateValue, 'selected-start-day');
    }
    if (this.endDateValue) {
      this.markDay(this.endDateValue, 'selected-end-day');
    }
    if (this.startDateValue && this.endDateValue) {
      this.highlightDaysBetween();
    }
    this.highlightActiveSelection();
  }

  openModal() {
    this.modalTarget.classList.add('is-visible');
  }

  closeModal() {
    this.modalTarget.classList.remove('is-visible');
  }

  getDay(dateString) {
    const date = new Date(dateString);
    return date.getDate(); // Returns the day of the month (e.g., 12)
  }

  getMonth(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short' };
    return date.toLocaleDateString('fr-FR', options); // Returns the month in French (e.g., "septembre")
  }

  getYear(dateString) {
    const date = new Date(dateString);
    return date.getFullYear(); // Returns the year (e.g., 2024)
  }

  getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('fr-FR', options); // Returns the day of the week in French (e.g., "mardi")
  }



  updateButtons() {
    const buttonMapping = {
      startDateButtonTarget: this.startDateValue
        ? `
          <div class="date-line1">Date de départ</div>
          <div class="date-line2">${this.getDayOfWeek(this.startDateValue).toUpperCase()}</div>
          <div class="date-line3">
            <span class="date-day">${this.getDay(this.startDateValue)}</span>
            <span class="date-month">${this.getMonth(this.startDateValue)}</span>
            <span class="date-year">${this.getYear(this.startDateValue)}</span>
          </div>
        `
        : "Select Start Date",
      endDateButtonTarget: this.endDateValue
        ? `
          <div class="date-line1">Date de retour</div>
          <div class="date-line2">${this.getDayOfWeek(this.endDateValue).toUpperCase()}</div>
          <div class="date-line3">
            <span class="date-day">${this.getDay(this.endDateValue)}</span>
            <span class="date-month">${this.getMonth(this.endDateValue)}</span>
            <span class="date-year">${this.getYear(this.endDateValue)}</span>
          </div>
        `
        : "Select End Date",
      startTimeButtonTarget: this.startTimeValue
        ? `
          <div class="time-line1">Heure de départ</div>
          <div class="time-line2">${this.startTimeValue}</div>
        `
        : "Select Start Time",

      endTimeButtonTarget: this.endTimeValue
        ? `
          <div class="time-line1">Heure de retour</div>
          <div class="time-line2">${this.endTimeValue}</div>
        `
        : "Select End Time"
    };
    Object.keys(buttonMapping).forEach(button => {
      this[button].innerHTML = buttonMapping[button];
    });
  }




  highlightActiveSelection() {
    this.startDateButtonTarget.classList.remove('selected-selector-section');
    this.endDateButtonTarget.classList.remove('selected-selector-section');
    this.startTimeButtonTarget.classList.remove('selected-selector-section');
    this.endTimeButtonTarget.classList.remove('selected-selector-section');

    if (this.isSelectingTime) {
      if (this.isSelectingStartDate) {
        this.startTimeButtonTarget.classList.add('selected-selector-section');
      } else {
        this.endTimeButtonTarget.classList.add('selected-selector-section');
      }
    } else {
      if (this.isSelectingStartDate) {
        this.startDateButtonTarget.classList.add('selected-selector-section');
      } else {
        this.endDateButtonTarget.classList.add('selected-selector-section');
      }
    }
  }

  selectStartDate() {
    this.isSelectingStartDate = true;
    this.isSelectingTime = false;
    this.showCalendar();
    this.highlightActiveSelection();
  }

  selectEndDate() {
    this.isSelectingStartDate = false;
    this.isSelectingTime = false;
    this.showCalendar();
    this.highlightActiveSelection();
  }

  selectStartTime() {
    this.isSelectingStartDate = true;
    this.isSelectingTime = true;
    this.showTimeContainer();  // Fixed method call
    this.highlightActiveSelection();
  }

  selectEndTime() {
    this.isSelectingStartDate = false;
    this.isSelectingTime = true;
    this.showTimeContainer();  // Fixed method call
    this.highlightActiveSelection();
  }

  // Show the calendar and hide the time selector
  showCalendar() {
    this.calendarContainerTarget.style.display = "flex";
    this.timeContainerTarget.style.display = "none"; // Fixed here
  }

  // Show the time selector and hide the calendar
  showTimeContainer() {  // Renamed to match timeContainer
    this.timeContainerTarget.style.display = "flex";
    this.calendarContainerTarget.style.display = "none";
    this.generateTimeSlots();
  }

  generateCalendar(month, year) {
    const daysOfWeek = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();  // Get the current date
    today.setHours(0, 0, 0, 0);  // Normalize the time to midnight for accurate comparison

    this.calendarContainerTarget.innerHTML = '';

    const monthNavigation = document.createElement('div');
    monthNavigation.classList.add('month-navigation');

    const prevButton = document.createElement('button');
    prevButton.innerText = '<';
    prevButton.setAttribute('data-action', 'click->calendar#changeMonth');
    prevButton.dataset.step = -1;

    if (year === today.getFullYear() && month === today.getMonth()) {
      prevButton.disabled = true;
      prevButton.classList.add('disabled');
    } else {
      prevButton.disabled = false;
      prevButton.classList.remove('disabled');
    }

    const monthYearHeader = document.createElement('span');
    monthYearHeader.innerText = `${new Date(year, month).toLocaleString('default', { month: 'short' })} ${year}`;

    const nextButton = document.createElement('button');
    nextButton.innerText = '>';
    nextButton.setAttribute('data-action', 'click->calendar#changeMonth');
    nextButton.dataset.step = 1;

    monthNavigation.appendChild(prevButton);
    monthNavigation.appendChild(monthYearHeader);
    monthNavigation.appendChild(nextButton);
    this.calendarContainerTarget.appendChild(monthNavigation);

    const daysRow = document.createElement('div');
    daysRow.classList.add('days-row');
    daysOfWeek.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.innerText = day;
      daysRow.appendChild(dayElement);
    });
    this.calendarContainerTarget.appendChild(daysRow);

    const dateGrid = document.createElement('div');
    dateGrid.classList.add('date-grid');

    for (let i = 0; i < adjustedFirstDay; i++) {
      const emptySlot = document.createElement('div');
      emptySlot.classList.add('empty');
      dateGrid.appendChild(emptySlot);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.innerText = day;
      const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const dateObj = new Date(dateString);

      if (dateObj < today) {
        dayElement.classList.add('disabled-day');
        dayElement.removeAttribute('data-action');
      } else {
        dayElement.dataset.date = dateString;
        dayElement.setAttribute('data-action', 'click->calendar#selectDate');
      }

      dateGrid.appendChild(dayElement);
    }

    this.calendarContainerTarget.appendChild(dateGrid);
  }

  selectDate(event) {
    const selectedDate = event.target.dataset.date;

    const targetValue = this.isSelectingStartDate ? 'startDateValue' : 'endDateValue';
    const targetClass = this.isSelectingStartDate ? 'selected-start-day' : 'selected-end-day';

    this.markDay(selectedDate, targetClass);
    this[targetValue] = selectedDate;

    // Update the buttons after selecting the date
    this.updateButtons();

    // Highlight the days between the start and end dates, if both are selected
    if (this.startDateValue && this.endDateValue) {
      this.highlightDaysBetween();
    }

    // Automatically switch to the next step (start time or end date)
    if (this.isSelectingStartDate) {
      this.selectStartTime(); // Move to start time selection
    } else {
      this.selectEndTime(); // Move to end time selection
    }
  }



  highlightDaysBetween() {
    if (!this.startDateValue || !this.endDateValue) return;

    const startDate = new Date(this.startDateValue);
    const endDate = new Date(this.endDateValue);

    const dayElements = this.calendarContainerTarget.querySelectorAll('[data-date]');

    dayElements.forEach(dayElement => {
      const dayDate = new Date(dayElement.dataset.date);
      dayElement.classList.remove('in-range');

      if (dayDate > startDate && dayDate < endDate) {
        dayElement.classList.add('in-range');
      }
    });
  }

  markDay(date, className) {
    const dayElement = this.calendarContainerTarget.querySelector(`[data-date="${date}"]`);
    const previouslySelected = this.calendarContainerTarget.querySelector(`.${className}`);
    if (previouslySelected) {
      previouslySelected.classList.remove(className);
    }
    if (dayElement) {
      dayElement.classList.add(className);
    }
  }

  changeMonth(event) {
    const step = parseInt(event.target.dataset.step);
    this.currentMonth += step;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);

    if (this.startDateValue) {
      this.markDay(this.startDateValue, 'selected-start-day');
    }
    if (this.endDateValue) {
      this.markDay(this.endDateValue, 'selected-end-day');
    }

    if (this.startDateValue && this.endDateValue) {
      this.highlightDaysBetween();
    }
  }

  generateTimeSlots() {
    const timeRangeContainer = this.timeContainerTarget.querySelector(".time-range-container");
    const timeSlotContainer = this.timeContainerTarget.querySelector(".time-slot-container");

    // Clear previous content
    timeRangeContainer.innerHTML = "";
    timeSlotContainer.innerHTML = "";

    // Determine the range to select based on the latest time
    let selectedTime = this.isSelectingStartDate ? this.startTimeValue : this.endTimeValue;
    let selectedRange = null;

    // If there's a selected time, find the corresponding range
    if (selectedTime) {
      selectedRange = Object.keys(this.timeRanges).find(range => {
        const timeSlots = this.timeRanges[range];
        return timeSlots.includes(selectedTime);
      });
    }

    // If no selected time, default to the last time range
    if (!selectedRange) {
      selectedRange = Object.keys(this.timeRanges).slice(-1)[0]; // Get the last range
    }

    // Create time range buttons dynamically from the defined timeRanges object
    Object.keys(this.timeRanges).forEach(range => {
      const rangeButton = document.createElement("div");
      rangeButton.classList.add("time-range");
      rangeButton.textContent = range;
      rangeButton.setAttribute('data-action', 'click->calendar#selectTimeRange');
      rangeButton.dataset.range = range; // Store the range for use in the click handler
      timeRangeContainer.appendChild(rangeButton);

      // Automatically select the range based on the condition
      if (range === selectedRange) {
        rangeButton.classList.add('selected-time-range'); // Mark it visually as selected
        this.selectTimeRange({ target: rangeButton }, selectedTime); // Simulate a click on the selected range, pass selectedTime
      }
    });
  }

  selectTimeRange(event, selectedTime = null) {
    const selectedRange = event.target.dataset.range; // Get the selected range
    const timeSlotContainer = this.timeContainerTarget.querySelector(".time-slot-container");

    // Remove 'selected-time-range' class from previously selected range
    const previouslySelectedRange = this.timeContainerTarget.querySelector('.selected-time-range');
    if (previouslySelectedRange) {
      previouslySelectedRange.classList.remove('selected-time-range');
    }

    // Add the 'selected-time-range' class to the clicked range
    event.target.classList.add('selected-time-range');

    // Clear the time slots before adding new ones
    timeSlotContainer.innerHTML = "";

    // Populate the time slots based on the selected range from the timeRanges object
    this.timeRanges[selectedRange].forEach(time => {
      const timeSlot = document.createElement("div");
      timeSlot.classList.add("time-slot");
      timeSlot.textContent = time;
      timeSlot.setAttribute('data-action', 'click->calendar#selectTime');

      // Check if the current time slot is the selected time and apply the 'selected-time-slot' class
      if (time === selectedTime) {
        timeSlot.classList.add('selected-time-slot');
      }

      timeSlotContainer.appendChild(timeSlot);
    });
  }



  selectTime(event) {
    const selectedTime = event.target.textContent;

    // Log the target element and selected time
    console.log('Selected Time Element:', event.target);
    console.log('Selected Time:', selectedTime);

    // Remove the 'selected-time-slot' class from any previously selected time slot
    const previouslySelected = this.timeContainerTarget.querySelector('.selected-time-slot');
    if (previouslySelected) {
      console.log('Removing selected from:', previouslySelected);
      previouslySelected.classList.remove('selected-time-slot');
    }

    // Mark the clicked time as selected
    event.target.classList.add('selected-time-slot');
    console.log('Marked selected time:', event.target);

    // Update the selected time based on whether we're choosing a start or end time
    if (this.isSelectingStartDate) {
      this.startTimeValue = selectedTime;
    } else {
      this.endTimeValue = selectedTime;
    }

    // Update the buttons after selecting the time
    this.updateButtons();

    // Automatically switch to the next step (end date or back to start date)
    if (this.isSelectingStartDate) {
      this.selectEndDate(); // Move to end date selection
    } else {
      this.selectStartDate(); // Cycle back to start date selection
    }
  }



  confirmDates() {
    alert("Dates confirmed!");
    this.closeModal();
  }
}
