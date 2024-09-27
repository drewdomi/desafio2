import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async criar(@Body() dto: CreateCategoriaDto) {
    return this.categoriaService.criar(dto);
  }

  @Get()
  async findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.categoriaService.findById(Number(id));
  }

  @Patch(':id')
  async atualizarById(
    @Param('id') id: number,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.atualizarById(Number(id), dto);
  }

  @Delete(':id')
  async deletarById(@Param('id') id: number) {
    return this.categoriaService.deletarById(Number(id));
  }
}
