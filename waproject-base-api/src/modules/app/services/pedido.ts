import { Injectable } from '@nestjs/common';
import { PedidoDto } from '../validators/profile/pedido';

@Injectable()
export class PedidoService {
    public pedidos: PedidoDto[] = [];

    create(pedido: PedidoDto): PedidoDto {
        this.pedidos.push(pedido);
        return pedido;
    }

    findAll(): PedidoDto[] {
        return this.pedidos;
    }
}