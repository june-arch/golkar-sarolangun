export default class Unauthorized {
  message: any;
  data: any;
  code: any;
  constructor(param = 'Unauthorized') {
    this.message = param['message'] || param;
    this.data = param['data'];
    this.code = param['code'];
  }
}
