import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class updateuserDto extends PartialType(CreateUserDto) { }