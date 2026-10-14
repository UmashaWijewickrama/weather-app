    const apiKey = "c4206c033365ab072ffc3c05558f773d";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric";
    const searchBox = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");

    async function getWeather(city) {
        const response = await fetch(apiUrl.replace("{city}", city) + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            var data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            if (data.weather[0].main == "Clouds") {
                document.querySelector(".Weather-icon").src = "images/cloud.png";
            } else if (data.weather[0].main == "Clear") {
                document.querySelector(".Weather-icon").src = "images/clear.png";
            } else if (data.weather[0].main == "Rain") {
                document.querySelector(".Weather-icon").src = "images/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                document.querySelector(".Weather-icon").src = "images/drizzle.png";
            } else if (data.weather[0].main == "Mist") {
                document.querySelector(".Weather-icon").src = "images/mist.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    }

    searchBox.addEventListener("keypress",(event)=>{
        if(event.key === "Enter"){
            getWeather(searchBox.value);
        }
    })

    searchButton.addEventListener("click", () =>{
        getWeather(searchBox.value);
    });