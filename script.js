const populate = async (value, currency) => {
    let myStr = ""
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_7UNwuulBPi6V82XlxAke8BZNKBWXAGv13WNewyq3&base_currency=${currency}`
    let response = await fetch(url)
    let rJson = await response.json()

    if (response.ok) { // Check if the response is successful
        document.querySelector(".output").style.display = "block"

        for (let key of Object.keys(rJson["data"])) {
            myStr += ` <tr>
                            <td>${key}</td>
                            <td>${rJson["data"][key]["code"]}</td>
                            <td>${Math.round(rJson["data"][key]["value"] * value)}</td>
                        </tr> 
                    `
        }
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = myStr;
    } else {
        console.error('API error:', rJson); // Log API errors if any
    }
}

const btn = document.querySelector(".btn")
btn.addEventListener("click", (e) => {
    e.preventDefault()
    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value
    populate(value, currency)
})
