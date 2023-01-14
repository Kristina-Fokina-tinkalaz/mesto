export { UserInfo };

class UserInfo {
  constructor(data) {
    this._data = data;
    this._name = data.name;
    this._info = data.info;
  }

  getUserInfo() {
    return this._data;
  }

  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}
