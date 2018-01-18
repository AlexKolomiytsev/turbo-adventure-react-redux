declare const __isDEBUG__: string;
declare const __API__: string;
declare const module: { hot: { accept: Function } };
declare var require: {
    (path: string): any;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
