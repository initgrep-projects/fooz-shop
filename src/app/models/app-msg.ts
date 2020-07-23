export enum AppMsgType {
    WARNING, FAILURE, SUCCESS
}

export class AppMsg {
    constructor(
        private type: AppMsgType,
        private message: string,
        private details: string
    ) { }

    get Type() { return this.type; }
    set Type(c: AppMsgType) { this.type = c; }

    get Message() { return this.message; }
    set Message(m: string) { this.message = m; }

    get Details() { return this.details; }
    set Details(d: string) { this.details = d; }
}