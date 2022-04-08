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
        buyTokens={this.buyTokens}
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
     />
     }else{
        content=<SellForm/>
     }
    return (
      <div className="p-9 box-content max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md mx-auto">
         
         {content}

      </div>
      
    );
  }
}
export default Main;
