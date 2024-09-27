import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateClienteDto } from './create-cliente.dto';
import { UpdateEnderecoDto } from './update-endereco.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateEnderecoDto)
  newEnderecos: UpdateEnderecoDto[];
}
