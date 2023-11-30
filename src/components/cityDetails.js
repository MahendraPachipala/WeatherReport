const axios = require('axios');

const OPEN_CAGE_API_KEY = 'e7cbec4493a84f6b89744cb2d587f992'; 

async function CityDetails(latitude, longitude) {
    try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: `${latitude},${longitude}`,
                key: OPEN_CAGE_API_KEY,
            },
        });

        const result = response.data.results[0];

        if (result) {
            const cityDetails = {
                city: result.components.city,
                state: result.components.state,
                country: result.components.country,
                formattedAddress: result.formatted,
                latitude: result.geometry.lat,
                longitude: result.geometry.lng,
            };

            return cityDetails;
        } else {
            throw new Error('No results found for the given coordinates.');
        }
    } catch (error) {
        throw new Error(`Error fetching city details: ${error.message}`);
    }
}

module.exports = CityDetails;
