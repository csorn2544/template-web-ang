export interface PdpaConsentUpdateRequest {
    id: number;
    conCode: string;
    status: number;
    version: string;
    titleTh: string;
    titleEn: string;
    titleZh: string;
    descriptionTh: string;
    descriptionEn: string;
    descriptionZh: string;
    lastModifierUserId: number;
}
