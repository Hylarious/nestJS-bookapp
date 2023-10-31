import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateAuthorDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    name: string

    @IsNotEmpty()
    @IsString()
    @Length(2, 3)
    country: string
}