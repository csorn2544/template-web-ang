
import { Component, NgModule, OnInit } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ActivatedRoute,Router} from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { PdpaConsentService } from '../services/pdpa-consent/pdpa-consent.service';
import { FetchPdpaConsentListModel } from '../models/pdpa-consent/fetch-pdpa-consent-list/fetch-pdpa-consent-list-response';
import { PdpaConsentUpdateRequest } from '../models/pdpa-consent/pdpa-consent-update/pdpa-consent-update-request';
import { PdpaConsentCreateRequest } from '../models/pdpa-consent/pdpa-consent-create/pdpa-consent-create-request';



@Component({selector: 'app-pdpa-consent-detail',
templateUrl: './pdpa-consent-detail.component.html',
styleUrls: ['./pdpa-consent-detail.component.css']
})
export class PdpaConsentDetailComponent {
  isLoading: boolean = false;
  pageTitle: string;
  pageState: PageState = PageState.new;
  isSubmitButtonEnable: boolean = true;
  delayButton: number = 2000;
  submitTitle: string = "Submit";
  status!: string;
  formattedDescription: string;
  formattedDescriptionTh: string;
  formattedDescriptionEn: string;
  formattedDescriptionZh: string;
  pdpaConsentForm = new FormGroup({
    id : new FormControl({ value: 0,  disabled: false  }, Validators.required),
    conCode: new FormControl({ value: '',  disabled: false  }, Validators.required),
    status: new FormControl({ value: 1,  disabled: false  }, Validators.required),
    version: new FormControl({ value: '',  disabled: false  }, Validators.required),
    titleTh: new FormControl({ value: '',  disabled: false  }, Validators.required),
    titleEn: new FormControl({ value: '',  disabled: false  }, Validators.required),
    titleZh: new FormControl({ value: '',  disabled: false  }, Validators.required),
    descriptionTh: new FormControl({ value: '',  disabled: false  }, Validators.required),
    descriptionEn: new FormControl({ value: '',  disabled: false  }, Validators.required),
    descriptionZh: new FormControl({ value: '',  disabled: false  }, Validators.required),
    creatorUserId: new FormControl({ value: 1,  disabled: false  }),
    lastModifierUserId: new FormControl({ value: 1,  disabled: true  }),
    isDeleted: new FormControl({ value: 0,  disabled: false  })
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private pdpaConsentService: PdpaConsentService,
    private fb: FormBuilder,
  ) { }

  navigateToDetail(rowData: FetchPdpaConsentListModel) {
    const encodedData = encodeURIComponent(JSON.stringify(rowData));
    this.router.navigate(['pdpa-consent', 'edit', encodedData]);
  }

  ngOnInit(): void {
    this.setUp();
  };
  

  setUp() {
    const stateParam = this.route.snapshot.params['state'];
    if (stateParam == 'new') {
      this.pageState = PageState.new
      this.submitTitle = "Submit"
      this.pageTitle = "Create PDPA Consent"
      this.pdpaConsentForm = new FormGroup({
        id : new FormControl({ value: 0, disabled: true }, Validators.required),
        conCode: new FormControl({ value: '', disabled: false }, Validators.required),
        status: new FormControl({ value: 1, disabled: true }),
        version: new FormControl({ value: '', disabled: false }, Validators.required),
        titleTh: new FormControl({ value: '', disabled: false }, Validators.required),
        titleEn: new FormControl({ value: '', disabled: false }, Validators.required),
        titleZh: new FormControl({ value: '', disabled: false }, Validators.required),
        descriptionTh: new FormControl({ value: '', disabled: false }, Validators.required),
        descriptionEn: new FormControl({ value: '', disabled: false }, Validators.required),
        descriptionZh: new FormControl({ value: '', disabled: false }, Validators.required),
        creatorUserId: new FormControl({ value: 1, disabled: false }, Validators.required),
        lastModifierUserId: new FormControl({ value: 1, disabled: true }),
        isDeleted: new FormControl({ value: 0, disabled: false }, Validators.required)
      });
    } else {
      this.pageState = PageState.edit
      this.pageTitle = "Edit PDPA Consent"
      const rowData: FetchPdpaConsentListModel = JSON.parse(this.route.snapshot.params['rowData']);
      this.pdpaConsentForm = new FormGroup({
        id: new FormControl({ value: rowData.id, disabled: false }, Validators.required),
        conCode: new FormControl({ value: rowData.conCode, disabled: false }, Validators.required),
        status: new FormControl({ value: rowData.status, disabled: false }, Validators.required),
        version: new FormControl({ value: rowData.version, disabled: false }, Validators.required),
        titleTh: new FormControl({ value: rowData.titleTh, disabled: false }, Validators.required),
        titleEn: new FormControl({ value: rowData.titleEn, disabled: false }, Validators.required),
        titleZh: new FormControl({ value: rowData.titleZh, disabled: false }, Validators.required),
        descriptionTh: new FormControl({ value: rowData.descriptionTh, disabled: false }, Validators.required),
        descriptionEn: new FormControl({ value: rowData.descriptionEn, disabled: false }, Validators.required),
        descriptionZh: new FormControl({ value: rowData.descriptionZh, disabled: false }, Validators.required),
        creatorUserId: new FormControl({ value: rowData.creatorUserId, disabled: false }),
        lastModifierUserId: new FormControl({ value: rowData.lastModifierUserId, disabled: false }),
        isDeleted: new FormControl({ value: rowData.isDeleted, disabled: false }, Validators.required)
      });
      this.updateFormattedDescription('descriptionTh');
      this.updateFormattedDescription('descriptionEn');
      this.updateFormattedDescription('descriptionZh');
    }
  }

  createPdpaConsent() {
    if (this.pdpaConsentForm.valid) {
      this.showLoading();
      const request: PdpaConsentCreateRequest = {
        conCode: this.pdpaConsentForm.value.conCode ?? '',
        status: this.pdpaConsentForm.value.status,
        version: this.pdpaConsentForm.value.version ?? '',
        titleTh: this.pdpaConsentForm.value.titleTh ?? '',
        titleEn: this.pdpaConsentForm.value.titleEn ?? '',
        titleZh: this.pdpaConsentForm.value.titleZh ?? '',
        descriptionTh: this.pdpaConsentForm.value.descriptionTh ?? '',
        descriptionEn: this.pdpaConsentForm.value.descriptionEn ?? '',
        descriptionZh: this.pdpaConsentForm.value.descriptionZh ?? '',
        isDeleted: 0,
        creatorUserId: 0
      }
      this.pdpaConsentService.CreatePdpaConsent(request).subscribe({
        next: (response) => {
          console.log('CreatePdpaConsent Response:', response);
          this.hideLoading();
          this.navigateBack();
        },
        error: (error) => {
          console.error('Error creating PDPA Consent:', error);
          this.hideLoading();
        },
      });
    }
  }

  PdpaConsentUpdate() {
    if (this.pdpaConsentForm.valid) {
      const rowData: FetchPdpaConsentListModel = JSON.parse(this.route.snapshot.params['rowData']);
      const request: PdpaConsentUpdateRequest = {
        id: rowData.id,
        conCode: rowData.conCode,
        status: this.pdpaConsentForm.value.status ?? 1,
        version: this.pdpaConsentForm.value.version ?? '',
        titleTh: this.pdpaConsentForm.value.titleTh ?? '',
        titleEn: this.pdpaConsentForm.value.titleEn ?? '',
        titleZh: this.pdpaConsentForm.value.titleZh ?? '',
        descriptionTh: this.pdpaConsentForm.value.descriptionTh ?? '',
        descriptionEn: this.pdpaConsentForm.value.descriptionEn ?? '',
        descriptionZh: this.pdpaConsentForm.value.descriptionZh ?? '',
        lastModifierUserId: 0
      };
      console.log(request)

      this.pdpaConsentService.updatePdpaConsent(request).subscribe({
        next: (response) => {
          console.log('UpdatePdpaConsent Response:', response);
          this.hideLoading();
          this.navigateBack();
        },
        error: (error) => {
          console.error('Error updating PDPA Consent:', error);
          this.hideLoading();
        }
      });
    }
  }

  applyTag(tag: string, formControlName: string) {
    const textarea: HTMLTextAreaElement = document.querySelector(`textarea[formControlName="${formControlName}"]`);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
  
    const tagPattern = new RegExp(`(<${tag}>)(.*?)(</${tag}>)`, 'g');
    const isTagApplied = selectedText.match(tagPattern);
  
    if (!isTagApplied) {
      textarea.value = before + `<${tag}>` + selectedText + `</${tag}>` + after;
    } else {
      textarea.value = text.replace(tagPattern, '$2');
    }

    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    textarea.dispatchEvent(event);
  
    this.formattedDescription = textarea.value;
    this.updateFormattedDescription(formControlName);
  }

  

  updateFormattedDescription(formControlName: string) {
    let formattedText = this.pdpaConsentForm.get(formControlName).value;
    if (formControlName === 'descriptionTh') {
      this.formattedDescriptionTh = formattedText;
    } else if (formControlName === 'descriptionEn') {
      this.formattedDescriptionEn = formattedText;
    } else if (formControlName === 'descriptionZh') {
      this.formattedDescriptionZh = formattedText;
    }
  }

  onSubmitClick() {
    if (this.isSubmitButtonEnable) {
      this.isSubmitButtonEnable = false;

      if (this.pageState.toLocaleLowerCase() == 'new') {
        this.createPdpaConsent();
      } else {
        this.PdpaConsentUpdate();
      }
      setTimeout(() => {
        this.isSubmitButtonEnable = true;
      }, this.delayButton);
    }
  }

  navigateBack() {
    setTimeout(() => {
      this.location.back();
    }, 600);
  }

  onCancelClick() {
    this.location.back();
  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  onNavigateBackClick() {
    this.location.back();
  }

}

enum PageState {
  new = 'new',
  edit = 'edit'
}