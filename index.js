function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
  }
  
  function createTimeInEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    const timeInEvent = {
      type: 'TimeIn',
      date,
      hour: parseInt(hour)
    };
    this.timeInEvents.push(timeInEvent);
    return this;
  }
  
  function createTimeOutEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    const timeOutEvent = {
      type: 'TimeOut',
      date,
      hour: parseInt(hour)
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const wagesEarned = hoursWorked * this.payPerHour;
    return wagesEarned;
  }
  
  function allWagesFor() {
    const allDates = [...new Set([...this.timeInEvents.map(event => event.date), ...this.timeOutEvents.map(event => event.date)])];
    const totalWages = allDates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => total + allWagesFor.call(employeeRecord), 0);
    return totalPayroll;
  }
  