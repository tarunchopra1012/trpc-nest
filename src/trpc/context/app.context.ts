import { Injectable } from '@nestjs/common';
import { TRPCContext } from 'nestjs-trpc';
import { IAppContext } from './context.interface';
import { Context } from 'vm';

@Injectable()
export class AppContext implements TRPCContext {
  async create(opt: Context) {
    return {
      req: opt.req,
      res: opt.res,
    };
  }
}
