import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ProfileController } from './controllers/profile';
import { PedidoController } from './controllers/pedido';
import { DeviceRepository } from './repositories/device';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { UserService } from './services/user';
import { PedidoService } from './services/pedido';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, PedidoController],
  providers: [AuthService, UserService, PedidoService, UserRepository, DeviceRepository]
})
export class AppModule {}
