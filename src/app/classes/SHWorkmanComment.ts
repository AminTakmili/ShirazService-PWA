export class SHWorkmanComment {
	private _comment: string;
	public get comment(): string {
		return this._comment;
	}
	public set comment(value: string) {
		this._comment = value;
	}
	private _id: number;
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
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
	private _personId: number;
	public get personId(): number {
		return this._personId;
	}
	public set personId(value: number) {
		this._personId = value;
	}
	private _personName: string;
	public get personName(): string {
		return this._personName;
	}
	public set personName(value: string) {
		this._personName = value;
	}
	private _point: number;
	public get point(): number {
		return this._point;
	}
	public set point(value: number) {
		this._point = value;
	}
	private _serviceTitle: string;
	public get serviceTitle(): string {
		return this._serviceTitle;
	}
	public set serviceTitle(value: string) {
		this._serviceTitle = value;
	}
}
