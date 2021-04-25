# Obligatorisk oppgave 2

## Oppgave

Oppgaven tar utgangspunkt i koden som er vist nederst på siden. Dette er kode som lager et stolpediagram basert på en liste av tall - hvor hvert tall er mellom 1 og 10. Oppgaven består i å fullføre applikasjonen. Den er skrevet etter Model View Controller-patternet - og koden du legger til skal også være det.

* Gjør det mulig å velge en stolpe. Man skal kunne velge en stolpe ved å klikke på den. Den skal da få en svart ramme rundt seg, og i tillegg skal teksten oppdateres til for eksempel "Valgt stolpe: 1". Hvis man klikker på den stolpen som allerede er valgt, skal deretter ingen stolpe være valgt. 
* Knappene "Endre valgt stolpe" og "Fjerne valgt stolpe" skal være disablet når ingen stolpe er valgt - og enablet ellers. 
* Når man trykker på "Fjerne valgt stolpe", skal den valgte stolpen fjernes. Alle stolper som var til høyre for denne, flyttes da ett hakk til venstre. Det vil si at om numbers er [1, 2, 3, 4, 5] - og så fjerner stolpen i midten, så skal numbers etter det være  [1, 2, 4, 5].
* Når man trykker på "Endre valgt stolpe", skal den valgte stolpen endre verdien som brukeren har skrevet i input-boksen. Det er kun 1,2,3,4,5,6,7,8, 9 og 10 som er gyldige verdier. Dersom brukeren ikke har skrevet en gyldig verdi i input-boksen, skal det gis en feilmelding. 
* Når man trykker på "Legg til stolpe", skal det legges til et nytt tall sist i listen (og en ny stolpe lengst til høyre i stolpediagrammet) med verdien som brukeren har skrevet i input-boksen. Dersom brukeren ikke har skrevet en gyldig verdi i input-boksen, skal det gis en feilmelding. 
* Lag enhetstester av controller-funksjonene! Altså funksjonene for å:
    * velge stolpe (teste både velge den som er valgt og en annen)
    * slette en stolpe
    * endre en stolpe
    * legge til en stolpe


```html
<div id="content">
</div>

<script>
    // hjelpevariable for både view og controller
    var contentDiv = document.getElementById('content');

    // model
    let numbers = [7, 3, 1, 5, 8];
    let chosenBar; // Variabel for hvilken stolpe som er valgt
    let inputValue; // Variabel for hva som er skrevet i input-feltet

    // view
    show();
    function show() {
        let svgInnerHtml = '';
        for (let i = 0; i < numbers.length; i++) {
            svgInnerHtml += createBar(numbers[i], i + 1);
        }
        contentDiv.innerHTML = `
            <svg id="chart" width="500" viewBox="0 0 80 60">
                ${svgInnerHtml}
            </svg><br/>
            Valgt stolpe: <i>ingen</i>
            <br />
            Verdi:
            <input type="number" min="1" max="10" oninput="inputValue = this.value" />
            <button>Legg til stolpe</button>
            <button disabled>Endre valgt stolpe</button><br />
            <button disabled>Fjerne valgt stolpe</button>
            `;
    }

    function createBar(number, barNo) {
        const width = 8;
        const spacing = 2;
        let x = (barNo - 1) * (width + spacing);
        let height = number * 10;
        let y = 60 - height;
        let color = calcColor(1, 10, barNo);
        return `<rect width="${width}" height="${height}"
                            x="${x}" y="${y}" fill="${color}"></rect>`;
    }

    function calcColor(min, max, val) {
        var minHue = 240, maxHue = 0;
        var curPercent = (val - min) / (max - min);
        var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
        return colString;
    }

    // controller (ingenting her ennå)
</script>

```