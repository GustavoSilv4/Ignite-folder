import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  handler(): string {
    return "Ola gustavo";
  }

  @Post('/hello')
  store(): string {
    return "Post";
  }
}
