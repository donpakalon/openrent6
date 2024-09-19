import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    startTime: { type: Date, default: new Date() },
    endTime: { type: Date, default: new Date() },
    selection: { type: String }
  }

  static targets = ["timeSlotGroup"]

  connect() {
    this.updateDisplay()
  }

  updateDisplay(){
    this.showOrHide()
  }

  showOrHide(){
    if (this.selectionValue==="end-time" || this.selectionValue==="start-time"){
      this.element.style.display = "flex"
      this.showDefaultDate()
    }else{
      this.element.style.display = "none"
    }
  }

  timeRangeFromDate(myDate) {
    console.log("starttimerange: " + myDate.getHours());

    let myrange

    if (myDate.getHours() < 6) {
      myrange = "matin tôt";
    } else if (myDate.getHours() < 12) {
      myrange = "avant midi";
    } else if (myDate.getHours() < 18) {
      myrange = "après midi";
    } else if (myDate.getHours() < 24) {
      myrange = "avant minuit";
    } else {
      console.error("timeRangeFromDate ERROR");
    }

    console.log(myrange);  // Now myrange is accessible here
    return myrange;
}


  showDefaultDate(){
    let startRange

    if (this.selectionValue==="end-time"){
      startRange = this.timeRangeFromDate(this.endTimeValue)
    }else if (this.selectionValue==="start-time"){
      startRange = this.timeRangeFromDate(this.startTimeValue)
    }

    // Hide all time slot groups
    this.timeSlotGroupTargets.forEach((group) => {
      group.style.display = "none"; // Hide all groups
    });

    const selectedGroup = this.timeSlotGroupTargets.find(group => group.dataset.timeRange === startRange);
    if (selectedGroup) {
      selectedGroup.style.display = "grid"; // Show only the selected group
    }
  }

  selectTimeRange(event) {
    const selectedRange = event.target.dataset.range;

    // Hide all time slot groups
    this.timeSlotGroupTargets.forEach((group) => {
      group.style.display = "none"; // Hide all groups
    });

    // Show the time slots corresponding to the selected range
    const selectedGroup = this.timeSlotGroupTargets.find(group => group.dataset.timeRange === selectedRange);
    if (selectedGroup) {
      selectedGroup.style.display = "grid"; // Show only the selected group
    }
    this.updateDisplay()
  }



  selectTime(event) {
    const selectedDate = new Date()
    selectedDate.setHours(event.currentTarget.dataset.hours)
    selectedDate.setMinutes(event.currentTarget.dataset.minutes)
    console.log(selectedDate);
    if (this.selectionValue==="end-time"){
      this.endTimeValue.setHours(event.currentTarget.dataset.hours)
      this.endTimeValue.setMinutes(event.currentTarget.dataset.minutes)
      this.selectionValue = "start-date"
    }else if (this.selectionValue==="start-time"){
      this.startTimeValue.setHours(event.currentTarget.dataset.hours)
      this.startTimeValue.setMinutes(event.currentTarget.dataset.minutes)
      this.selectionValue = "end-time"
    }
    this.dispatch("timeSender", { detail: { startTime: this.startTimeValue, endTime: this.endTimeValue, nextSelectedTime: this.selectionValue } })
    this.updateDisplay()
  }

  selectionListener({ detail: { nextSelectedDate } }){
    this.selectionValue = nextSelectedDate
    this.updateDisplay()
  }
}
