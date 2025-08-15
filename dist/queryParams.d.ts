export declare function getQueryParam(key: string): string | null;
export declare function useQueryParams(): {
    queryParams: URLSearchParams;
    getParam: (key: string) => string | null;
    hasParam: (key: string, value?: string) => boolean;
    setParam: (key: string, value: string) => void;
    removeParam: (key: string) => void;
};
//# sourceMappingURL=queryParams.d.ts.map