document.getElementById('searchBtn').addEventListener('click', function() {
    const city1 = document.getElementById('city1').value;
    const city2 = document.getElementById('city2').value;

    console.log('Sending request to the server with:', { City1: city1, City2: city2 });

    fetch('188.167.157.174:8080/distance', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ City1: city1, City2: city2 })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('result').innerText = `Distance between '${city1}' and '${city2}' is: ${data}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An error occurred. Please try again later.';
    });
});
