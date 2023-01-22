const Deposit = require("./entities/Deposit")
const Account = require("./entities/Account")
const User = require("./entities/User")
const Loan = require("./entities/Loan")
const Transfer = require("./entities/Transfer")

class App {
  static #userList = []

  static newUser(name,newEmail,password){
    if (App.#userList.find(({email}) => email === newEmail)){
      console.log("Email já cadastrado")
    } else {
      App.#userList.push(new User(name,newEmail,password))
    }
  }

  get userList(){
    return App.#userList
  }

  static userFind(emailToFind){
    return App.#userList.find(({email}) => email === emailToFind) || "Não encontrado"
  }

  static accountCheck(clientEmail,password) {
    let client = App.#userList.find(({email}) => email === clientEmail)
    if (client.password === password) {
      return client
    } else {
      console.log("Senha incorreta.")
    }
  }

  static newDeposit(clientEmail,password,value){
    let client = App.accountCheck(clientEmail,password)
    if (client) {
      client.account.newDeposit(value)
    }
  }

  static newTransfer(email,password,targetClientEmail,value){
    let user = App.accountCheck(email,password)
    let target = App.userFind(targetClientEmail)
    user.account.sendTransfer(target.account,value)
  }

  newInterest(value){
    Loan.interest = value 
  }
}

let app = new App()
// console.log(app)
App.newUser("Matt", "m@gmail.com", "1234")
App.newUser("Matta", "msdsd@gmail.com", "1234")
// console.log(app.userList)
App.newUser("Matasdasdat", "msss@gmail.com", "1234")
// console.log(App.userFind("m@gmail.com"))

console.log(`balance = ` + App.userFind("msss@gmail.com").account.balance)
App.newDeposit("msss@gmail.com","1234",300000)
console.log(App.userFind("msss@gmail.com","1234").account)

App.newTransfer("msss@gmail.com","1234","m@gmail.com",499)
console.log(`balance = ` + App.userFind("msss@gmail.com").account.balance)
App.newDeposit("m@gmail.com","1234",300)
console.log(App.userFind("m@gmail.com").account)
console.log(`balance = ` + App.userFind("m@gmail.com").account.balance)