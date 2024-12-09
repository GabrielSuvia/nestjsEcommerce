import { BadRequestException, Controller, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesServices } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
//import { AuthGuard } from "src/Auth/auth.guard";

@Controller('Files')
export class FilesControllers{
    constructor(private readonly filesService: FilesServices){}

@Post('UploadImage/:id')
//@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('image'))//nombre del archivo traido a la imagen
    async uploadImages(@UploadedFile() file: Express.Multer.File, @Param('id', ParseUUIDPipe) id:string){
        const maxSize = 200 * 1024; // 200KB
        if (file.size > maxSize) {
          throw new BadRequestException('File size exceeds the maximum limit of 200KB');
        }      
        await this.filesService.uploadServiceImage(file, id)
    }
}