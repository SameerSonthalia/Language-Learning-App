const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://endlessmedicalapi1.p.rapidapi.com/UpdateFeature',
  params: {
    name: '<REQUIRED>',
    value: '<REQUIRED>',
    SessionID: '<REQUIRED>'
  },
  headers: {
    'X-RapidAPI-Key': '8ae7b4c085mshb0abf67e06acfb5p144a75jsn53fab6b64273',
    'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}