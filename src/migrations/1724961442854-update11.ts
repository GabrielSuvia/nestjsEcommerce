import { MigrationInterface, QueryRunner } from "typeorm";

export class Update111724961442854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`
        INSERT INTO "users" ("email","name","password","address", "phone", "country", "city")
        VALUES
        
           ('jose123@hotmail.com','jose321','Josue123','Avenida nueva oldlife','7897689','bolivia','beni' ),
           ('jose321@hotmail.com','jose123','Josue678','Avenida new walkin','7897689','bolivia','tarija' ),
           ('jose345@hotmail.com','jose345','Josue876','Avenida field river','7897689','bolivia','cochabamba' ),
           ('jose546@hotmail.com','jose543','Josue980','Avenida new mouse','7897689','bolivia','pando' ),
           ('jose567@hotmail.com','jose456','Josue345','Avenida cell phone','7897689','bolivia','sucre' ),
           ('jose678@hotmail.com','jose654','Josue234','Avenida 21street','7897689','argentina','buenos aire');
            
        )
    `);

    await queryRunner.query(`
        
        INSERT INTO "products" ("name","description","price", "stock", "category",)
        VALUES
        
           ('computadoraLg','ultima generacion',34,12,'Computadora'),
           ('celularA20','ultima generacion',20,23,'Celular' ),
           ('mp4','ultima generacion',10,23,'Celular'),
           ('camara','21 pixeles',12,12,'Camara' ),
           ('televisionsony','ultima generacion',15,45,'Televisor' ),
           ('horno','ultima generacion',19,45,'Horno');
            
        )
    `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "users" WHERE "name" IN ('jose321', 'jose123', 'jose345' , 'jose543' , 'jose456' ,'jose654');
        `);

        await queryRunner.query(`
            DELETE FROM "products" WHERE "name" IN ('computadoraLg', 'celularA20', 'mp4' , 'camara' , 'televisionsony' ,'horno');
        `);
    }

}
