import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateEnderecoDto } from './create-endereco.dto';

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {
  @IsNumber()
  id: number;
}
