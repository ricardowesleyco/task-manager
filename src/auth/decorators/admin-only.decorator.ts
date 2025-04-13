import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { rolesEnum } from '../enums/roles.enum';
export const AdminOnly = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userService = ctx.switchToHttp().getResponse().locals.userService;
    const userId = request?.user?.user;

    if (!userId) {
      return null;
    }

    const user = await userService.getByUserId(userId);

    if (!user) {
      throw new UnauthorizedException(`User not found.`);
    }

    const role = userService.getRole(user);
    if (role?.role?.key != rolesEnum.ADMIN) {
      throw new UnauthorizedException(`Unauthorized User's role.`);
    }
    return true;
  },
);
