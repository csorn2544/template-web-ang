export interface PdpaPrivacyDeleteResponse {
    itemCount?: number;
    pageNumber?: number;
    pageSize?: number;
    totalItems?: number;
    status?: string;
    serviceName?: string;
    message?: string;
    data?: PdpaPrivacyModel[];
}
export interface PdpaPrivacyModel{
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
    creatorUserId?: any;
    creationTime?: string;
    lastModifierUserId?: any;
    lastModificationTime?: string;
    deleterUserId?: any;
    deletionTime?: string;
    isDeleted?: number;
}

