const axios = require('axios');

export const bankApi =async(httpRequest,reqBody)=>{
    const reqConfig = {
        method: 'POST',
        url: 'https://indian-bank-account-verification.p.rapidapi.com/v3/tasks/async/verify_with_source/validate_bank_account',
        headers: {
                'x-rapidapi-key': 'ad065462e3msh95b69108438ebf9p11c99djsn997385e7b469',
                'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com',
                'Content-Type': 'application/json'
        },
        data: {
            task_id: '123',
            group_id: '1234',
            data: {
              bank_account_no: '1234123412341234',
              bank_ifsc_code: 'ABCD12341234'
            }
          }
      };
  return  await axios(reqConfig).then((result)=>{
        return result;
    }).catch((err)=>{
        return err;
    })
}
