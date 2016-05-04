/**
 * The vanilla ES6 JavaScript timer module for any needs.
 * @author Nikita Savchenko
 * @url https://github.com/ZitRos/Timer
 * @param {HTMLElement} element - Element to attach timer to. Inner text of the element will be
 * controlled by Timer module.
 * @param {Object} [options]
 * @param {string} [options.mask=hh:mm:ss] - Output timer mask.
 * @param {number} [options.updateInterval=1000] - Timer update interval in milliseconds.
 * @param {string} [options.type=countup] - Timer type.
 * @param {number} [options.initialTime=0] - Initial time in milliseconds.
 */
export default function Timer (element, options = {}) {

    if (!(element instanceof HTMLElement))
        throw new Error("element must be an HTMLElement:", element);

    this.element = element;
    this.mask = options.mask || "hh:mm:ss";
    this.updateInterval = options.updateInterval || 1000;
    this.TYPE = options.type || "countup";
    this.initialDate = new Date().getTime() + (options.initialTime || 0);

    // prevent previously set timers from conflicting
    if (element._ZITROTIMER && element._ZITROTIMER instanceof Timer)
        element._ZITROTIMER.stop();
    element._ZITROTIMER = this;

    this.interval = setInterval(this.update.bind(this), this.updateInterval);
    this.update();

}

function pad (val, n = 2) {
    return `000${ val }`.slice(-n);
}

Timer.prototype.stop = function () {

    clearInterval(this.interval);

};

/**
 * @private
 */
Timer.prototype.update = function () {
    
    let time;
    
    if (this.TYPE === "countup")
        time = new Date() - this.initialDate;
    else {
        time = Math.max(0, this.initialDate - new Date());
        if (time === 0)
            clearInterval(this.interval);
    }
    
    let hours = Math.floor(time / 1000 / 60 / 60),
        minutes = Math.floor(time / 1000 / 60 - hours),
        seconds = Math.floor(time / 1000 - hours - minutes);

    this.element.textContent = this.mask
        .replace(/h{1,2}/g, p => pad(hours, p.length))
        .replace(/m{1,2}/g, p => pad(minutes, p.length))
        .replace(/s{1,2}/g, p => pad(seconds, p.length));

};