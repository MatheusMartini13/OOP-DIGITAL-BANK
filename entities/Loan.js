const Installments = require("./Installments")

module.exports = class Loan {
  static #interest = 0.015
  constructor(value, installments, client){
    this.client = client
    this.value = value
    this.installmentsQuantity = installments
    this.installments = []
    this.creationDate = new Date()
    this.initialTotalDebt = ((1 + Loan.#interest)**(this.installmentsQuantity)) * this.value
    this.installmentValue = this.initialTotalDebt / installments
    this.#createInstallments()
  }

  static get interest(){
    return this.#interest
  }

  static set interest(percentage){
    this.#interest = percentage/100
  }

  #createInstallments(){
    for (let index = 0; index < this.installmentsQuantity; index++) {
      this.installments.push(new Installments(this.installmentValue,index+1))      
    }
  }
}