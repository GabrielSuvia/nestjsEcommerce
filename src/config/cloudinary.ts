import {config as dotenvConfig} from 'dotenv';
import {v2} from 'cloudinary';
//Modificar la version

dotenvConfig({path:'./.env.development'});

export const CloudingConfig = {
       provide:'CLOUDING',
       useFactory:()=>{
        return v2.config({
            cloud_name: "dvpgks9ox",
            api_key:"941642474413476",
            api_secret:"yBLsELFryHcI8mXHwd8Vf_DWWfQ"
        });
       },

};
