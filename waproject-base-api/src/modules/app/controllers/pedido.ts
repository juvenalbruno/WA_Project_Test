import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidoService } from '../services/pedido';

@Controller()
export class PedidoController {
    constructor(private pedidoService: PedidoService){}

    @Post('/pedido')
    create(@Body() pedido: Pedido): Pedido {
        return this.pedidoService.create(pedido);
    }

    @Get('/pedido')
    findAll(): Pedido[] {
        return this.pedidoService.findAll();
    }
    
}