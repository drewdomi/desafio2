import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  // Criar um cliente
  async criar(dto: CreateClienteDto) {
    const exists = await this.prisma.cliente.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (exists)
      throw new ConflictException('Cliente já cadastrado com esse email');

    this.prisma.cliente.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        telefone: dto.telefone,
        enderecos: {
          create: dto.enderecos, // Assume que endereços são passados dentro do DTO
        },
      },
    });
  }

  // Listar todos os clientes
  async findAll() {
    return this.prisma.cliente.findMany({
      include: {
        enderecos: true, // Inclui os endereços relacionados
      },
    });
  }

  // Consultar um cliente pelo ID
  async findById(id: number) {
    return this.prisma.cliente.findUnique({
      where: { id },
      include: {
        enderecos: true, // Inclui os endereços relacionados
      },
    });
  }

  // async atualizarById(id: number, dto: UpdateClienteDto) {
  //   this.prisma.cliente.update({
  //     where: { id },
  //     data: {
  //       nome: dto.nome,
  //       email: dto.email,
  //       telefone: dto.telefone,
  //       enderecos: {
  //         updateMany: dto.newEnderecos.map((endereco) => ({
  //           where: { id: endereco.id },
  //           data: {
  //             cep: endereco.cep,
  //             rua: endereco.rua,
  //             numero: endereco.numero,
  //             bairro: endereco.bairro,
  //             complemento: endereco.complemento,
  //             cidade: endereco.cidade,
  //             estado: endereco.estado,
  //           },
  //         })),
  //       },
  //     },
  //   });
  // }

  async atualizarById(id: number, dto: UpdateClienteDto) {
    const currentAddresses = await this.prisma.endereco.findMany({
      where: { clienteId: id },
    });

    return await this.prisma.cliente.update({
      where: { id },
      data: {
        nome: dto.nome,
        email: dto.email,
        telefone: dto.telefone,
        enderecos: {
          update: dto.newEnderecos
            .filter((endereco) => endereco.id)
            .map((endereco) => ({
              where: { id: endereco.id },
              data: {
                cep: endereco.cep,
                rua: endereco.rua,
                numero: endereco.numero,
                bairro: endereco.bairro,
                complemento: endereco.complemento,
                cidade: endereco.cidade,
                estado: endereco.estado,
              },
            })),
          create: dto.newEnderecos
            .filter((endereco) => !endereco.id)
            .map((endereco) => ({
              cep: endereco.cep,
              rua: endereco.rua,
              numero: endereco.numero,
              bairro: endereco.bairro,
              complemento: endereco.complemento,
              cidade: endereco.cidade,
              estado: endereco.estado,
            })),
          delete: currentAddresses
            .filter(
              (currentAddress) =>
                !dto.newEnderecos.some(
                  (newAddress) => newAddress.id === currentAddress.id,
                ),
            )
            .map((addressToDelete) => ({ id: addressToDelete.id })),
        },
      },
      include: {
        enderecos: true,
      },
    });
  }

  // Remover um cliente
  async deletarById(id: number) {
    this.prisma.cliente.delete({
      where: { id },
    });
  }
}
