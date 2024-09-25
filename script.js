let inputbox= document.getElementById("inputbox");
let inputbtn= document.getElementById("inputbtn");
let sunrisetime=document.querySelector("#today_sunrise");
let sunsettime=document.querySelector("#today_sunset");


 const Forecast_API=` https://api.weatherapi.com/v1/forecast.json?key=6aa701175db0497ab8e45307242409&days=7&aqi=no&alerts=no&q=`;



 async function Forecastweather(city){
    const respond=await fetch(Forecast_API+city);
    var data = await respond.json();

    let days=[
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thrusday',
        'Friday',
        'Saturday'
    ],
    months=[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]
    let date=new Date();

    document.querySelector("#name").innerText =data.location.name;

    document.querySelector("#statename").innerText =data.location.region;

    document.querySelector("#countryname").innerText =data.location.country;

    document.querySelector("#today_day").innerText =days[date.getDay()];

    document.querySelector("#today_month").innerText =months[date.getMonth()];

    document.querySelector("#today_date").innerText=date.getDate();

    document.querySelector("#today_time").innerText =date.toLocaleTimeString();
    
    document.querySelector("#today_weather_type").innerText =data.forecast.forecastday[0].day.condition.text;

    document.querySelector("#todays_weather_type").innerText =data.forecast.forecastday[0].day.condition.text;

    document.querySelector("#today_temp").innerText =(data.current.temp_c);

    document.querySelector("#todays_temp").innerText =(data.current.temp_c);
    
    document.querySelector("#today_days").innerText =days[date.getDay()];
   
    document.querySelector("#today_icon").innerHTML=`<img class='h-24' src='https:${data.forecast.forecastday[0].day.condition.icon}'>`;
   
   document.querySelector("#today_max_temp").innerText=data.forecast.forecastday[0].day.maxtemp_c;

   document.querySelector("#today_min_temp").innerText=data.forecast.forecastday[0].day.mintemp_c;
   
   document.querySelector("#today_humidity").innerText=data.current.humidity;
   
   document.querySelector("#today_pressure").innerText=data.current.pressure_mb;
   
   document.querySelector("#today_wind").innerText=data.current.wind_kph;
   
   document.querySelector("#today_visibility").innerText=data.current.vis_km;
   
   
   sunrisetime.innerText=data.forecast.forecastday[0].astro.sunrise;
   sunsettime.innerText=data.forecast.forecastday[0].astro.sunset;

   
let currentTime = new Date(); 
let currentHour = currentTime.getHours(); 

let nextSixHours = data.forecast.forecastday[0].hour.slice(currentHour, currentHour + 6);

nextSixHours.forEach((hourData, index) => {

    let forecastTime = new Date(hourData.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    document.querySelector(`#Today_forecast_time_${index + 1}`).innerText = forecastTime; 
    document.querySelector(`#Today_forecast_icon_${index + 1}`).innerHTML = `<img class='h-24' src="https:${hourData.condition.icon}" alt="Weather Icon">`; 
    document.querySelector(`#Today_forecast_temp_${index + 1}`).innerText = `${hourData.temp_c}`; 
    document.querySelector(`#Today_forecast_sky_${index + 1}`).innerText = hourData.condition.text; 
    
    });


    let forecastDays = data.forecast.forecastday.slice(1); 
    forecastDays.forEach((day, index) => {
    document.querySelector(`#Next_day_${index+1}`).innerText = days[new Date(day.date).getDay()];
    document.querySelector(`#Next_day_weather_icon_${index+1}`).innerHTML = `<img class='h-24' src='https:${day.day.condition.icon}'>`;
    document.querySelector(`#Next_day_temp_${index+1}`).innerText = day.day.avgtemp_c;
    document.querySelector(`#Next_day_weather_type_${index+1}`).innerText = day.day.condition.text;
    });
    console.log(data);
};

inputbtn.addEventListener("click",() =>{
Forecastweather(inputbox.value);  })