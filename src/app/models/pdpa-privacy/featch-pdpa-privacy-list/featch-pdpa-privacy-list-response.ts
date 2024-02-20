export interface FeatchPdpaPrivacyListResponse {
    itemCount?: number;
    pageNumber?: number;
    pageSize?: number;
    totalItems?: number;
    status?: string;
    serviceName?: string;
    message?: string;
    data?: FetchPdpaPrivacyListModel[];
}

export interface FetchPdpaPrivacyListModel {
    id?: number;
    ppCode?: string;
    status?: number;
    version?: string;
    titleTh?: string;
    titleEn?: string;
    titleZh?: string;
    descriptionTh?: string;
    descriptionEn?: string;
    descriptionZh?: string;
    creatorUserId?: number;
    creationTime?: string;
    lastModifierUserId?: number;
    lastModificationTime?: string;
    deleterUserId?: number;
    deletionTime?: string;
    isDeleted?: number;
}
