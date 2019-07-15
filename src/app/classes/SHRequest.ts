export class SHRequest {
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
	private _workmanId: number;
	public get workmanId(): number {
		return this._workmanId;
	}
	public set workmanId(value: number) {
		this._workmanId = value;
	}
	private _workmanName: string;
	public get workmanName(): string {
		return this._workmanName;
	}
	public set workmanName(value: string) {
		this._workmanName = value;
	}
	private _workmanMobile: string;
	public get workmanMobile(): string {
		return this._workmanMobile;
	}
	public set workmanMobile(value: string) {
		this._workmanMobile = value;
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
		this._serviceTitle = (value === '') ? 'بدون عنوان' : value;
	}
	private _servicePicAddress: string;
	public get servicePicAddress(): string {
		return this._servicePicAddress;
	}
	public set servicePicAddress(value: string) {
		this._servicePicAddress = (value === '') ? 'assets/icon/favicon.png' : value;
	}
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
	private _areaId: number;
	public get areaId(): number {
		return this._areaId;
	}
	public set areaId(value: number) {
		this._areaId = value;
	}
	private _areaTitle: string;
	public get areaTitle(): string {
		return this._areaTitle;
	}
	public set areaTitle(value: string) {
		this._areaTitle = value;
	}
	private _lastName: string;
	public get lastName(): string {
		return this._lastName;
	}
	public set lastName(value: string) {
		this._lastName = value;
	}
	private _firstName: string;
	public get firstName(): string {
		return this._firstName;
	}
	public set firstName(value: string) {
		this._firstName = value;
	}
	private _mobile: string;
	public get mobile(): string {
		return this._mobile;
	}
	public set mobile(value: string) {
		this._mobile = value;
	}
	private _phone: string;
	public get phone(): string {
		return this._phone;
	}
	public set phone(value: string) {
		this._phone = value;
	}
	private _address: string;
	public get address(): string {
		return this._address;
	}
	public set address(value: string) {
		this._address = value;
	}
	private _longtiude: string;
	public get longtiude(): string {
		return this._longtiude;
	}
	public set longtiude(value: string) {
		this._longtiude = value;
	}
	private _latitiude: string;
	public get latitiude(): string {
		return this._latitiude;
	}
	public set latitiude(value: string) {
		this._latitiude = value;
	}
	private _desc: string;
	public get desc(): string {
		return this._desc;
	}
	public set desc(value: string) {
		this._desc = value;
	}
	private _dateFrom: number;
	public get dateFrom(): number {
		return this._dateFrom;
	}
	public set dateFrom(value: number) {
		this._dateFrom = value;
	}
	private _dateFromPersian: string;
	public get dateFromPersian(): string {
		return this._dateFromPersian;
	}
	public set dateFromPersian(value: string) {
		this._dateFromPersian = value;
	}
	private _dateFromYear: string;
	public get dateFromYear(): string {
		return this._dateFromYear;
	}
	public set dateFromYear(value: string) {
		this._dateFromYear = value;
	}
	private _dateFromMonth: string;
	public get dateFromMonth(): string {
		return this._dateFromMonth;
	}
	public set dateFromMonth(value: string) {
		this._dateFromMonth = value;
	}
	private _dateFromDay: string;
	public get dateFromDay(): string {
		return this._dateFromDay;
	}
	public set dateFromDay(value: string) {
		this._dateFromDay = value;
	}
	private _dateTo: number;
	public get dateTo(): number {
		return this._dateTo;
	}
	public set dateTo(value: number) {
		this._dateTo = value;
	}
	private _dateToPersian: string;
	public get dateToPersian(): string {
		return this._dateToPersian;
	}
	public set dateToPersian(value: string) {
		this._dateToPersian = value;
	}
	private _time: number;
	public get time(): number {
		return this._time;
	}
	public set time(value: number) {
		this._time = value;
	}
	private _timeDesc: string;
	public get timeDesc(): string {
		return this._timeDesc;
	}
	public set timeDesc(value: string) {
		this._timeDesc = value;
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
	private _insrtTimeSimple: string;
	public get insrtTimeSimple(): string {
		return this._insrtTimeSimple;
	}
	public set insrtTimeSimple(value: string) {
		this._insrtTimeSimple = value;
	}
	private _updteTime: number;
	public get updteTime(): number {
		return this._updteTime;
	}
	public set updteTime(value: number) {
		this._updteTime = value;
	}
	private _updteTimePersian: string;
	public get updteTimePersian(): string {
		return this._updteTimePersian;
	}
	public set updteTimePersian(value: string) {
		this._updteTimePersian = value;
	}
	private _trackingCode: string;
	public get trackingCode(): string {
		return this._trackingCode;
	}
	public set trackingCode(value: string) {
		this._trackingCode = value;
	}
	private _state: number;
	public get state(): number {
		return this._state;
	}
	public set state(value: number) {
		this._state = value;
	}
	private _stateTitle: string;
	public get stateTitle(): string {
		return this._stateTitle;
	}
	public set stateTitle(value: string) {
		this._stateTitle = value;
	}
	private _priority: number;
	public get priority(): number {
		return this._priority;
	}
	public set priority(value: number) {
		this._priority = value;
	}
	private _priorityTitle: string;
	public get priorityTitle(): string {
		return this._priorityTitle;
	}
	public set priorityTitle(value: string) {
		this._priorityTitle = value;
	}
	private _calculatedPrice: number;
	public get calculatedPrice(): number {
		return this._calculatedPrice;
	}
	public set calculatedPrice(value: number) {
		this._calculatedPrice = value;
	}
	private _finishByWorkman: number;
	public get finishByWorkman(): number {
		return this._finishByWorkman;
	}
	public set finishByWorkman(value: number) {
		this._finishByWorkman = value;
	}
	private _finishTime: number;
	public get finishTime(): number {
		return this._finishTime;
	}
	public set finishTime(value: number) {
		this._finishTime = value;
	}
	private _visitCount: string;
	public get visitCount(): string {
		return this._visitCount;
	}
	public set visitCount(value: string) {
		this._visitCount = value;
	}
	private _workmanCount: string;
	public get workmanCount(): string {
		return this._workmanCount;
	}
	public set workmanCount(value: string) {
		this._workmanCount = value;
	}
	private _discountCode: string;
	public get discountCode(): string {
		return this._discountCode;
	}
	public set discountCode(value: string) {
		this._discountCode = value;
	}
	private _discountDesc: string;
	public get discountDesc(): string {
		return this._discountDesc;
	}
	public set discountDesc(value: string) {
		this._discountDesc = value;
	}
	private _discardOrExpirePersonType: number;
	public get discardOrExpirePersonType(): number {
		return this._discardOrExpirePersonType;
	}
	public set discardOrExpirePersonType(value: number) {
		this._discardOrExpirePersonType = value;
	}
	private _discardOrExpirePersonId: number;
	public get discardOrExpirePersonId(): number {
		return this._discardOrExpirePersonId;
	}
	public set discardOrExpirePersonId(value: number) {
		this._discardOrExpirePersonId = value;
	}
	private _discardOrExpireDesc: string;
	public get discardOrExpireDesc(): string {
		return this._discardOrExpireDesc;
	}
	public set discardOrExpireDesc(value: string) {
		this._discardOrExpireDesc = value;
	}
	private _lastStateBeforeDiscardOrExpire: number;
	public get lastStateBeforeDiscardOrExpire(): number {
		return this._lastStateBeforeDiscardOrExpire;
	}
	public set lastStateBeforeDiscardOrExpire(value: number) {
		this._lastStateBeforeDiscardOrExpire = value;
	}
	private _reqId: number;
	public get reqId(): number {
		return this._reqId;
	}
	public set reqId(value: number) {
		this._reqId = value;
	}
	private _rate: number;
	public get rate(): number {
		return this._rate;
	}
	public set rate(value: number) {
		this._rate = value;
	}
	private _discardReason: string;
	public get discardReason(): string {
		return this._discardReason;
	}
	public set discardReason(value: string) {
		this._discardReason = value;
	}
	private _personComment: string;
	public get personComment(): string {
		return this._personComment;
	}
	public set personComment(value: string) {
		this._personComment = value;
	}
}
