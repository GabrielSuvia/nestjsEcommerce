import {config as dotenvConfig} from 'dotenv';
import {v2} from 'cloudinary';
//Modificar la version

dotenvConfig({path:'./.env.development'});

export const CloudingConfig = {
       provide:'CLOUDING',
       useFactory:()=>{
        return v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET
        });
       },

};
