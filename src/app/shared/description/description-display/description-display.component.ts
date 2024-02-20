import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';

@Component({
  selector: 'app-description-display',
  templateUrl: './description-display.component.html',
  styleUrls: ['./description-display.component.css']
})
export class DescriptionDisplayComponent implements OnInit {
  @Input() description: string = '';
  @Input() maxLength: number = 50;
  @Input() columnTitle: string = '';
  showFull: boolean = false;
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  toggleShowFull(): void {
      const dialogRef = this.dialog.open(DescriptionDialogComponent, {
        data: {
          description: this.description,
          columnTitle: this.columnTitle,
        },
      });
  }

}
