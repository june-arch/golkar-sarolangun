export default class UnauthorizedError {
  message: any;
  data: any;
  code: any;
  constructor(param = 'Unauthorized') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}