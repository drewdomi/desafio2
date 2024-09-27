import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async criar(dto: CreateCategoriaDto) {
    await this.prisma.categoria.create({
      data: {
        nome: dto.nome,
      },
    });
  }

  async findAll() {
    return await this.prisma.categoria.findMany({
      include: {
        produtos: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.categoria.findUnique({
      where: { id },
      include: {
        produtos: true,
      },
    });
  }

  async atualizarById(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.prisma.categoria.update({
      where: { id },
      data: {
        nome: updateCategoriaDto.nome,
      },
    });
  }

  async deletarById(id: number) {
    await this.prisma.categoria.delete({
      where: { id },
    });
  }
}
