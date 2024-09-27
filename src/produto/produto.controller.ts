import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criar(@Body() dto: CreateProdutoDto) {
    return this.produtoService.criar(dto);
  }

  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.produtoService.findById(Number(id));
  }

  @Patch(':id')
  async atualizarById(@Param('id') id: number, @Body() dto: UpdateProdutoDto) {
    return this.produtoService.atualizarById(Number(id), dto);
  }

  @Delete(':id')
  async deletarById(@Param('id') id: number) {
    return this.produtoService.deletarById(Number(id));
  }
}
