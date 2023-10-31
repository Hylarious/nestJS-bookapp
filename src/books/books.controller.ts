import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LikeBookDTO } from './dtos/like-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get('/')
    getAll() {
        return this.booksService.getAll()
    }
    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const book = await this.booksService.getById(id)
        if (!book) { throw new NotFoundException('Book not found') }
        return book
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!(await this.booksService.getById(id))) {
            throw new NotFoundException('Book not found')
        }
        await this.booksService.deleteById(id)
        return { success: true }
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    create(@Body() bookData: CreateBookDTO) {
        return this.booksService.create(bookData);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() bookData: UpdateBookDTO) {
        if (!(await this.booksService.getById(id))) {
            throw new NotFoundException('Book not found')
        }
        await this.booksService.update(id, bookData)
        return { success: true }
    }

    @Post('/like')
    @UseGuards(JwtAuthGuard)
    async like(@Body() likeBookInfo: LikeBookDTO) {
        
        await this.booksService.likeBook(likeBookInfo)
        return {success: true}
    }

}
