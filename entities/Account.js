const Deposit = require("./Deposit")
const Loan = require("./Loan")
const Transfer = require("./Transfer")

module.exports = class Account {
  #balance
  constructor(user){
    this.user = user
    this.#balance = 0
    this.deposits = []
    this.receivedTransfers = []
    this.sentTransfers = []
    this.loans = []
  }

  get balance(){
    return this.#balance
  }

  newDeposit(value){
    this.#balance += value
    this.deposits.push(new Deposit(value, new Date()))
  }

  receiveTransfer(transfer){
    this.#balance += transfer.value
    this.receivedTransfers.push(transfer)
  }

  sendTransfer(receiver, value){
    if (this.#balance >= value){
      let transferData = new Transfer(this,receiver,value)
      this.sentTransfers.push(transferData)
      this.#balance -= value
      receiver.receiveTransfer(transferData)
    } else {
      console.log("Saldo insuficiente.")
    }
  }

  newLoan(value,installments){
    this.#balance += value
    this.loans.push(new Loan(value,installments,this.user))
  }

  payLoan(loan,number){
    loan.installments.forEach(element => {
      if (element.number === number && element.value > this.#balance && element.situation === "Não paga") {
        console.log('Você não tem saldo suficiente.')
      } else if (element.number === number && element.situation === "Não paga") {
        this.#balance -= element.value
        element.situation = "Paga"
      } else if (element.number === number && element.situation !== "Não paga") {
        console.log("Essa parcela já foi paga.")
      }
    })
  }
}
