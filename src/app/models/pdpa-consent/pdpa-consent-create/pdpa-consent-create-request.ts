export interface PdpaConsentCreateRequest {
    conCode: string;
    status: number;
    version: string;
    titleTh: string;
    titleEn: string;
    titleZh: string;
    descriptionTh: string;
    descriptionEn: string;
    descriptionZh: string;
    creatorUserId: number;
    isDeleted: number;
}
