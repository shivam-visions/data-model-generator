declare module 'data-model-generator' {
    export function generateModelFromSource(
      source: string,
      type: string,
      options?: { interfaceName?: string; mappings?: Record<string, string> }
    ): string;
  
    export function generateModelFromAPI(
      apiUrl: string,
      options?: { interfaceName?: string; outputPath?: string }
    ): Promise<void>;
  }
  