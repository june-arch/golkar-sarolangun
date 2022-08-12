export default class BadRequestError {
  message: any;
  data: any;
  code: any;
  constructor(param = 'BadRequestError') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}
