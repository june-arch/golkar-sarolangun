
export default class InternalServerError {
  message: any;
  data: any;
  code: any;
  constructor(param = 'Internal Server Error') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}
