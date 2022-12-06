// * 请求响应参数(不包含data)
export interface Result {
	reqId: string
	code: string | number;
	timestamp: number
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

