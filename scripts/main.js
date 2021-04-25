// -=MODEL=-
// Array of numbers to create bar graphs from.
let numbers = [7, 3, 1, 5, 8];
// Currently selected bar graph element, if any.
let chosenBar;
// Current content of text input field.
let inputValue;

// -=VIEW=-
function show() {
    let svgInnerHtml = '';

    for (let i = 0; i < numbers.length; i++) {
        // Create a bar for each value in numbers Array.
        svgInnerHtml += createBar(numbers[i], i + 1, chosenBar === i + 1);
    }

    document.getElementById('content').innerHTML = `
        <svg id="chart" width="500" viewBox="0 0 80 60">
            ${svgInnerHtml}
        </svg><br />
        Valgt stolpe: <i>${chosenBar ? chosenBar : "ingen"}</i>
        <br />
        Verdi:
        <input type="number" min="1" max="10" oninput="inputValue = this.value" />
        <button>Legg til stolpe</button>
        <button ${chosenBar ? chosenBar : "disabled"} onClick="changeSelectedBarValue()">Endre valgt stolpe</button><br />
        <button ${chosenBar ? chosenBar : "disabled"} onClick="removeSelectedBar()">Fjerne valgt stolpe</button>
    `;
}

/**
 * Create a statistics bar.
 * @param {Number} number ?
 * @param {Number} barNo ?
 * @param {boolean} selected Whether the bar should be marked as selected.
 * @returns {String} SVG RECT String of a bar.
 */
function createBar(number, barNo, selected = false) {
    const width = 8;
    const spacing = 2;
    let x = (barNo - 1) * (width + spacing);
    let height = number * 10;
    let y = 60 - height;
    let color = calcColor(1, 10, barNo);

    return `<rect class="clickable${selected === true ? " selected-item" : ""}" width="${width}" height="${height}" 
                  x="${x}" y="${y}" fill="${color}" onClick="chooseBar(${barNo})"></rect>`;
}

/**
 * Change the value of a bar graph element and update view.
 * @param barNo Bar graph number.
 * @param value New value to set.
 */
function changeBarValue(barNo, value) {
    // Parse value to integer for use in checks.
    const parsedValue = parseInt(value);

    if (isNaN(parsedValue)) throw new Error(`Attempted to change bar value with NaN value! '${value}'`);

    // value is a valid number.
    numbers[barNo - 1] = parsedValue;

    show();
}

/**
 * Change the value of the selected bar graph element and update view.
 */
function changeSelectedBarValue() {
    if (!chosenBar) throw new Error("Attempted to change selected bar value when none were selected!");

    const parsedInputValue = parseInt(inputValue);

    if (0 < parsedInputValue && parsedInputValue <= 10) {
        changeBarValue(chosenBar, inputValue);

        // Clear selection as the previously selected bar is no more.
        chosenBar = null;
    } else {
        alert("Ugyldig verdi! Vennligst oppgi et tall mellom 1 og 10.");
    }

    show();
}

/**
 * Removes a given bar graph element, given its bar graph number.
 * @param {Number} barNo Bar graph number.
 */
function removeBar(barNo) {
    // Delete the given barNo from numbers Array.
    numbers.splice(barNo - 1, 1);

    show();
}

/**
 * Removes the currently selected bar graph element and update view.
 */
function removeSelectedBar() {
    if (!chosenBar) throw new Error("Attempted to remove selected bar when none were selected!");
    removeBar(chosenBar);

    // Clear selection as the previously selected bar is no more.
    chosenBar = null;

    show();
}

/**
 * Calculate a colour value given certain criteria.
 * @param {Number} min Minimum percent.
 * @param {Number} max Maximum percent.
 * @param {Number} val Value.
 * @returns {String} HSL Colour string.
 */
function calcColor(min, max, val) {
    const minHue = 240, maxHue = 0;
    const curPercent = (val - min) / (max - min);

    return "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
}

// -=CONTROLLER=-
/**
 * Action to take when a bar graph is clicked on.
 * @param {Number} barNo Bar graph number.
 */
function chooseBar(barNo) {
    if (typeof(barNo) !== "number") throw new Error(`barNo must be a number! (was: ${typeof(barNo)}).`);

    if (barNo === chosenBar) {
        // If already selected, deselect it.
        chosenBar = null;
    } else {
        // If not selected, select it.
        chosenBar = barNo;
    }

    show();
}

show();
