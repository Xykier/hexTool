import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Honeycomb from 'honeycomb-grid';
import { HexNotesComponent } from './components/hex-notes/hex-notes.component';
import fontJSON from '../fonts/gi.json';
import { HexService } from './services/hex.service';
import { getDefaultHex, IHex } from './hex.interface';
import { BehaviorSubject, combineLatest, fromEvent, Observable, of, Subject } from 'rxjs';
import { MapService } from './services/map.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { IMap } from './map.interface';


@Component({
  selector: 'ht-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit, AfterViewInit {
  width = 57;
  height = 22;
  hexes!: Array<any>;
  hexPoints = '';
  @ViewChild('HexGrid') hexGrid!: ElementRef;
  @ViewChild('Image') imageEl!: ElementRef;
  bg = '';
  hexData: any = {};
  gameFont = fontJSON;
  allSubscriptions = [];
  getHexes$!: Observable<any>;
  isHighlightToggle!: boolean;
  selectedHex: any = null;
  hexMap!: IMap;
  hexMap$ = new Subject<IMap>();

  constructor(public dialog: MatDialog, private hexService: HexService, private mapService: MapService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter(p => p.mapName),
      map(params => params.mapName),
      switchMap(name => this.mapService.getMap(name)),
      tap(m => this.hexMap = m),
      tap(m => this.hexMap$.next(m))
    ).subscribe();
    // this.bg = '../assets/bg.jpg';
    // this.getHexes$ = this.hexService.getAllHexes();
  }

  ngAfterViewInit(): void {
    const sub = this.hexMap$.pipe(
      filter(x => (!!x && !!this.imageEl)),
      switchMap(() => fromEvent(this.imageEl.nativeElement, 'load')),
      // switchMap(m =>
      //   combineLatest([
      //     of(m),
      //     fromEvent(this.imageEl.nativeElement, 'load')])),
      map(() => {
        // this.hexMap.hexes = this.hexMap;
        this.getGrid();
        sub.unsubscribe();
      })
    ).subscribe();
  }

  getGrid(): void {
    console.log(this.hexMap.hexes);
    const hexSize = this.imageEl.nativeElement.height / this.height / 1.5;
    const Hex = Honeycomb.extendHex({ size: hexSize });
    const grid = Honeycomb.defineGrid(Hex);
    const corners = Hex().corners();

    this.hexPoints = corners.map(({x, y}) => `${x},${y}`).join(',');

    this.hexes = grid.rectangle({ width: this.width, height: this.height }).map(hex => {
      return {
        ...hex,
        offsetX: hexSize * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2 * hex.r)),
        offsetY: hexSize * 3 / 2 * hex.r
      };
    });
  }

  openDialog(hex: any): void {
    const hexKey = `${hex.x},${hex.y}`;
    const hexData = this.hexMap.hexes[hexKey] || getDefaultHex();

    const dialogRef = this.dialog.open(HexNotesComponent, { data: hexData });
    dialogRef.afterClosed().subscribe(results => {
      this.selectedHex = null;

      if (results.isCancel) { return; }

      if (results.isDelete) {
        this.mapService.deleteHex(this.hexMap.name, hex.x, hex.y).subscribe();
        delete this.hexMap.hexes[hexKey];
        return;
      }

      this.mapService.saveHex(this.hexMap.name, hex.x, hex.y, results.data).subscribe();
      this.hexMap.hexes[hexKey] = results.data;
    });
  }

  hexClick(hex: any): void {
    this.selectedHex = hex;
    this.openDialog(hex);
  }
}
