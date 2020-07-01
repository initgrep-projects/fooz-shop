export enum AppErrorType {
    WARNING, FAILURE
}

export class AppError {
    constructor(
        private type: AppErrorType,
        private message: string,
        private details: string
    ) { }

    get Type() { return this.type; }
    set Type(c: AppErrorType) { this.type = c; }

    get Message() { return this.message; }
    set Message(m: string) { this.message = m; }

    get Details() { return this.details; }
    set Details(d: string) { this.details = d; }
}