import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/hello')
  handler() {
    return this.prisma.user.findMany()
  }

  @Post('/hello')
  store(): string {
    return 'Post'
  }
}
