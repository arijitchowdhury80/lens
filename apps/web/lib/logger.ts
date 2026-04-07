import pino from 'pino';

/**
 * Application-wide pino logger instance.
 *
 * In development, logs are pretty-printed via pino-pretty when available.
 * In production (or when pino-pretty cannot be resolved by the bundler),
 * raw JSON output is used instead.
 */
function createLogger() {
  const level = process.env.LOG_LEVEL ?? 'info';

  if (process.env.NODE_ENV === 'development') {
    try {
      return pino({
        level,
        transport: { target: 'pino-pretty' },
      });
    } catch {
      // pino-pretty may not resolve under Turbopack — fall back to plain JSON
      return pino({ level });
    }
  }

  return pino({ level });
}

export const logger = createLogger();
