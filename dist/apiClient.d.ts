import { SequenceAPIClient } from "@0xsequence/anypay-api";
export type APIClientConfig = {
    apiUrl?: string;
    projectAccessKey?: string;
    jwt?: string;
};
export declare function getAPIClient({ apiUrl, projectAccessKey, jwt, }: APIClientConfig): SequenceAPIClient;
export declare const useAPIClient: (config?: APIClientConfig) => SequenceAPIClient;
//# sourceMappingURL=apiClient.d.ts.map