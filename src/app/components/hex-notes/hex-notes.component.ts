import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';
import { HexService } from 'src/app/services/hex.service';
import fontJSON from '../../../fonts/gi.json';

@Component({
  selector: 'ht-hex-notes',
  templateUrl: './hex-notes.component.html',
  styleUrls: ['./hex-notes.component.scss']
})
export class HexNotesComponent implements OnInit {
  allIcons: Array<any> = [];
  iconOptions: Array<any> = [];
  allSubscriptions: Array<Subscription> = [];
  iconSearchControl = new FormControl();
  filteredOptions!: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<HexNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public hex: any,
    private hexService: HexService
  ) { }

  ngOnInit(): void {
    console.log(this.hex);
    this.iconOptions = [];
    const currIcon = this.hex.icon;
    this.iconSearchControl.setValue(currIcon.name);
    console.log(currIcon);

    this.filteredOptions = this.iconSearchControl.valueChanges.pipe(
      startWith(''),
      filter(x => x),
      debounceTime(250),
      map(iconName => this.filterIcons(iconName))
    );

    const keyDownSub = this.dialogRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') {
        this.onCancel();
      }
    });

    const bgClickSub = this.dialogRef.backdropClick().subscribe(e => {
        this.onCancel();
    });

    this.allSubscriptions.push(keyDownSub, bgClickSub);
  }

  selectName(event): void {
    this.hex.icon.name = event.option.value;
  }

  filterIcons(name): Array<any> {
    return this.hexService.allIcons.filter((x: { name: string; value: string; }) => x.name.indexOf(name) >= 0);
  }

  onCancel(): void {
    this.dialogRef.close({ isCancel: true, data: this.hex });
  }

  onSave(): void {
    this.dialogRef.close({ data: this.hex });
  }

  deleteHex(): void {
    this.dialogRef.close({ isDelete: true });
  }
}
