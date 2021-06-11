
const apikey="f702d477f801433a299a86a0f5caa929";
const place=document.querySelector("#place");
const country=document.querySelector("#country");
const temp=document.querySelector("#temp");
const weather_icon=document.querySelector(".weatherIcon");
const description=document.querySelector("#description");
const humidity=document.querySelector("#humidity");
const wind=document.querySelector("#wind");
const searchBtn=document.querySelector(".icon");
const searchBar=document.querySelector("#search-bar");
const weatherCard=document.querySelector(".weather");


function fetchWeather(city)
{
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=metric&appid="
        +apikey)
        .then(response=>response.json())
        .then(data=>displayData(sortData(data)))
}


function sortData(json)
{
    var placeData=json.name;
    var countryData=json.sys.country;
    var descriptionData=json.weather[0];
    var tempData=json.main.temp;
    var icon=json.weather[0].icon;
    var humidityData=json.main.humidity;
    var windSpeed=json.wind.speed;


    return weatherReport={placeData,countryData,descriptionData,tempData,icon,humidityData,windSpeed};
    

}


function displayData(weatherReport)
{
    var {placeData,countryData,descriptionData,tempData,icon,humidityData,windSpeed}=weatherReport
    place.innerHTML=placeData+",";
    country.innerHTML=countryData;
    temp.innerHTML=tempData;
    description.innerHTML=descriptionData.description;
    humidity.innerHTML="Humidity :"+humidityData;
    wind.innerHTML="Wind :"+windSpeed+"km/h";
    weather_icon.src="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    weatherCard.classList.remove("loading");
}

function clickHandler()
{
    console.log("clicked");
    const city=searchBar.value;
    fetchWeather(city);
}



searchBtn.addEventListener("click",clickHandler);

searchBar.addEventListener("keyup",function()
{
    if(event.key=="Enter")
    {
        clickHandler();
    }
})