import { SetMetadata } from "@nestjs/common";
import {Role} from './roles.enum';

export const Roles = (...roles: Role[]) =>SetMetadata('roles', roles);//asociado a cada request que recibimos