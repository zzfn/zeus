declare module '*.less' {
  const classes: Record<string, string>;
  export default classes;
}
declare module '*.png';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    API_URL: string;
    PUBLIC_URL: string;
  }
}
