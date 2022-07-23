export default class ServiceUnavailableError {
  message: any;
  data: any;
  code: any;
  constructor(param = 'Service Unavailable') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}
