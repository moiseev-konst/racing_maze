class Timer {
    constructor() {
            this.timerId = null;
            this.updateTime = 300;
        }
        /* get updateTime() {
          return this.updateTime;
        }
        set updateTime(time) {
          this.updateTime = time;
        }*/

    onTick = () => {}
    startTimer(time) {
        this.resetTimer();
        this.updateTime = time
        this.tick();
    }
    stopTimer() {
        this.resetTimer();
    }
    resetTimer() {
        if (this.timerId != null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
    tick() {
        this.onTick();
        console.log("timer")
        this.timerId = setTimeout(this.tick.bind(this), this.updateTime);
    }
}

export function createTimer() {
    const timer = new Timer();
    return timer;
}