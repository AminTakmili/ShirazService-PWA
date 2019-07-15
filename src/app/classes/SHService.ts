export class SHService {
	private _catId: number;
	public get catId(): number {
		return this._catId;
	}
	public set catId(value: number) {
		this._catId = value;
	}
	private _catTitle: string;
	public get catTitle(): string {
		return this._catTitle;
	}
	public set catTitle(value: string) {
		this._catTitle = value;
	}
	private _subCatId: number;
	public get subCatId(): number {
		return this._subCatId;
	}
	public set subCatId(value: number) {
		this._subCatId = value;
	}
	private _subCatTitle: string;
	public get subCatTitle(): string {
		return this._subCatTitle;
	}
	public set subCatTitle(value: string) {
		this._subCatTitle = value;
	}
	private _serviceId: number;
	public get serviceId(): number {
		return this._serviceId;
	}
	public set serviceId(value: number) {
		this._serviceId = value;
	}
	private _serviceTitle: string;
	public get serviceTitle(): string {
		return this._serviceTitle;
	}
	public set serviceTitle(value: string) {
		this._serviceTitle = value;
	}
	private _basePrice: string;
	public get basePrice(): string {
		return this._basePrice;
	}
	public set basePrice(value: string) {
		this._basePrice = value;
	}
	private _picAddress: string;
	public get picAddress(): string {
		return this._picAddress;
	}
	public set picAddress(value: string) {
		this._picAddress = (value === '') ? 'assets/icon/favicon.png' : value;
	}
	private _servicesCount: number;
	public get servicesCount(): number {
		return this._servicesCount;
	}
	public set servicesCount(value: number) {
		this._servicesCount = value;
	}
	private _body: string;
	public get body(): string {
		return this._body;
	}
	public set body(value: string) {
		this._body = value;
	}
	private _extraTitle1: string;
	public get extraTitle1(): string {
		return this._extraTitle1;
	}
	public set extraTitle1(value: string) {
		this._extraTitle1 = value;
	}
	private _extraField1: string;
	public get extraField1(): string {
		return this._extraField1;
	}
	public set extraField1(value: string) {
		this._extraField1 = value;
	}
	private _extraTitle2: string;
	public get extraTitle2(): string {
		return this._extraTitle2;
	}
	public set extraTitle2(value: string) {
		this._extraTitle2 = value;
	}
	private _extraField2: string;
	public get extraField2(): string {
		return this._extraField2;
	}
	public set extraField2(value: string) {
		this._extraField2 = value;
	}
	private _tagId: number;
	public get tagId(): number {
		return this._tagId;
	}
	public set tagId(value: number) {
		this._tagId = value;
	}
	private _tagTitle: string;
	public get tagTitle(): string {
		return this._tagTitle;
	}
	public set tagTitle(value: string) {
		this._tagTitle = value;
	}
	private _insrtTime: number;
	public get insrtTime(): number {
		return this._insrtTime;
	}
	public set insrtTime(value: number) {
		this._insrtTime = value;
	}
	private _insrtTimePersian: string;
	public get insrtTimePersian(): string {
		return this._insrtTimePersian;
	}
	public set insrtTimePersian(value: string) {
		this._insrtTimePersian = value;
	}
}
