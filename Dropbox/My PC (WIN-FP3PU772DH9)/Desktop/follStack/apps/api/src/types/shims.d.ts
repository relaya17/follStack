declare module 'hpp';
declare module 'xss-clean';

// Allow importing these modules without TS declarations
declare module 'hpp' {
  import { RequestHandler } from 'express'
  const hpp: (...args: unknown[]) => RequestHandler
  export default hpp
}
declare module 'xss-clean' {
  import { RequestHandler } from 'express'
  const xssClean: (...args: unknown[]) => RequestHandler
  export default xssClean
}


