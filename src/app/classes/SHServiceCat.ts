export class SHServiceCat {
	private _catId: number;
	public get catId(): number {
		return this._catId;
	}
	public set catId(value: number) {
		this._catId = value;
	}
	private _catImgAddress: string;
	public get catImgAddress(): string {
		return this._catImgAddress;
	}
	public set catImgAddress(value: string) {
		this._catImgAddress = (value === '') ? 'assets/icon/favicon.png' : value;
	}
	private _catTitle: string;
	public get catTitle(): string {
		return this._catTitle;
	}
	public set catTitle(value: string) {
		this._catTitle = value;
	}
	private _subCatCount: number;
	public get subCatCount(): number {
		return this._subCatCount;
	}
	public set subCatCount(value: number) {
		this._subCatCount = value;
	}
	private _subCatId: number;
	public get subCatId(): number {
		return this._subCatId;
	}
	public set subCatId(value: number) {
		this._subCatId = value;
	}
	private _subCatImgAddress: string;
	public get subCatImgAddress(): string {
		return this._subCatImgAddress;
	}
	public set subCatImgAddress(value: string) {
		this._subCatImgAddress = (value === '') ? 'assets/icon/favicon.png' : value;
	}
	private _subCatTitle: string;
	public get subCatTitle(): string {
		return this._subCatTitle;
	}
	public set subCatTitle(value: string) {
		this._subCatTitle = value;
	}
}
