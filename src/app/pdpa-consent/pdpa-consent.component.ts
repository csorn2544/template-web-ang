import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

// Model
import { FetchPdpaConsentListRequest } from '../models/pdpa-consent/fetch-pdpa-consent-list/fetch-pdpa-consent-list-request';
import { FetchFilterSearchRequest } from '../models/common/fetch-filter-search-request';
import { FetchFilterSearchModel } from '../models/common/fetch-filter-search-response';
import { FetchPdpaConsentListModel } from '../models/pdpa-consent/fetch-pdpa-consent-list/fetch-pdpa-consent-list-response';
import { PdpaConsentModel } from '../models/pdpa-consent/pdpa-consent';

//Service
import { PdpaConsentService } from '../services/pdpa-consent/pdpa-consent.service';
import {
  ConfirmDiallogComponent,
  ConfirmDialogType,
} from '../shared/confirm-diallog/confirm-diallog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pdpa-consent',
  templateUrl: './pdpa-consent.component.html',
  styleUrls: ['./pdpa-consent.component.css'],
})
export class PdpaConsentComponent implements OnInit {
  pageTitle: string = 'PDPA Consent Management';
  isModified: boolean = false;
  selectedFilterOption: string;
  typeName: string;
  typeEvent: string;
  filterOptions: FetchFilterSearchModel[];
  pdpaConsentList: PdpaConsentModel[];
  dataSource: MatTableDataSource<PdpaConsentModel>;
  modifiedFilterValue: string;
  displayedColumns: string[] = [
    'id',
    'conCode',
    'status',
    'version',
    'titleTh',
    'titleEn',
    'titleZh',
    'descriptionTh',
    'descriptionEn',
    'descriptionZh',
    'creationTime',
    'lastModificationTime',
    'action',
  ];
  totalItem: number = 0;
  pageIndex = 0;
  pageSize = 10;

  pdpaConsentForm = new FormGroup({
    filterKey: new FormControl({ value: 0, disabled: false }),
    filterValue: new FormControl({ value: '', disabled: false }),
  });

  constructor(
    private router: Router,
    private pdpaConsentService: PdpaConsentService,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchFilterSearch();
  }
  fetchPdpaConsentList(
    pageIndex: number,
    pageSize: number,
    filterType: number,
    filterValue: string
  ) {
    const request: FetchPdpaConsentListRequest = {
      pageNumber: pageIndex + 1,
      pageSize: pageSize,
      filterType: filterType,
      filterValue: filterValue,
    };
    console.log(request);
    this.pdpaConsentService.getAllPdpaConsent(request).subscribe({
      next: (response) => {
        this.pdpaConsentList = this.mapModelResponse(response.data);
        this.totalItem = response.totalItems;
        this.dataSource = new MatTableDataSource(this.pdpaConsentList);
      },
    });
  }

  fetchFilterSearch() {
    const request: FetchFilterSearchRequest = {
      typeGroup: 'pdpa-consent',
    };
    this.selectedFilterOption = '0';
    this.fetchPdpaConsentList(
      this.pageIndex,
      this.pageSize,
      Number(this.selectedFilterOption),
      ''
    );
  }

  mapModelResponse(itemList: FetchPdpaConsentListModel[]): PdpaConsentModel[] {
    const PdpaConsentDataList: PdpaConsentModel[] = [];
    itemList.forEach((item) => {
      const PdpaConsentDataItem: PdpaConsentModel = {
        id: item.id,
        conCode: item.conCode,
        status: item.status,
        version: item.version,
        titleTh: item.titleTh,
        titleEn: item.titleEn,
        titleZh: item.titleZh,
        descriptionTh: item.descriptionTh,
        descriptionEn: item.descriptionEn,
        descriptionZh: item.descriptionZh,
        creatorUserId: item.creatorUserId,
        creationTime: item.creationTime,
        lastModifierUserId: item.lastModifierUserId,
        lastModificationTime: item.lastModificationTime,
        isDeleted: item.isDeleted,
      };
      PdpaConsentDataList.push(PdpaConsentDataItem);
    });
    return PdpaConsentDataList;
  }
  
  getPaginatorData(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchPdpaConsentList(
      this.pageIndex,
      this.pageSize,
      Number(this.selectedFilterOption),
      this.isModified
        ? this.modifiedFilterValue
        : this.pdpaConsentForm.controls.filterValue.value
    );
  }

  modifyFilterValues(): any {
    const filterValueControl = this.pdpaConsentForm.get('filterValue');
    return (
      this.datePipe.transform(filterValueControl.value, 'dd/MM/yyyy') || ''
    );
  }

  onChangeFilterKey() {
    const selectingFilterOption = this.filterOptions.find(
      (option) => option.typeValue === this.selectedFilterOption
    );
    this.typeName = selectingFilterOption.typeName;
    this.typeEvent = selectingFilterOption.typeEvent;
    this.pdpaConsentForm.get('filterValue').setValue('');
    if (this.typeName === 'All') {
      this.pdpaConsentForm.get('filterValue').clearValidators();
      this.pdpaConsentForm.get('filterValue').disable();
      this.fetchPdpaConsentList(
        this.pageIndex,
        this.pageSize,
        Number(this.selectedFilterOption),
        this.pdpaConsentForm.controls.filterValue.value
      );
    } else {
      this.pdpaConsentForm.get('filterValue').enable();
      this.pdpaConsentForm
        .get('filterValue')
        .setValidators(Validators.required);
    }

    this.pdpaConsentForm.get('filterValue').updateValueAndValidity();
  }

  onClickCreateButton() {
    this.router.navigate(['pdpa-consent', 'new']);
  }

  onEditRowClick(row: any) {
    this.router.navigate(['pdpa-consent', row.id, JSON.stringify(row)]);
  }

  onDeleteRowClick(row: FetchPdpaConsentListModel) {
    const dialogRef = this.dialog.open(ConfirmDiallogComponent, {
      width: '400px',
    });
    dialogRef.componentInstance.confirmDialogType = ConfirmDialogType.delete;
    dialogRef.componentInstance.title = 'Delete PDPA-Consent?';
    dialogRef.componentInstance.description =
      'You will not be able to recover it.';
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == ConfirmDialogResult.primaryButtonClick) {
    //     const request: DeletePdpaConsentRequest = {
    //       id: row.id
    //     }
    //     this.pdpaConsentService.deletePdpaConsent(request).subscribe({
    //       next: (response) => {
    //         this.fetchPdpaConsentList(
    //           this.pageIndex,
    //           this.pageSize,
    //           Number(this.selectedFilterOption),
    //           ""
    //         );
    //       }, error: (error) => {
    //         console.log(error);
    //       }
    //     });
    //   }
    // });
  }
}
