
// Common functionality
const fetchdata = async (q = 'auto:ip') => {
    const api_key = 'd37dfef720b34c6f9b1151923242509';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${q}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const locationobj = data.location;
        const forecastObj = data.forecast;
        const forecast_day = forecastObj.forecastday[0].day;
        const condition = forecast_day.condition;

        // Describing data to use in app
        const avgtemp_c = forecast_day.avgtemp_c;
        const weather_condition = condition.text;
        const location_name = locationobj.name;
        const humidity = forecast_day.avghumidity;
        const will_rain = forecast_day.daily_will_it_rain === 0 ? 'no' : 'yes';

        // Get all elements
        const temp = document.querySelector('.temperature');
        const city = document.querySelector('.city');
        const weather_description = document.querySelector('.description');
        const weather_icon = document.querySelector('.weather-icon');
        const humidity_info = document.querySelector('.Humidity_info');
        const rain_info = document.querySelector('.rain_info');

        if (temp) temp.textContent = avgtemp_c + "°C";
        if (weather_description) weather_description.textContent = weather_condition;
        if (weather_icon) weather_icon.setAttribute('src', condition.icon);
        if (city) city.textContent = location_name;
        if (humidity_info) humidity_info.textContent = `Humidity: ${humidity}%`;
        if (rain_info) rain_info.textContent = `Will it rain today: ${will_rain}`;

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Invalid Input');
    }
};

// Main page functionality
const mainPage = () => {
    const searchbox_main_btn = document.querySelector('.search-main-button');

    if (searchbox_main_btn) {
        searchbox_main_btn.addEventListener('click', () => {
            const searchbox_main_input_value = document.querySelector('.searchbox-main-input').value;
            if (searchbox_main_input_value) {
                localStorage.setItem('searchQuery', searchbox_main_input_value);
                location.href = 'app.html'; // Redirect to the app page
            } else {
                alert("Enter City name, zip postal or country name.");
            }
        });
    }
};

// App page functionality
const appPage = () => {
    const searchbox_app_btn = document.querySelector('.search-button-app');
    const searchbox_app_input = document.querySelector('.search-bar-app');

    if (searchbox_app_btn && searchbox_app_input) {
        searchbox_app_btn.addEventListener('click', () => {
            const searchbox_app_input_value = searchbox_app_input.value;
            if (searchbox_app_input_value) {
                fetchdata(searchbox_app_input_value);
            } else {
                alert("Enter City name, zip postal or country name.");
            }
        });
    }

    // Automatically fetch data if there's a search query from the main page
    window.addEventListener('DOMContentLoaded', () => {
        const searchQuery = localStorage.getItem('searchQuery');
        if (searchQuery) {
            searchbox_app_input.value = searchQuery; // Set the input field
            fetchdata(searchQuery); // Fetch the data immediately
            localStorage.removeItem('searchQuery'); // Clear the stored query
        }
    });
};

// Determine which page to run
if (document.title === "Rainy.com") {
    mainPage();
} else if (document.title === "Rainy_App") {
    appPage();
}
