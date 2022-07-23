
export default class NotFoundError {
  message: any;
  data: any;
  code: any;
  constructor(param = 'Not Found') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}
