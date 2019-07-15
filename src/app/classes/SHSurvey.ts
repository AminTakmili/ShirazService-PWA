export class SHSurvey {
	private _id: number;
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}
	private _title: string;
	public get title(): string {
		return this._title;
	}
	public set title(value: string) {
		this._title = value;
	}
}
