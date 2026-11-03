const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
// getApiKey() is rendering the API key in an env.js file
let apiKey = getApiKey();
// const apiKey = 'process.env.API_KEY' if using dotenv

weatherForm.addEventListener('submit', async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error)
            displayError(error)
        }
    }
    else{
        displayError("Please enter a city")
    }
})

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl)

    if(!response.ok){
        throw new Error('Could not fetch weather data')
    }

    return await response.json()
}

function displayWeatherInfo(data){
    //on destructure les objets et les array d'objets
    const { name: city,
            main: {temp,humidity},
            weather:[{description,id}],
            dt: currentDateTime,
            sys: {country, sunrise, sunset},
            timezone : timezone
            } = data
    
    // on reset le contenu de la classe .card
    card.textContent = "";
    card.style.display= "flex"
    
    // on crée des éléments dans le DOM
    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")
    const currentDateDisplay = document.createElement("p")
    const sunriseDisplay = document.createElement("p")
    const sunsetDisplay = document.createElement("p")
    
    // on ajoute le texte à l'élément html
    cityDisplay.textContent = city + ` (${country})`
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1) }°C` //pour avoir la temp de Kalvin à Celsius et arrondir à 1 chiffre
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = description
    weatherEmoji.textContent = getWeatherEmoji(id)
    currentDateDisplay.textContent = `${new Date(currentDateTime * 1000).toDateString()}`
    sunriseDisplay.textContent = `Sunrise : ${new Date((sunrise + timezone) * 1000).toUTCString().slice(16,25)}`
    sunsetDisplay.textContent =`Sunset : ${new Date((sunset + timezone) * 1000).toUTCString().slice(16,25)}`


    //on ajoute l'élément à une classe du fichier css
    cityDisplay.classList.add('cityDisplay')
    tempDisplay.classList.add('tempDisplay')
    humidityDisplay.classList.add('humidityDisplay')
    descDisplay.classList.add('descDisplay')
    weatherEmoji.classList.add('weatherEmoji')
    currentDateDisplay.classList.add('currentDateDisplay')
    sunriseDisplay.classList.add('sunriseDisplay')
    sunsetDisplay.classList.add('sunsetDisplay')

    //on append l'element à l'élément de la classe 'card'
    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
    card.appendChild(currentDateDisplay)
    card.appendChild(sunriseDisplay)
    card.appendChild(sunsetDisplay)

}

function getWeatherEmoji(weatherId){
    //voir les id codes sur le site de openweatherapi
    switch(true){
            case (weatherId >= 200 && weatherId < 300):
                return "⛈️";
            case (weatherId >= 300 && weatherId < 400):
                return "🌧️";
            case (weatherId >= 500 && weatherId < 600):
                return "🌧️";  
            case (weatherId >= 600 && weatherId < 700):
                return "❄️";    
            case (weatherId >= 700 && weatherId < 800):
                return "🌫️";
            case (weatherId === 800):
                return "☀️";  
            case (weatherId >= 801 && weatherId < 810):
                return "☁️";  
            default:
                return "❓"
            }
    }

function displayError(message){
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message
    // on ajoute l'element à la classe 'errorDisplay' du css
    errorDisplay.classList.add("errorDisplay")

    // on réinitialise le contenu de la classe card
    card.textContent = "";
    card.style.display = "flex"
    // on ajoute un element enfant à la classe card
    card.appendChild(errorDisplay)

}
