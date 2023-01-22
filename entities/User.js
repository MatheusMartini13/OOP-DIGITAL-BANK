const Account = require("./Account")

module.exports = class User {
  constructor(name,email,password){
    this.name = name
    this.email = email
    this.account = new Account(this)
    this.password = password
  }
}