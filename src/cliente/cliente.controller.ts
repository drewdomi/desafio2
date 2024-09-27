import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async criar(@Body() dto: CreateClienteDto) {
    return await this.clienteService.criar(dto);
  }

  @Get()
  async findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.clienteService.findById(Number(id));
  }

  @Patch(':id')
  async atualizarById(@Param('id') id: number, @Body() dto: UpdateClienteDto) {
    return this.clienteService.atualizarById(Number(id), dto);
  }

  @Delete(':id')
  async deletarById(@Param('id') id: number) {
    return this.clienteService.deletarById(Number(id));
  }
}
