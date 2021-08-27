export class DirectiveWraper {
  func;

  parameters: any;

  constructor(func) {
    this.func = func;
  }

  set(_p) {
    this.parameters = { ...this.parameters, ..._p };
  }

  _r() {
    return this.parameters === undefined
      ? this.func()
      : this.func(this.parameters);
  }
}
