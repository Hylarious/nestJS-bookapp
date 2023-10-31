import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/create-author.dto';
import { UpdateAuthorDTO } from './dtos/update-author.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) { }

    @Get('/')
    getAll(): any {
        return this.authorsService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const auth = await this.authorsService.getById(id);
        if (!auth) throw new NotFoundException('Author not found');
        return auth;
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    create(@Body() authorData: CreateAuthorDTO) {
        return this.authorsService.create(authorData)
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() authorData: UpdateAuthorDTO) {
        if (!(await this.authorsService.getById(id))) {
            throw new NotFoundException('Author not found')
        }
        await this.authorsService.update(id, authorData)
        return { success: true }
    }
    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!(await this.authorsService.getById(id))) {
            throw new NotFoundException('Author not found')
        }
        await this.authorsService.deleteById(id)
        return { success: true }
    }
}
