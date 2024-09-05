const axios = require('axios');

export const pancardApi =async(httpRequest,reqBody)=>{
    const reqConfig = {
        method: 'POST',
        url: 'https://pan-information-verification-api.p.rapidapi.com/validation/api/v1/panverification',
        headers: {
                'x-rapidapi-key': 'ad065462e3msh95b69108438ebf9p11c99djsn997385e7b469',
                'x-rapidapi-host': 'pan-information-verification-api.p.rapidapi.com',
                'Content-Type': 'application/json'
        },
        data: {
          pan:reqBody,
          consent: 'yes',
          consent_text: 'I hear by declare my consent agreement for fetching my information via AITAN Labs API'
        }
      };
  return  await axios(reqConfig).then((result)=>{
        return result;
    }).catch((err)=>{
        return err;
    })
}

