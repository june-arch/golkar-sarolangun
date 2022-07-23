
export default class ForbiddenError {
  message: any;
  data: any;
  code: any;
  constructor(param = 'Forbidden') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}
