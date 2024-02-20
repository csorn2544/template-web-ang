import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-diallog',
  templateUrl: './confirm-diallog.component.html',
  styleUrls: ['./confirm-diallog.component.css']
})
export class ConfirmDiallogComponent implements OnInit {

  @Input() confirmDialogType: ConfirmDialogType;
  @Input() title: string;
  @Input() description: string;
  icon: string;
  iconColor: string;
  iconSize: string;
  iconPaddingLeft: string;
  primaryButtonTitle: string;
  secondaryButtoonTitle: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDiallogComponent>,
  ) { }

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    switch (this.confirmDialogType) {
      case ConfirmDialogType.delete:
        this.icon = 'error_outlined';
        this.iconColor = '#f8b63a';
        this.iconSize = '5.0em';
        this.iconPaddingLeft = '4px';
        this.primaryButtonTitle = 'Delete';
        this.secondaryButtoonTitle = 'Cancel';
        break;
    }
  }

  onConfirmButtonClick() {
    this.dialogRef.close(ConfirmDialogResult.primaryButtonClick);
  }

  onCancelButtonClick() {
    this.dialogRef.close(ConfirmDialogResult.secondaryButtonClick);
  }
}

export enum ConfirmDialogType {
  delete = 'delete'
}

export enum ConfirmDialogResult {
  primaryButtonClick = 'primaryButtonClick',
  secondaryButtonClick = 'secondaryButtonClick'
}