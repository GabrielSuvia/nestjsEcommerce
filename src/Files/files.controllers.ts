import { Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesServices } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/Auth/auth.guard";


@Controller('Files')
export class FilesControllers{
    constructor(private readonly filesService: FilesServices){}
@Post('UploadImage/:id')
//@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('image'))//nombre del archivo traido del cliente
    async getImages(@UploadedFile() file: Express.Multer.File, @Param('id') productId:string){
               await this.filesService.uploadImage(file, productId)
    }
}