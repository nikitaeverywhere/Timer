/**
 * The vanilla ES6 JavaScript timer module for any needs.
 * @author Nikita Savchenko
 * @url https://github.com/ZitRos/Timer
 * @version 1.0.0
 * @param {HTMLElement} element - Element to attach timer to. Inner text of the element will be
 * controlled by Timer module.
 * @param {Object} [options]
 * @param {string} [options.mask=hh:mm:ss] - Output timer mask.
 * @param {number} [options.updateInterval=1000] - Timer update interval in milliseconds.
 * @param {string} [options.type=countup] - Timer type.
 * @param {number} [options.initialTime=0] - Initial time in milliseconds.
 * @param {boolean} [options.autoStart=true] - Start the timer after constructor is called.
 */
export default function Timer (element, options) {

    if (!(element instanceof HTMLElement))
        throw new Error("element must be an HTMLElement:", element);

    this.element = element;

    // prevent previously set timers from conflicting
    if (element._ZITROTIMER && element._ZITROTIMER instanceof Timer)
        element._ZITROTIMER.stop();
    this.element._ZITROTIMER = this;

    this.options = options;

    this.reset(options);

}

function pad (val, n = 2) {
    return `000${ val }`.slice(-n);
}

/**
 * Stop the timer updates.
 * @returns {Timer}
 */
Timer.prototype.stop = function () {

    if (!this.interval)
        return this;

    clearInterval(this.interval);
    this.interval = 0;
    
    return this;

};

/**
 * Start the timer updates.
 * @returns {Timer}
 */
Timer.prototype.start = function () {

    if (this.interval)
        this.stop();

    this.interval = setInterval(this.update.bind(this), this.updateInterval);
    this.update();
    
    return this;

};

/**
 * Start the timer from initial point. Optionally takes options needed to be reassigned.
 * @param {Object} [options]
 * @param {string} [options.mask=hh:mm:ss] - Output timer mask.
 * @param {number} [options.updateInterval=1000] - Timer update interval in milliseconds.
 * @param {string} [options.type=countup] - Timer type.
 * @param {number} [options.initialTime=0] - Initial time in milliseconds.
 * @param {boolean} [options.autoStart=true] - Start the timer after constructor is called.
 * @returns {Timer}
 */
Timer.prototype.reset = function (options = {}) {

    if (options)
        this.options = Object.assign(this.options, options);

    this.mask = this.options.mask || "hh:mm:ss";
    this.updateInterval = this.options.updateInterval || 1000;
    this.TYPE = this.options.type || "countup";
    this.initialTime = new Date().getTime() + (this.options.initialTime || 0);
    this.options.autoStart =
        typeof this.options.autoStart === `undefined` ? true : this.options.autoStart;

    this.stop();
    this.update();

    if (this.options.autoStart)
        this.start();
    
    return this;

};

/**
 * Manually updates the timer.
 * @returns {Timer}
 */
Timer.prototype.update = function () {
    
    let time;
    
    if (this.TYPE === "countup")
        time = new Date().getTime() - this.initialTime;
    else {
        time = Math.max(0, this.initialTime - new Date().getTime());
        if (time === 0)
            clearInterval(this.interval);
    }
    
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((time / (1000 * 60)) % 60),
        seconds = Math.floor((time / 1000) % 60);

    this.element.textContent = this.mask
        .replace(/h{1,2}/g, p => pad(hours, p.length))
        .replace(/m{1,2}/g, p => pad(minutes, p.length))
        .replace(/s{1,2}/g, p => pad(seconds, p.length));
    
    return this;

};