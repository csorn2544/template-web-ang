export interface PdpaConsentModel {
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
  creatorUserId: number;
  creationTime: string;
  lastModifierUserId: number;
  lastModificationTime: string;
  isDeleted: number;
}
