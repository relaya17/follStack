declare module 'hpp';
declare module 'xss-clean';

// Allow importing these modules without TS declarations
declare module 'hpp' {
  const hpp: (...args: any[]) => any
  export default hpp
}
declare module 'xss-clean' {
  const xssClean: (...args: any[]) => any
  export default xssClean
}


