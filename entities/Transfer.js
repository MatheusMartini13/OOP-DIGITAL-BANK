module.exports = class Transfer {
  constructor(sender, receiver, value){
    this.value = value
    this.receiver = receiver
    this.sender = sender
    this.date = new Date()
  }
}