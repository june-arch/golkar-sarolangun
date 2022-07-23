
export default class ExpectationFailedError {
  message: any;
  data: any;
  code: any;
  constructor(param = 'Expectation Failed') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}
