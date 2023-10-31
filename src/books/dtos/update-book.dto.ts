import { IsNotEmpty, IsString, Length, IsUUID, IsInt, Min, Max } from "class-validator"

export class UpdateBookDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    title: string

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    authorId: string

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1000)
    price: number
}