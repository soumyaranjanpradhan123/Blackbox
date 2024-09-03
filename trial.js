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

// Function to fetch and handle data
function fetchData() {
    fetch('https://nodered.bbxvisible.com:1880/aqi')
        .then(response => response.text()) // Get the response as text
        .then(text => {
            const data = parseTextResponse(text); // Parse the text response
            
            // Print the entire data object
            console.log('Parsed Data:', data);
            
            // Print individual data points
            console.log(`Unique ID: ${data['UniqueId']}`);
            console.log(`Time: ${data['Time']}`);
            console.log(`Humidity: ${data['Humidity']}`);
            console.log(`Temperature: ${data['Temperature']}`);
            console.log(`Pressure: ${data['Pressure']}`);
            console.log(`TVOC: ${data['TVOC']}`);
            console.log(`eCO2: ${data['eCO2']}`);
            console.log(`AQI: ${data['AQI']}`);
            console.log(`Battery: ${data['Battery']}`);
            console.log(`Received DateTime: ${data['Received DateTime']}`);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch data
fetchData();
