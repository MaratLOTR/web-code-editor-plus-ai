declare const Sk: {
  configure: (options: { 
    output: (text: string) => void,
    read?: (name: string) => string,
    __future__?: any,
  }) => void;
  importMainWithBody: (
    name: string,
    isAsync: boolean,
    body: string,
    canSuspend: boolean
  ) => Promise<void>;
  misceval: {
    asyncToPromise: <T>(fn: () => T) => Promise<T>;
  };
  Terminal: any;
  pre: string;
  builtinFiles: any;
};