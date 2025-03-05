import { Injectable, Logger } from '@nestjs/common';
import { MiddlewareOptions, TRPCMiddleware } from 'nestjs-trpc';
import { IAppContext } from '../context/context.interface';

@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  async use(opts: MiddlewareOptions<IAppContext>) {
    const start = Date.now();
    const { next, path, type } = opts;
    const result = await next();
    const end = Date.now();
    const duration = end - start;

    const { req, res } = opts.ctx;

    const meta = {
      path,
      type,
      duration,
      method: req.method,
      statusCode: res.statusCode,
      ip: req.ip,
      headers: req.headers,
    };

    result.ok
      ? this.logger.log('Success', meta)
      : this.logger.error('Error', meta);

    return result;
  }
}
