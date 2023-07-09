
export class NodeCompileError extends Error {
    constructor(public message: string) {
        super(message);
        this.name = "NodeCompileError";
    }
}