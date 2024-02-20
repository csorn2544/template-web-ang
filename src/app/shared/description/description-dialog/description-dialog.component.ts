import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.css']
})
export class DescriptionDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { description: string, columnTitle: string  }
  ) { }

  ngOnInit(): void {
  }

}
