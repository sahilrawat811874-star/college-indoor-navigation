import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PerformanceLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const started = Date.now();
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(tap(() => {
      const durationMs = Date.now() - started;
      if (durationMs > 500) console.warn(`[slow-request] ${request.method} ${request.url} ${durationMs}ms`);
    }));
  }
}
