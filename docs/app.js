import { CityDistanceClient } from '../JS-Client/client.js';

let client;

document.getElementById('submitUrl').addEventListener('click', function() {
    const baseUrl = document.getElementById('baseUrl').value.trim();
    if (baseUrl) {
        client = new CityDistanceClient(baseUrl);
        document.getElementById('urlInput').style.display = 'none';
        document.getElementById('apiSelection').style.display = 'block';
    } else {
        document.getElementById('errorMessage').textContent = 'Please enter a valid URL';
    }
});

document.getElementById('distanceApi').addEventListener('click', function() {
    document.getElementById('apiSelection').style.display = 'none';
    document.getElementById('distanceCalculator').style.display = 'block';
});

document.getElementById('calculateDistance').addEventListener('click', async function() {
    const city1 = document.getElementById('city1').value;
    const city2 = document.getElementById('city2').value;
    const resultElement = document.getElementById('result');

    if (!city1 || !city2) {
        resultElement.textContent = 'Please enter both cities';
        return;
    }

    resultElement.textContent = 'Calculating...';

    try {
        const distance = await client.getDistance(city1, city2);
        resultElement.textContent = `Distance between '${city1}' and '${city2}' is: ${distance}`;
    } catch (error) {
        resultElement.textContent = 'An error occurred. Please try again later.';
    }
});

// const client = new CityDistanceClient();

// async function fetchDistance() {
//     try {
//         const distance = await client.getDistance('New York', 'Los Angeles');
//         document.getElementById('result').textContent = `The distance between New York and Los Angeles is ${distance} km.`;
//     } catch (error) {
//         console.error('Error fetching distance:', error);
//         document.getElementById('result').textContent = 'Error fetching distance. Please try again.';
//     }
// }

// fetchDistance();
