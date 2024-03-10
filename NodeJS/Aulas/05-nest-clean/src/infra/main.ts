import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false, // Desabilitar o console de logs do nest
  })

  const envService = app.get(EnvService)

  const port = envService.get('PORT')

  await app.listen(port)
}
bootstrap()
