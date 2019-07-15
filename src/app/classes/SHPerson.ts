export class SHPerson {
	private _areaId: number;
	public get areaId(): number {
		return this._areaId;
	}
	public set areaId(value: number) {
		this._areaId = (value) ? value : 0;
	}
	private _area: string;
	public get area(): string {
		return this._area;
	}
	public set area(value: string) {
		this._area = (value) ? value : '';
	}
	private _personId: number;
	public get personId(): number {
		return this._personId;
	}
	public set personId(value: number) {
		this._personId = (value) ? value : 0;
	}
	private _picAddress: string;
	public get picAddress(): string {
		return this._picAddress;
	}
	public set picAddress(value: string) {
		this._picAddress = (value) ? value : '';
	}
	private _firstName: string;
	public get firstName(): string {
		return this._firstName;
	}
	public set firstName(value: string) {
		this._firstName = (value) ? value : '';
	}
	private _lastName: string;
	public get lastName(): string {
		return this._lastName;
	}
	public set lastName(value: string) {
		this._lastName = (value) ? value : '';
	}
	private _totalPoint: number;
	public get totalPoint(): number {
		return this._totalPoint;
	}
	public set totalPoint(value: number) {
		this._totalPoint = (value) ? value : 0;
	}
	private _code: string;
	public get code(): string {
		return this._code;
	}
	public set code(value: string) {
		this._code = (value) ? value : '';
	}
	private _username: string;
	public get username(): string {
		return this._username;
	}
	public set username(value: string) {
		this._username = (value) ? value : '';
	}
	private _email: string;
	public get email(): string {
		return this._email;
	}
	public set email(value: string) {
		this._email = (value) ? value : '';
	}
	private _phone: string;
	public get phone(): string {
		return this._phone;
	}
	public set phone(value: string) {
		this._phone = (value) ? value : '';
	}
	private _address: string;
	public get address(): string {
		return this._address;
	}
	public set address(value: string) {
		this._address = (value) ? value : '';
	}
	private _accessToken: string;
	public get accessToken(): string {
		return this._accessToken;
	}
	public set accessToken(value: string) {
		this._accessToken = (value) ? value : '';
	}
}
