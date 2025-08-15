export * from "./api.gen.js";
import { API as ApiRpc } from "./api.gen.js";
export class SequenceAPIClient extends ApiRpc {
    projectAccessKey;
    jwtAuth;
    constructor(hostname, projectAccessKey, jwtAuth) {
        super(hostname.endsWith("/") ? hostname.slice(0, -1) : hostname, fetch);
        this.projectAccessKey = projectAccessKey;
        this.jwtAuth = jwtAuth;
        this.fetch = this._fetch;
    }
    _fetch = (input, init) => {
        // automatically include jwt and access key auth header to requests
        // if its been set on the api client
        const headers = {};
        const jwtAuth = this.jwtAuth;
        const projectAccessKey = this.projectAccessKey;
        if (jwtAuth && jwtAuth.length > 0) {
            headers.Authorization = `BEARER ${jwtAuth}`;
        }
        if (projectAccessKey && projectAccessKey.length > 0) {
            headers["X-Access-Key"] = projectAccessKey;
        }
        // before the request is made
        init.headers = { ...init.headers, ...headers };
        return fetch(input, init);
    };
}
