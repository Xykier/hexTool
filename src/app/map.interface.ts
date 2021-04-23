import { IHex } from './hex.interface';

export interface IMap {
  name: string;
  bg: string;
  hexes: {
    [x: string]: IHex
  };
}
