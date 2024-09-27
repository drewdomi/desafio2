import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  async criar(dto: CreateProdutoDto) {
    await this.prisma.produto.create({
      data: {
        nome: dto.nome,
        descricao: dto.descricao,
        preco: dto.preco,
        quantidade: dto.quantidade,
        categoriaId: dto.categoriaId,
      },
    });
  }

  async findAll() {
    return await this.prisma.produto.findMany({
      include: {
        categoria: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.produto.findUnique({
      where: { id },
      include: {
        categoria: true,
      },
    });
  }

  async atualizarById(id: number, updateProdutoDto: UpdateProdutoDto) {
    await this.prisma.produto.update({
      where: { id },
      data: {
        nome: updateProdutoDto.nome,
        descricao: updateProdutoDto.descricao,
        preco: updateProdutoDto.preco,
        categoriaId: updateProdutoDto.categoriaId,
      },
    });
  }

  async deletarById(id: number) {
    await this.prisma.produto.delete({
      where: { id },
    });
  }
}
