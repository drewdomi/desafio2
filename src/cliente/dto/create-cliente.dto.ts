import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateEnderecoDto } from './create-endereco.dto';

export class CreateClienteDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEnderecoDto)
  enderecos: CreateEnderecoDto[];
}
