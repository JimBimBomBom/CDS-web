class CityDistanceClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getDistance(city1, city2) {
        try {
            const response = await fetch(`${this.baseUrl}/distance`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ City1: city1, City2: city2 })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

export { CityDistanceClient };
