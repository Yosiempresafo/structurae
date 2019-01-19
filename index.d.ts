// Type definitions for structurae
// Project: structurae
// Definitions by: Maga D. Zandaqo <denelxan@gmail.com> (http://maga.name)

type Collection = any[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array |
    Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

type CollectionConstructor = ArrayConstructor | Int8ArrayConstructor | Uint8ArrayConstructor
    | Uint8ClampedArrayConstructor | Int16Array | Uint16ArrayConstructor | Int32ArrayConstructor
    | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;

interface GridOptions {
    rows: number;
    columns: number;
    pad?: any;
}

interface Coordinates {
    row: number;
    column: number;
}

declare class Grid {
    columns: number;
    rows: number;
    offset: number;
    pad: any;
    lastCoordinates: Coordinates;

    constructor(options?: GridOptions, data?: Collection);
    get(row: number, column: number): any;
    set(row: number, column: number, value: any): this;
    getCoordinates(index: number): Coordinates;
    toArrays(withPadding?: boolean): any[][];
    static getOffset(columns: number): number;
    static fromArrays(arrays: any[][], pad: any): Grid;
}

interface Constructor<T> {
    new (...args): T;
}

export declare function GridMixin<T extends Collection>(Base?: Constructor<T>): Constructor<T & Grid>

type AnyNumber = number | bigint;
type FieldName = number | string;
type Matcher = [AnyNumber, AnyNumber];

interface UnpackedInt {
    [propName: string]: number;
}

interface Field {
    name: FieldName;
    size?: number;
}

interface Masks {
    [propName: string]: AnyNumber;
}

export class PackedInt {
    value: AnyNumber;
    constructor(data?: AnyNumber|number[]);
    get(field: FieldName): number;
    set(field: FieldName, value: number);
    has(...fields: FieldName[]): boolean;
    match(matcher: Matcher|UnpackedInt): boolean;
    toValue(): AnyNumber;
    toObject(): UnpackedInt;
    static initialize(): void;
    static encode(data: (AnyNumber)[]): AnyNumber;
    static decode(data: AnyNumber): UnpackedInt;
    static isValid(data: number[]|UnpackedInt): boolean;
    static getMinSize(number: number): number;
    static getMatcher(matcher: UnpackedInt): Matcher;
    static fields: (Field|FieldName)[];
    static size: number;
    static masks: Masks;
    static offsets: Masks;
    static isInitialized: boolean;
    static isBigInt: boolean;
    static isSafe: boolean;
    static zero: 0 | 0n;
    static one: 1 | 1n;
    static two: 2 | 2n;
    static mask: AnyNumber;
}

type CompareResult = 1 | -1 | 0;

interface Comparator {
    (a: any, b: any): CompareResult
}

declare class SortedCollection {
    compare(a: any, b: any): CompareResult;
    isSorted(): boolean;
    isUnique(): boolean;
    range(start: number, end: number, subarray?: boolean): SortedCollection;
    rank(element: any): number;
    static getDifference<T extends Collection>(a: Collection, b: Collection, symmetric?: boolean, comparator?: Comparator, container?: T): T;
    static getDifferenceScore(a: Collection, b: Collection, symmetric?: boolean, comparator?: Comparator): number;
    static getIndex(arr: Collection, target: any, comparator?: Comparator, rank?: boolean, start?: number, end?: number): number;
    static getIntersection<T extends Collection>(a: Collection, b: Collection, comparator?: Comparator, container?: T): T;
    static getIntersectionScore(a: Collection, b: Collection, comparator?: Comparator): number;
    static getRange<T extends Collection>(arr: T, start?: number, end?: number, comparator?: Comparator, subarray?: boolean): T;
    static getUnion<T extends Collection>(a: Collection, b: Collection, unique?: boolean, comparator?: Comparator, container?: T): T;
    static getUnique<T extends Collection>(arr: Collection, comparator?: Comparator, container?: T): T;
    static isSorted(arr: Collection, comparator?: Comparator): boolean;
    static isUnique(arr: Collection, comparator?: Comparator): boolean;
}

export declare function SortedMixin<T extends Collection>(Base?: Constructor<T>): Constructor<T & SortedCollection>

export class SortedArray extends SortedMixin(Array) {
    unique: boolean;
    set(arr: Collection): this;
    uniquify(): this;
}
