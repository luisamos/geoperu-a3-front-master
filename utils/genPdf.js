/** Model definition file for the Pdf Class **/

// import store from '../store'

export default class Pdf {
  constructor (page = 'a4', margin = '0.5') {
    this.page = page
    this.margin = margin //cm,
  }
}