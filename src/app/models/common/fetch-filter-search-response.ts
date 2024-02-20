export interface FetchFilterSearchResponse {
    itemCount?: number;
    serviceName?: string;
    data?: [FetchFilterSearchModel];
}

export interface FetchFilterSearchModel {
    typeName?: string
    typeValue?: string
    typeEvent?: string
}
