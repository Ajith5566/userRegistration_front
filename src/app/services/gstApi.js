const axios = require('axios');

export const gstApi =async(httpRequest,reqBody)=>{
    const reqConfig = {
        method: 'POST',
        url: 'https://gst-verification.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_gst_certificate',
        headers: {
                'x-rapidapi-key': 'ad065462e3msh95b69108438ebf9p11c99djsn997385e7b469',
                'x-rapidapi-host': 'gst-verification.p.rapidapi.com',
                'Content-Type': 'application/json'
        },
        data: {
            task_id: '74f4c926-250c-43ca-9c53-453e87ceacd1',
            group_id: '8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e',
            data: {
              gstin: '04AABCU9603R1ZV'
            }
          }
      };
  return  await axios(reqConfig).then((result)=>{
        return result;
    }).catch((err)=>{
        return err;
    })
}

