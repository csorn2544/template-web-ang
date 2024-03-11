import { Component, NgModule, OnInit } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ActivatedRoute,Router} from '@angular/router';
import { Location } from '@angular/common';
import { PdpaPrivacyService } from '../services/pdpa-privacy/pdpa-privacy.service';
import { FetchPdpaPrivacyListModel } from '../models/pdpa-privacy/featch-pdpa-privacy-list/featch-pdpa-privacy-list-response';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { PdpaPrivacyUpdateRequest } from '../models/pdpa-privacy/pdpa-privacy-update/pdpa-privacy-update-request';
import { PdpaPrivacyCreateRequest } from '../models/pdpa-privacy/pdpa-privacy-create/pdpa-privacy-create-request';



@Component({
  selector: 'app-pdpa-privacy-detail',
  templateUrl: './pdpa-privacy-detail.component.html',
  styleUrls: ['./pdpa-privacy-detail.component.css']
})
export class PdpaPrivacyDetailComponent {
  isLoading: boolean = false;
  pageTitle: string = "Edit PDPA Privacy Policy";
  pageState: PageState = PageState.new;
  isSubmitButtonEnable: boolean = true;
  delayButton: number = 2000;
  submitTitle: string = "Submit";
  status!: string;
  formattedDescription: string;
  formattedDescriptionTh: string;
  formattedDescriptionEn: string;
  formattedDescriptionZh: string;
  pdpaPrivacyForm = new FormGroup({
    id : new FormControl({ value: 0,  disabled: false  }, Validators.required),
    ppCode: new FormControl({ value: '',  disabled: false  }, Validators.required),
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
    private pdpaPrivacyService: PdpaPrivacyService,
    private fb: FormBuilder,
  ) { }

  navigateToDetail(rowData: FetchPdpaPrivacyListModel) {
    const encodedData = encodeURIComponent(JSON.stringify(rowData));
    this.router.navigate(['pdpa-privacy', 'edit', encodedData]);
  }

  ngOnInit(): void {
    this.setUp();
  };
  

  setUp() {
    const stateParam = this.route.snapshot.params['state'];
    if (stateParam == 'new') {
      this.pageState = PageState.new
      this.submitTitle = "Submit"

      this.pdpaPrivacyForm = new FormGroup({
        id : new FormControl({ value: 0, disabled: true }, Validators.required),
        ppCode: new FormControl({ value: '', disabled: false }, Validators.required),
        status: new FormControl({ value: 1, disabled: false }, Validators.required),
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
      console.log(this.pageState)
      this.pageTitle = "Edit PDPA Privacy Policy"
      const rowData: FetchPdpaPrivacyListModel = JSON.parse(this.route.snapshot.params['rowData']);
      this.pdpaPrivacyForm = new FormGroup({
        id: new FormControl({ value: rowData.id, disabled: false }, Validators.required),
        ppCode: new FormControl({ value: rowData.ppCode, disabled: false }, Validators.required),
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
    console.log(this.pdpaPrivacyForm.value);
  }

  createPdpaPrivacy() {
    if (this.pdpaPrivacyForm.valid) {
      this.showLoading();
      const request: PdpaPrivacyCreateRequest = {
        ppCode: this.pdpaPrivacyForm.value.ppCode ?? '',
        status: this.pdpaPrivacyForm.value.status,
        version: this.pdpaPrivacyForm.value.version ?? '',
        titleTh: this.pdpaPrivacyForm.value.titleTh ?? '',
        titleEn: this.pdpaPrivacyForm.value.titleEn ?? '',
        titleZh: this.pdpaPrivacyForm.value.titleZh ?? '',
        descriptionTh: this.pdpaPrivacyForm.value.descriptionTh ?? '',
        descriptionEn: this.pdpaPrivacyForm.value.descriptionEn ?? '',
        descriptionZh: this.pdpaPrivacyForm.value.descriptionZh ?? '',
        isDeleted: 0,
        creatorUserId: 0
      }
      this.pdpaPrivacyService.CreatePdpaPrivacy(request).subscribe({
        next: (response) => {
          console.log('CreatePdpaPrivacy Response:', response);
          this.hideLoading();
          this.navigateBack();
        },
        error: (error) => {
          console.error('Error creating PDPA Privacy:', error);
          this.hideLoading();
        },
      });
    }
  }

  PdpaPrivacyUpdate() {
    if (this.pdpaPrivacyForm.valid) {
      const rowData: FetchPdpaPrivacyListModel = JSON.parse(this.route.snapshot.params['rowData']);
      const request: PdpaPrivacyUpdateRequest = {
        id: rowData.id,
        ppCode: rowData.ppCode,
        status: rowData.status,
        version: this.pdpaPrivacyForm.value.version ?? '',
        titleTh: this.pdpaPrivacyForm.value.titleTh ?? '',
        titleEn: this.pdpaPrivacyForm.value.titleEn ?? '',
        titleZh: this.pdpaPrivacyForm.value.titleZh ?? '',
        descriptionTh: this.pdpaPrivacyForm.value.descriptionTh ?? '',
        descriptionEn: this.pdpaPrivacyForm.value.descriptionEn ?? '',
        descriptionZh: this.pdpaPrivacyForm.value.descriptionZh ?? '',
        lastModifierUserId: 0
      };
      this.pdpaPrivacyService.updatePdpaPrivacy(request).subscribe({
        next: (response) => {
          console.log('UpdatePdpaPrivacy Response:', response);
          this.hideLoading();
          this.navigateBack();
        },
        error: (error) => {
          console.error('Error updating PDPA Privacy:', error);
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
    let formattedText = this.pdpaPrivacyForm.get(formControlName).value;
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
        this.createPdpaPrivacy();
      } else {
        this.PdpaPrivacyUpdate();
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