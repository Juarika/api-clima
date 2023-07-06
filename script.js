async function fetchData(ciudad) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=edae82c48f295596a373a027a56f68f5`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw 'Error al obtener los datos';
    }
}

async function displayData(ciudad) {
    try {
        const data = await fetchData(ciudad);
        document.querySelector('.card-title').innerHTML = data.name     
        document.querySelector('#description').innerHTML = data.weather[0].description     
        document.querySelector('#temperature').innerHTML = (data.main.temp -273.15).toFixed(0) + ' °C'
        document.querySelector('#humidity').innerHTML ='Humidity: ' + data.main.humidity + '%'
        document.querySelector('#wind').innerHTML ='Wind: ' + data.wind.speed + ' Km/h'
        document.querySelector('#pressure').innerHTML ='Pressure: ' + data.main.pressure + '  hPa'
        document.querySelector('#feels_like').innerHTML ='Feels Like: ' + (data.main.feels_like-273.15).toFixed(0) + ' °C'
        document.querySelector('#imagen').src =`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`       
         const dataContainer = document.getElementById('data-container');
         dataContainer.innerText = JSON.stringify(data);
    } catch (error) {
        console.error(error);
    }
}

displayData('bucaramanga');  

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let input = document.getElementById('myInput');
    displayData(input.value)
});