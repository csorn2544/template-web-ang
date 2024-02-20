export interface FetchPdpaConsentListResponse {
    itemCount?: number;
    pageNumber?: number;
    pageSize?: number;
    totalItems?: number;
    status?: string;
    serviceName?: string;
    message?: string;
    data?: FetchPdpaConsentListModel[];
  }
  
export interface FetchPdpaConsentListModel {
    id?: number;
    conCode?: string;
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
  