declare namespace Skulpt {
  interface ConfigOptions {
    output: (text: string) => void;
    read?: (name: string) => string;
    __future__?: any;
    inputfun?: (prompt?: string) => string;
    inputfunTakesPrompt?: boolean;
  }

  interface Misceval {
    asyncToPromise<T>(fn: () => T): Promise<T>;
  }

  interface SkulptAPI {
    configure(options: ConfigOptions): void;
    importMainWithBody(
      name: string,
      isAsync: boolean,
      body: string,
      canSuspend: boolean
    ): Promise<void>;
    misceval: Misceval;
    builtinFiles: {
      files: Record<string, string>;
    };
    python3: boolean;
  }
}

declare var Sk: Skulpt.SkulptAPI;