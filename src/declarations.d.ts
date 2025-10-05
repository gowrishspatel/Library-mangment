// src/declarations.d.ts

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
