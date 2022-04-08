import React, { Component } from "react";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEthereum} from "@fortawesome/free-brands-svg-icons";
import { faBolt, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

class SellForm extends Component {
   constructor(props){
      super(props);
      this.state={
         output:0
      }
   }
  render(){
    return (
      <form onSubmit={(event) => {
         event.preventDefault()
         let etherAmount
         etherAmount=this.input.value.toString()
         etherAmount= this.props.web3.utils.toWei(etherAmount, 'Ether')
         this.props.buyTokens(etherAmount)
         }}>
         <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Input</label>
            <div className="relative">
               <div className="flex">
                  <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                  placeholder="Enter the amount" 
                  onChange={(event) => {
                     const etherAmount = this.input.value.toString()
                     this.setState({
                        output : etherAmount * 150
                     })
                     console.log(this.state.output)
                  }}
                  ref = {(input) => {this.input = input}}
                  required/>
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
                     <FontAwesomeIcon icon={faEthereum}/> 
                     ETH
                  </span>
               </div>
               <small className="float-right">Balance: {this.props.web3.utils.fromWei(this.props.ethBalance, 'Ether') }</small>
            </div>
         </div>
         <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Output</label>
            <div className="flex">
               <input type="text" id="disabled-input-2" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed " value={this.state.output} disabled readOnly />
               <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 ">
                  <FontAwesomeIcon icon={faBolt}  />
                  EXT
               </span>
            </div>
            <small className="float-right">Balance: {this.props.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}  </small>
         </div>
         <div className="mb-5 flex">
            <small className="text-grey float-right "><h5>&nbsp; &nbsp;Exchange Rate 1 Eth = 150 Ext</h5></small>
         </div>
         <button type="submit" className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-full font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
            Swap &nbsp;
            <FontAwesomeIcon icon={faArrowsRotate} spin/>
         </button>
      </form>
    );
  }
}
export default SellForm;
