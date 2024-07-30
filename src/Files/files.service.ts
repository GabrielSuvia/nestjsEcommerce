import { Injectable } from "@nestjs/common";
import { FilesRepository } from "./file.repository";
import { resolve } from "path";
import {UploadApiErrorResponse, UploadApiResponse, v2} from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()

export class FilesServices{
    constructor(private readonly fileRepository: FilesRepository){}

    async uploadImage(file:Express.Multer.File, productId:string): Promise<UploadApiResponse>{
            return new Promise ((resolve, reject) =>{
                const upload = v2.uploader.upload_stream(
                  {resource_type: 'auto'},
                  (error, result) =>{
                    if(error){
                        reject(error)
                    }else{
                        resolve(result)
                    }
                  }
             )
             toStream(file.buffer).pipe(upload);
            });

           await this.fileRepository.updateFile(file, productId)
    }
}
