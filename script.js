// Planets Class Query Selector & Array för DOM Selectors

const sun = document.querySelector('.sun')
const mercury = document.querySelector('.mercury')
const venus = document.querySelector('.venus')
const earth = document.querySelector('.earth')
const mars = document.querySelector('.mars')
const jupiter = document.querySelector('.jupiter')
const saturn = document.querySelector('.saturn')
const uranus = document.querySelector('.uranus')
const neptune = document.querySelector('.neptune')
const header = document.querySelector('header')

const planetArray = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]

// Query Selectors för Modal

const modal = document.querySelector('.modalsite')
const solarSystem = document.querySelector('.solarsystem')
const closeModalBtn = document.querySelector('.closemodal')
const planetModal = document.querySelector('#zoomedplanet')
const saturnRing = document.querySelector('.ringzoomed')

// Styling 

saturnRing.style.display = "none"
sun.style.position = 'absolute'
mercury.style.marginLeft = '12em'

// Query Selectors för Info texten från Api

const planetName = document.querySelector('.planetname')
const latinName = document.querySelector('.latinname')
const planetType = document.querySelector('.type')
const planetDesc = document.querySelector('.description')
const tempDay = document.querySelector('.tempday')
const tempNight = document.querySelector('.tempnight')
const orbitalPeriod = document.querySelector('.orbitalperiod')
const rotation = document.querySelector('.rotation')
const circumference = document.querySelector('.circumference')
const distance = document.querySelector('.distance')
const moons = document.querySelector('.moons')


// Async / Await för att Fetcha Api

const fetchKey = async () => {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST'
    })

    const data = await response.json()
    const apiKey = data.key
    return apiKey
}


const getInfo = async (apiKey) => {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',
        headers: {'x-zocom': apiKey}
    })

    const data = await response.json()
    const solarInfo = data.bodies
    return solarInfo
}

// Sparar info från key i en variabel

const displayInfo = async () => {
    const apiKey = await fetchKey();

    const solarInfo = await getInfo(apiKey);

// (Main logiken bakom min kod). Matchar indexen i Query Selector Array (från line 13) med API array.

    for (let i = 0; i < solarInfo.length; i++) {
        const planetData = solarInfo[i];
        const planetElement = planetArray[i];

// Event Listener som Loopar och matchar båda indexen, när de är samma i båda arraysen så printas infon + öppnar Modal & döljer planeter

        if (planetElement) {

            planetElement.addEventListener('click', () => {
                solarSystem.style.visibility = 'hidden' // Gömmer planeterna (frontpage)
                header.style.visibility = 'hidden' // Gömmer header
                modal.style.display = 'flex'    // Öppnar Modal (info page)

                planetName.textContent = `${planetData.name}`
                latinName.textContent = `${planetData.latinName}`
                planetDesc.textContent = `${planetData.desc}`
                tempDay.textContent = ` ${planetData.temp.day} °C`
                tempNight.textContent = `${planetData.temp.night} °C`

            // Gör API numbers snyggare. Delar upp i dem istället för en klump

                circumference.textContent = `${new Intl.NumberFormat('sv-SE', { useGrouping: true }).format(planetData.circumference)} km`;
                distance.textContent = `${new Intl.NumberFormat('sv-SE', { useGrouping: true }).format(planetData.distance)} km`;

            // Lägger till white space (mellanrum) mellan varje måne, istället för en klump

                moons.textContent = `${planetData.moons.join(', ')}`;

                // Kopierar planeten man klickar pås CSS class och lägger den på planeten som finns i Modal

                planetModal.className = `${planetElement.className}`

                    // Om planeten inte har en måne, säg att planten inte har någon istället för tomt

                    if (planetData.moons.length === 0) {
                        moons.textContent = `${planetData.name} har inga månar.`
                    }

                    // Om man väljer solen står annan text på distance

                    if (planetElement === sun) {
                        distance.textContent = `☀️ ${planetData.name} är ${planetData.name} ☀️`
                    }


                // Så styling funkar och ser bra ut


                if (planetElement === venus) {
                    planetDesc.style.fontSize = "22px"
                } else {
                    planetDesc.style.fontSize = "1.5em"
                }

                if (planetElement === mercury) {
                    mercury.style.marginLeft = '0em'
                }

                if (planetElement === sun) {
                    sun.style.position = 'relative'
                }

                if (planetElement === saturn) {
                    saturnRing.style.display = "block"
                }
            })

        // User Alert om DOM index inte finns

        } else {
            alert(`No DOM for index: ${i}`);
        }
    }
};

// Stänger modal, resetar och öppnar display för planeterna

closeModalBtn.addEventListener('click', () => {
        solarSystem.style.visibility = 'visible'
        modal.style.display = 'none'
        saturnRing.style.display = "none"
        mercury.style.marginLeft = '12em'
        sun.style.position = 'absolute'
        planetDesc.style.fontSize = "1.5em"
        header.style.visibility = 'visible'
})

displayInfo()
