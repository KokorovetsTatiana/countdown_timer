class CountdownTimer {
  constructor(selector, targetDate) {
    this.selector = document.querySelector(selector);
    this.targetDate = new Date(targetDate);
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.currentTime = new Date();
      this.remainingTime = this.targetDate - this.currentTime;
      this.timeConfig(), this.timeReplaceText();
      if (this.remainingTime < 0) {
        this.stopTimer();
      }
    }, 1000);
  }

    timeConfig() {
    //для подсчета дней изменила формулу, т.к. в ДЗ сказано, что количество дней может состоять из более, чем двух цифр
    this.days = Math.floor((this.remainingTime % (1000 * 60 * 60 * 24 * 30 * 12)) / (1000 * 60 * 60 * 24 * 30) ) * 30 +
                Math.floor((this.remainingTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),);
    this.mins = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60),);
    this.secs = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
  }

  timeReplaceText() {
    this.refs = {
      days: document.querySelector(' [data-value=days]'),
      hours: document.querySelector(' [data-value=hours]'),
      minutes: document.querySelector(' [data-value=mins]'),
      seconds: document.querySelector(' [data-value=secs]'),
    };
    this.refs.days.textContent = this.pad(this.days);
    this.refs.hours.textContent = this.pad(this.hours);
    this.refs.minutes.textContent = this.pad(this.mins);
    this.refs.seconds.textContent = this.pad(this.secs);
  }
  stopTimer() {
    clearInterval(this.intervalId);
    this.remainingTime = 0;
    this.timeConfig(this.remainingTime);
    this.timeReplaceText(this.remainingTime);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const countdownTimer = new CountdownTimer(
  '#timer-1',
  'December 31, 2022',
);
countdownTimer.startTimer();