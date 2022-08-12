export default class ConflictError {
  message: any;
  data: any;
  code: any;
  constructor(param = 'Conflict') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}
