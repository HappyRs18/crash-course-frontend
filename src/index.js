console.log("index.js");
// TODO: Find out why bundle.js is not created

const basePath = `http://localhost:3000`;
const url = `inflationsrechner`;

const heutigerWertElement = document.getElementById('heutiger-wert');
const heutigerWertNachInflationElement = document.getElementById('heutiger-wert-nach-inflation');
const benoetigterWertNachInflationElement = document.getElementById('benoetigter-wert-nach-inflation');
const benoetigterWertFuerAusgleichElement = document.getElementById('benoetigter-wert-fuer-ausgleich');

// fetch(`${basePath}/${url}`).then(
//     (res) => console.log(res.json())
// );

async function getInflationsrechnerErgebnisse() {
    const response = await fetch(`${basePath}/${url}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            "inflationsRate": 2.5,
            "heutigerWert": 1000,
            "jahre": 2
        })
    });

    return response.json();


}

function formatNumber(num) {
    if (typeof (num) !== 'number')
        return 0;

    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(num);
}

getInflationsrechnerErgebnisse().then((result) => {

    if (result != null) {
        if (heutigerWertElement != null) {
            console.log("typeof(result.wertHeute)", typeof (result.wertHeute));
            if (typeof (result.wertHeute) === 'number')
                heutigerWertElement.innerHTML = formatNumber(result.wertHeute);
        }

        if (heutigerWertNachInflationElement != null) {
            heutigerWertNachInflationElement.innerHTML = formatNumber(result.wertNachInflation);
        }

        if (benoetigterWertNachInflationElement != null) {
            benoetigterWertNachInflationElement.innerHTML = formatNumber(result.wertBenoetigtNachInflation);
        }

        if (benoetigterWertFuerAusgleichElement != null) {
            benoetigterWertFuerAusgleichElement.innerHTML = formatNumber(result.wertBenoetigtFuerAusgleich);
        }
    }
});
