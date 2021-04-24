// -=MODEL=-
// Array of numbers to create bar graphs from.
let numbers = [7, 3, 1, 5, 8];
// Currently selected bar graph element, if any.
let selectedBar;
// Current content of text input field.
let inputValue;

// -=VIEW=-
function show() {
    let svgInnerHtml = '';

    for (let i = 0; i < numbers.length; i++) {
        // Create a bar for each value in numbers Array.
        svgInnerHtml += createBar(numbers[i], i + 1, selectedBar === i + 1);
    }

    document.getElementById('content').innerHTML = `
                <svg id="chart" width="500" viewBox="0 0 80 60">
                    ${svgInnerHtml}
                </svg><br />
                Valgt stolpe: <i>${selectedBar ? selectedBar : "ingen"}</i>
                <br />
                Verdi:
                <input type="number" min="1" max="10" oninput="inputValue = this.value" />
                <button>Legg til stolpe</button>
                <button ${selectedBar ? selectedBar : "disabled"}>Endre valgt stolpe</button><br />
                <button ${selectedBar ? selectedBar : "disabled"} onClick="removeSelectedBar()">Fjerne valgt stolpe</button>
            `;
}

function clickedBar(bar) {
    let barNo = parseInt(bar.getAttribute("barno"));

    if (barNo === selectedBar) {
        selectedBar = null;
    } else {
        selectedBar = barNo;
    }

    show();
}

/**
 * Create a statistics bar.
 * @param {number} number ?
 * @param {number} barNo ?
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
                  x="${x}" y="${y}" fill="${color}" barno="${barNo}" onClick="clickedBar(this)"></rect>`;
}

/**
 * Removes a given bar, given its bar number.
 * @param {number} barNo
 */
function removeBar(barNo) {
    // Delete the given barNo from numbers Array.
    let deletedBarNumber = numbers.splice(barNo - 1, 1);
    console.log("Removed bar.", deletedBarNumber)

    show();
}

/**
 * Removes the currently selected bar.
 */
function removeSelectedBar() {
    if (selectedBar) {
        removeBar(selectedBar);

        // Clear selection as the previously selected bar is no more.
        selectedBar = null;

        show();
    } else {
        throw new Error("Attempted to remove selected bar when none were selected!");
    }
}

function calcColor(min, max, val) {
    let minHue = 240, maxHue = 0;
    let curPercent = (val - min) / (max - min);
    let colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)"; //FIXME: Redundant vardecl?

    return colString;
}

// -=CONTROLLER=-


show();
