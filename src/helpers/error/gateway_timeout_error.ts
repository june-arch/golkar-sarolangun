export default class GatewayTimeoutError {
  message: any;
  data: any;
  code: any;
  constructor(param = 'Gateway Timeout') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}
