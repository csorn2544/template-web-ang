import { Component, OnInit } from '@angular/core';
import { FetchFilterSearchModel } from '../models/common/fetch-filter-search-response';
import { PdpaPrivacyModel } from '../models/pdpa-privacy/pdpa-privacy';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PdpaPrivacyService } from '../services/pdpa-privacy/pdpa-privacy.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FetchPdpaPrivacyListModel } from '../models/pdpa-privacy/featch-pdpa-privacy-list/featch-pdpa-privacy-list-response';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmDiallogComponent, ConfirmDialogType } from '../shared/confirm-diallog/confirm-diallog.component';
import { FeatchPdpaPrivacyListRequest } from '../models/pdpa-privacy/featch-pdpa-privacy-list/featch-pdpa-privacy-list-request';
import { FetchFilterSearchRequest } from '../models/common/fetch-filter-search-request';

@Component({
  selector: 'app-pdpa-privacy',
  templateUrl: './pdpa-privacy.component.html',
  styleUrls: ['./pdpa-privacy.component.css']
})
export class PdpaPrivacyComponent implements OnInit  {
    pageTitle: string = 'PDPA Privacy Management';
    isModified: boolean = false;
    selectedFilterOption: string;
    typeName: string;
    typeEvent: string;
    filterOptions: FetchFilterSearchModel[];
    pdpaPrivacyList: PdpaPrivacyModel[];
    dataSource: MatTableDataSource<PdpaPrivacyModel>;
    modifiedFilterValue: string;
    displayedColumns: string[] = [
      'id',
      'ppCode',
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
  
    pdpaPrivacyForm = new FormGroup({
      filterKey: new FormControl({ value: 0, disabled: false }),
      filterValue: new FormControl({ value: "", disabled: false }),
    });
  
    constructor(
      private router: Router,
      private pdpaPrivacyService: PdpaPrivacyService,
      private datePipe: DatePipe,
      private dialog: MatDialog
    ) {}
  
    ngOnInit(): void {
      this.fetchFilterSearch();
    }
    fetchPdpaPrivacyList(
      pageIndex: number,
      pageSize: number,
      filterType: number,
      filterValue: string
    ) {
      const request: FeatchPdpaPrivacyListRequest = {
        pageNumber: pageIndex + 1,
        pageSize: pageSize,
        filterType: filterType,
        filterValue: filterValue,
      };
      console.log(request)
      this.pdpaPrivacyService.getAllPdpaPrivacy(request).subscribe({
        next: (response) => {
          this.pdpaPrivacyList = this.mapModelResponse(response.data);
          this.totalItem = response.totalItems;
          this.dataSource = new MatTableDataSource(this.pdpaPrivacyList);
        },
      });
    }
  
    fetchFilterSearch() {
      const request: FetchFilterSearchRequest = {
        typeGroup: 'pdpa-privacy',
      };
      this.selectedFilterOption = "0";
      this.fetchPdpaPrivacyList(
        this.pageIndex,
        this.pageSize,
        Number(this.selectedFilterOption),
        ''
      );
    }
    
    mapModelResponse(itemList: FetchPdpaPrivacyListModel[]): PdpaPrivacyModel[] {
      const PdpaPrivacyDataList: PdpaPrivacyModel[] = [];
      itemList.forEach((item) => {
        const PdpaPrivacyDataItem: PdpaPrivacyModel = {
          id: item.id,
          ppCode: item.ppCode,
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
        PdpaPrivacyDataList.push(PdpaPrivacyDataItem);
      });
      return PdpaPrivacyDataList;
    }
  
    getPaginatorData(event: PageEvent) {
      this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.dataSource = new MatTableDataSource();
        this.fetchPdpaPrivacyList(
          this.pageIndex,
          this.pageSize,
          Number(this.selectedFilterOption),
          this.isModified ? this.modifiedFilterValue : this.pdpaPrivacyForm.controls.filterValue.value
        );
      }
  
    modifyFilterValues(): any {
      const filterValueControl = this.pdpaPrivacyForm.get("filterValue");
      return this.datePipe.transform(filterValueControl.value, 'dd/MM/yyyy') || ''
    }
  
    onChangeFilterKey() {
      const selectingFilterOption = this.filterOptions.find(option => option.typeValue === this.selectedFilterOption);
      this.typeName = selectingFilterOption.typeName;
      this.typeEvent = selectingFilterOption.typeEvent;
      this.pdpaPrivacyForm.get('filterValue').setValue("");
      if (this.typeName === "All") {
        this.pdpaPrivacyForm.get('filterValue').clearValidators();
        this.pdpaPrivacyForm.get('filterValue').disable();
        this.fetchPdpaPrivacyList(
          this.pageIndex,
          this.pageSize,
          Number(this.selectedFilterOption),
          this.pdpaPrivacyForm.controls.filterValue.value
        );
      } else {
        this.pdpaPrivacyForm.get('filterValue').enable();
        this.pdpaPrivacyForm.get('filterValue').setValidators(Validators.required);
      }
  
      this.pdpaPrivacyForm.get('filterValue').updateValueAndValidity();
    }
  
  
    onClickCreateButton() {
      this.router.navigate(['pdpa-privacy', 'new']);
    }
  
    onEditRowClick(row: any) {
      this.router.navigate(['pdpa-privacy', row.id , JSON.stringify(row)]);
    }
  
    onDeleteRowClick(row: FetchPdpaPrivacyListModel) {
      const dialogRef = this.dialog.open(ConfirmDiallogComponent, {
        width: '400px'
      });
      dialogRef.componentInstance.confirmDialogType = ConfirmDialogType.delete;
      dialogRef.componentInstance.title = "Delete PDPA-Privacy?";
      dialogRef.componentInstance.description = "You will not be able to recover it.";
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result == ConfirmDialogResult.primaryButtonClick) {
      //     const request: DeletePdpaPrivacyRequest = {
      //       id: row.id
      //     }
      //     this.pdpaPrivacyService.deletePdpaPrivacy(request).subscribe({
      //       next: (response) => {
      //         this.fetchPdpaPrivacyList(
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
