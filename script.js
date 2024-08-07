document.getElementById('submit').addEventListener('click', getWeather);

let imageSrc;

async function getWeather() {
    const country = document.getElementById('input').value;
    const apiKey = '0fcc0319f7f3be470eb965d93cc454b6'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;

    
    document.getElementById('weatherdiv').innerHTML = '';
    document.getElementById('hourWeather').innerHTML = '';
    document.getElementById('foreCastDiv').innerHTML = '';

    
    try {
        
        const response = await fetch(weatherUrl);
        const weatherData = await response.json();
        console.log('Current Weather Data:', weatherData);

        // if (weatherData.cod !== 200) {
        //     throw new Error(weatherData.message);
        // }

        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        console.log('Forecast Data:', forecastData);

        if (forecastData.cod !== '200') {
            throw new Error(forecastData.message);
        }

        document.getElementById('weatherdiv').innerHTML = ` <div class="weatherInfo">
                <h3>${country}</h3>
                <h4>${Math.ceil(weatherData.main.temp)} °C</h4>
                <p>${weatherData.weather[0].description}</p>
                <div class="highTemp">
                    <p>H: <span>${Math.ceil(weatherData.main.temp_max).toFixed(0)} °C</span></p>
                    <p>L : <span>${Math.ceil(weatherData.main.temp_min).toFixed(0)} °C</span></p>
                </div>
            </div>`;

            const hourlyWeatherContainer = document.getElementById('hourWeather');
            console.log(hourlyWeatherContainer)
            hourlyWeatherContainer.innerHTML = '';
            forecastData.list.slice(0, 5).forEach(hour => {
                
                const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit' });
    
            

                if(hour.weather[0].description === "light rain" || hour.weather[0].description==="moderate rain" || hour.weather[0].description==="heavy rain"){
                    imageSrc = 'https://cdn-icons-png.flaticon.com/128/1146/1146858.png'; 
                }

                if(hour.weather[0].description === "overcast clouds" || hour.weather[0].description==="scattered clouds" || hour.weather[0].description ==="few clouds"){
                    imageSrc = 'https://cdn-icons-png.flaticon.com/512/5712/5712721.png';
                }

                if(hour.weather[0].description === "clear sky"){
                    imageSrc = 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png';
                }
    
                hourlyWeatherContainer.innerHTML += `
                    <div class="showWeather">
                        <h5>${time}</h5>
                        <img src="${imageSrc}" alt="">
                        <p>${Math.ceil(hour.main.temp).toFixed(0)}°C</p>
                    </div>`;
            });

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const foreCastDiv = document.getElementById("foreCastDiv")

            for(i=0; i<forecastData.list.length; i +=8){
                const day = forecastData.list[i]
                const date = new Date(day.dt * 1000)
                const daysName = daysOfWeek[date.getDay()]
                console.log(daysName)
                console.log(foreCastDiv)

                if(day.weather[0].description === "light rain" || day.weather[0].description==="moderate rain" || day.weather[0].description==="heavy rain"){
                    imageSrc = 'https://cdn-icons-png.flaticon.com/128/1146/1146858.png'; 
                }

                if(day.weather[0].description === "overcast clouds" || day.weather[0].description==="scattered clouds" || day.weather[0].description ==="few clouds"){
                    imageSrc = 'https://cdn-icons-png.flaticon.com/512/5712/5712721.png';
                }

                if(day.weather[0].description === "clear sky"){
                    imageSrc = 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png';
                }

                foreCastDiv.innerHTML +=`
                
                <div class="weatherForecast">
                    <h4>${daysName}</h4>
                    <img src="${imageSrc}" alt="">
                    <p>${Math.ceil(day.main.temp_min).toFixed(0)}°C</p>
                    <div class="line"></div>
                    <p>${Math.ceil(day.main.temp_max).toFixed(0)}°C</p>
                </div>
`
    

            }
    

    } catch (error) {
        console.error('Error:', error);
        
    } 
    
}


