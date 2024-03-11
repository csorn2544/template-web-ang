
import { Component, NgModule, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { PdpaPrivacyService } from '../services/pdpa-privacy/pdpa-privacy.service'; 
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FetchFilterSearchModel } from '../models/common/fetch-filter-search-response';
import { PdpaPrivacyModel } from '../models/pdpa-privacy/pdpa-privacy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FetchPdpaPrivacyListRequest } from '../models/pdpa-privacy/fetch-pdpa-privacy-list/fetch-pdpa-privacy-list-request';
import { FetchFilterSearchRequest } from '../models/common/fetch-filter-search-request';
import { FetchPdpaPrivacyListModel } from '../models/pdpa-privacy/fetch-pdpa-privacy-list/fetch-pdpa-privacy-list-response';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from '../services/common/common.service';
import { ConfirmDiallogComponent, ConfirmDialogResult, ConfirmDialogType } from '../shared/confirm-diallog/confirm-diallog.component';
import { MatDialog } from '@angular/material/dialog';
import { PdpaPrivacyDeleteRequest } from '../models/pdpa-privacy/pdpa-privacy-delete/pdpa-privacy-delete-request';



@Component({
  selector: 'app-pdpa-privacy',
  templateUrl: './pdpa-privacy.component.html',
  styleUrls: ['./pdpa-privacy.component.css']
})


export class PdpaPrivacyComponent implements OnInit {
  pageTitle: string = 'PDPA Privacy  Management';
  isModified: boolean = false;
  selectedFilterOption: string;
  typeName: string;
  typeEvent: string;
  filterOptions: FetchFilterSearchModel[];
  pdpaPrivacyList: PdpaPrivacyModel[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
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
      private commonService: CommonService,
      private datePipe: DatePipe,   
      private dialog: MatDialog,
      ) {}

    ngOnInit() {
      this.fetchFilterSearch();
    }
    fetchPdpaPrivacyList(
      pageIndex: number,
      pageSize: number,
      filterType: number,
      filterValue: string
    ) {
      const request: FetchPdpaPrivacyListRequest = {
        pageNumber: pageIndex + 1,
        pageSize: pageSize,
        filterType: filterType,
        filterValue: filterValue,
      };
      this.pdpaPrivacyService.getAllPdpaPrivacy(request).subscribe({
        next: (response) => {
          this.pdpaPrivacyList = this.mapModelResponse(response.data);
          this.totalItem = response.totalItems;
        },
      });

        this.statuses = [
            { label: 'Inactive', value: 'inactive' },
            { label: 'Active', value: 'active' },
            
        ];
    }

    fetchFilterSearch() {
      const request: FetchFilterSearchRequest = {
        typeGroup: "pdpa-privacy",
      };
      this.commonService.fetchFilterSearch(request).subscribe({
        next: (response) => {
          this.filterOptions = response.data;
          this.selectedFilterOption = "0";
          this.fetchPdpaPrivacyList(
            this.pageIndex,
            this.pageSize,
            Number(this.selectedFilterOption),
            ""
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
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

    onClickCreateButton() {
      this.router.navigate(['pdpa-privacy', 'new']);
    }

    clear(table: Table) {
        table.clear();
    }

    getSeverity(status: string) {
        switch (status.toLowerCase()) {
            case 'Inactive':
                return 'danger';

            case 'Active':
                return 'success';

           
        };
    }

    getPaginatorData(event: PageEvent) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.fetchPdpaPrivacyList(
        this.pageIndex,
        this.pageSize,
        Number(this.selectedFilterOption),
        this.isModified
          ? this.modifiedFilterValue
          : this.pdpaPrivacyForm.controls.filterValue.value
      );
    }

    onSearchButtonClick() {
      var filterValue : any
      this.pageIndex = 0;
      if (this.typeEvent === "datepicker") {
        this.modifiedFilterValue = this.modifyFilterValues();
        filterValue =  this.modifiedFilterValue;
        this.isModified = true;
      } else {
        filterValue = this.pdpaPrivacyForm.controls.filterValue.value
        this.isModified = false;
      }
        this.fetchPdpaPrivacyList(
          this.pageIndex,
          this.pageSize,
          Number(this.selectedFilterOption),
          filterValue
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
      console.log(this.typeEvent)
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
  
    onEditRowClick(row: any) {
      this.router.navigate(['pdpa-privacy', row.id , JSON.stringify(row)]);
    }
  
    onDeleteRowClick(row: PdpaPrivacyModel) {
      const dialogRef = this.dialog.open(ConfirmDiallogComponent, {
        width: '400px'
      });
      dialogRef.componentInstance.confirmDialogType = ConfirmDialogType.delete;
      dialogRef.componentInstance.title = "Delete PDPA-Privacy?";
      dialogRef.componentInstance.description = "You will not be able to recover it.";
      dialogRef.afterClosed().subscribe(result => {
        if (result == ConfirmDialogResult.primaryButtonClick) {
          const request: PdpaPrivacyDeleteRequest = {
            id: row.id
          }
          this.pdpaPrivacyService.deletePdpaPrivacy(request).subscribe({
            next: (response) => {
              this.fetchPdpaPrivacyList(
                this.pageIndex,
                this.pageSize,
                Number(this.selectedFilterOption),
                ""
              );
            }, error: (error) => {
              console.log(error);
            }
          });
        }
      });
    }
}
