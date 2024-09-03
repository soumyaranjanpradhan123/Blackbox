document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch data from the API
    function fetchData() {
        fetch('https://nodered.bbxvisible.com:1880/aqi')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                
                const data = parseTextResponse(text);
                
                
                updateDashboard(data);
                lastData(text)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Function to parse the text response
    function parseTextResponse(text) {
        const data = {};
        const lines = text.split('\n');

        lines.forEach((line) => {
            const [key, value] = line.split(':').map((item) => item.trim());
            if (key && value !== undefined) {
                data[key] = value;
            }
        });

        return data;
    }
    function lastData(text){
        
        const lines = text.split('\n');
        document.getElementById("last-refreshed").textContent = lines[1];
        console.log(data["Received DateTime"]);
        
    }

    // Function to update the dashboard
    function updateDashboard(data) {
        document.getElementById("temperature-value").textContent = data.Temperature + '°C';
        document.getElementById("humidity-value").textContent = data.Humidity + '%';
        document.getElementById("pressure-value").textContent = data.Pressure + ' hPa';
        document.getElementById("tvoc").textContent = data.TVOC + ' ppb';
        document.getElementById("co2").textContent = data.eCO2 + ' ppm';
        document.getElementById("aqi").textContent = data.AQI + '';
        document.getElementById("battery").textContent = data.Battery + '%'; 

        // Update the last refreshed time in the footer
        document.getElementById("last-refreshed").textContent = data["Received DateTime"];
        console.log(data["Received DateTime"]);
        
    }

    
    fetchData();

    
});
