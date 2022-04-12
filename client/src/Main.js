import React, { Component } from "react";
import "./App.css";
import BuyForm from "./BuyForm";
import SellForm from './SellForm'

class Main extends Component {
   constructor(props){
      super(props);
      this.state={
         currentForm: 'buy'
      }
   }
   state = {output: '0'};
  render(){
     let content;
     if(this.state.currentForm === 'buy'){
        content= <BuyForm
        web3={this.props.web3}
        buyTokens={this.props.buyTokens}
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
     />
     }else{
        content=<SellForm
         web3={this.props.web3}
         sellTokens={this.props.sellTokens}
         ethBalance={this.props.ethBalance}
         tokenBalance={this.props.tokenBalance}
      />
     }
    return (
       
      <div className="p-9 box-content max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md mx-auto">
         <div className="flex justify-between">
            <button type="button" 
               onClick={(event)=> {this.setState({currentForm:'buy'})}} 
               className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ">
                  Buy Tokens
            </button>
            <h3>  &lt; &gt; </h3>
            <button type="button" 
               onClick={(event)=> {this.setState({currentForm:'sell'})}} 
               className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ">
                  Sell Tokens
            </button>
         </div>
         {content}

      </div>
      
    );
  }
}
export default Main;
