export { UserInfo };

class UserInfo {
  constructor({ name, info }) {
    this._name = name;
    this._info = info;
  }

  getUserInfo() {
    this._data = {
      name: this._name.textContent,
      info: this._info.textContent,
    };
    return this._data;
  }

  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}
