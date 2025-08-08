export * from "./api.gen.js";
import { API as ApiRpc } from "./api.gen.js";
export declare class SequenceAPIClient extends ApiRpc {
    projectAccessKey?: string | undefined;
    jwtAuth?: string | undefined;
    constructor(hostname: string, projectAccessKey?: string | undefined, jwtAuth?: string | undefined);
    _fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}
//# sourceMappingURL=index.d.ts.map