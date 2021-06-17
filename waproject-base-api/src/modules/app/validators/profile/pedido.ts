// Pedidos
import { IsNumber, IsString } from 'class-validator';

export class PedidoDto {
    @IsNumber()
    id: number;

    @IsString()
    Notebook: string;

    @IsString()
    Cor: string;

    @IsString()
    Quantidade: string;

    @IsString()
    Valor: string;
}