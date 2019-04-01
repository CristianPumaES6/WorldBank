
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//-----------------  o.O ???????????????????????????? ----------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------



// la data JSON tiene como nombre WORLDBANK se exporto desde el html.

const selectPais = document.getElementById("selectPais");

// Jugaremos con esa data.
const listPais = () => {
    // Obtengo todos los paises usando el Object.keys
    const pais = Object.keys(WORLDBANK);
    let templete = `<option value="Ninguno">---Elije un Pais---</option>`;

    for (let i = 0; i < pais.length; i++) {
        templete += `<option value="${pais[i]}">
                        ${pais[i]}
                    </option>`;
    }
    // Se agrega el template al elemento HTML
    selectPais.innerHTML = templete;
};

// Se ejecuta la funcion para que se listen todos los paises esto solo se ejecuta una vez.
listPais();


//-------------------------------------------------------------------------------------------------------------------------
//--------      LISTAREMOS TODOS LOS INDICADORES POR  PAIS por cada diferente pais -------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

const selectIndicators = document.getElementById("selectIndicators");

const listIndicadores = (pais) => {
    var dataPais = WORLDBANK[pais];
    // Pintamos los valores en el HTML
    document.getElementById("dataSource").innerText = dataPais.dataSource;
    document.getElementById("lastUpdated").innerText = dataPais.lastUpdated;

    const dataIndicators = dataPais.indicators;

    let templete = `<option value="Ninguno">---Elije un Indicador---</option>`;
    for (let i = 0; i < dataIndicators.length; i++) {
        templete += `<option value="${dataIndicators[i].indicatorCode}">
                        ${dataIndicators[i].indicatorName}
                    </option>`;
    }
    selectIndicators.innerHTML = templete;

}

// ----------------  Generar una nueva lista de indicador por cada diferente pais ----------------------

selectPais.addEventListener('change', () => {
    listIndicadores(selectPais.value);
});



//-------------------------------------------------------------------------------------------------------------------------
//--------      LISTAREMOS TODOS LOS AÑOS Y VALORES  -------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

selectIndicators.addEventListener('change', () => {
    // el valueIndicatos se obtiene por el valor de selectIndicators
    const valueIndicators = selectIndicators.value;
    // el valuePais se obtiene por el valor de selectPais
    const valuePais = selectPais.value;

    var dataIndicators = WORLDBANK[valuePais].indicators;

    //Pintamos el HTML
    for (let i = 0; i < dataIndicators.length; i++) {
        //si los codigos son iguales se impremira la metrica.
        if (dataIndicators[i].indicatorCode == valueIndicators) {

            document.getElementById("countryName").innerText = dataIndicators[i].countryName;
            document.getElementById("countryCode").innerText = dataIndicators[i].countryCode;
            document.getElementById("indicatorCode").innerText = dataIndicators[i].indicatorCode;

            document.getElementById("indicatorName").innerText = dataIndicators[i].indicatorName;

            const arrKey = Object.keys(dataIndicators[i].data);
            const arrVal = Object.values(dataIndicators[i].data);

            console.log(arrVal)
            let template = '';
            for (let o = 0; o < arrKey.length; o++) {
                if (arrVal[o] != "") {
                    console.log(arrVal[o] )
                    template += `
                        <div class="cont-barra">
                            <div class="barra" style="height: ${ arrVal[o] }%; background: rgb(5, 236,${ arrVal[o] });">
                                <span class="rotar">${arrKey[o]}</span>
                                <span class="rotar hover"> ${ arrVal[o].toFixed(1) +"%"}<span>
                            </div>
                        </div>
                        `;
                }

                if (o == (arrKey.length - 1)) {
                    console.log("S")
                    document.getElementById("cont-metrica").innerHTML = template;
                }
            }
        }
    }

});