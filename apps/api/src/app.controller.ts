import { TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";

export interface IHelloResponse {
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Получить приветствие
   *
   * @tag App
   * @returns Приветственное сообщение
   */
  @TypedRoute.Get()
  getHello(): IHelloResponse {
    return {
      message: this.appService.getHello(),
    };
  }
}
