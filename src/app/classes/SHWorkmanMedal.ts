export class SHWorkmanMedal {
	private _body: string;
	public get body(): string {
		return this._body;
	}
	public set body(value: string) {
		this._body = value;
	}
	private _id: number;
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}
	private _imgAddress: string;
	public get imgAddress(): string {
		return this._imgAddress;
	}
	public set imgAddress(value: string) {
		this._imgAddress = value;
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
	private _title: string;
	public get title(): string {
		return this._title;
	}
	public set title(value: string) {
		this._title = value;
	}
}
