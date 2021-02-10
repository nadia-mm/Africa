let resultId = document.getElementById("resultId");
let baseUrl = "https://restcountries.eu/rest/v2";
let allAfricanCountriesURL = baseUrl + "/region/africa";


async function searchCountries() {
    resultId.innerHTML = "";

    let response = await fetch(allAfricanCountriesURL);
    let reply = await fetch(response.url);
    let countries = await reply.json()
        .then((data) => {
            displayCountries(data);
        })
        .catch(err => {
          console.log(err.message)
        });
}

function displayCountries(data) {

    resultId.innerHTML = "";
    if (data.length === 0) {
        resultId.innerHTML = "<div class='errorMessage'>Sorry, no African country found!<div>";
    } else {
        let v_table = document.createElement("table");
        resultId.appendChild(v_table);
        
        let v_tr = document.createElement("tr");
        v_tr.innerHTML = "<th>Name</th><th>Capital</th><th>Flag</th>"
        v_table.appendChild(v_tr);

        for (let index=0; index <data.length; index++) {
            let country = data[index];
            if (country === undefined) {
                break;
            }
            displayCountry(country, v_table);
        }
    }

}

function displayCountry(country, v_table) {
    let v_tr = document.createElement("tr");
    v_tr.innerHTML = "<td>" + country.name + "</td><td>" + country.capital + "</td><td><img class='flag' src='" + country.flag + "' /></td>";
    v_table.appendChild(v_tr);
}
