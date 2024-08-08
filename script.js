document.getElementById('searchBtn').addEventListener('click', function() {
    const city1 = document.getElementById('city1').value;
    const city2 = document.getElementById('city2').value;

    console.log('Sending request to the server with:', { City1: city1, City2: city2 });

    fetch('https://citydistanceservice-app-v6cgvtuw4a-uc.a.run.app/distance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
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

document.addEventListener('DOMContentLoaded', function() {
    const versionSelect = document.getElementById('versionSelect');

    // Load versions from versions.json
    fetch('docs/versions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load versions.json: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const versions = data.versions;

            if (versions.length === 0) {
                throw new Error('No versions available in versions.json');
            }

            // Populate the select element
            versions.forEach(version => {
                const option = document.createElement('option');
                option.value = version;
                option.textContent = version;
                versionSelect.appendChild(option);
            });

            // Load the first version by default
            loadSwagger(versions[0]);
        })
        .catch(error => {
            console.error('Error loading versions:', error);
            alert('Failed to load API versions. Please check the console for more details.');
        });

    function loadSwagger(version) {
        if (!version) {
            console.error('Version is undefined, cannot load Swagger JSON');
            return;
        }

        const url = `docs/${version}.json`;

        SwaggerUIBundle({
            url: url,
            dom_id: '#swagger-ui',
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            layout: "BaseLayout"
        });
    }

    // Listen for version changes
    versionSelect.addEventListener('change', function() {
        loadSwagger(this.value);
    });
});
