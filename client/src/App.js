import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import Navbar from  "./Navbar";
import Main from "./Main";
import EthSwap from "./contracts/EthSwap.json";
import Token from "./contracts/Token.json";

import "./App.css";

class App extends Component {

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const ethBalance = await web3.eth.getBalance(account);

      this.setState({web3, account, ethBalance});

      //Get the Token contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetworkToken = Token.networks[networkId];
      if (deployedNetworkToken) {
        const token = new web3.eth.Contract(
          Token.abi,
          deployedNetworkToken && deployedNetworkToken.address,
        );
        
        const tokenBalance = await token.methods.balanceOf(this.state.account).call();

        this.setState ({token, tokenBalance: tokenBalance.toString()});
      } else {
        window.alert("The contract hasn't been deployed on detected network");
      }
      
      //Get the EthSwap contract instance.
      const deployedNetworkEthSwap = EthSwap.networks[networkId];

      if(deployedNetworkEthSwap){
        const ethSwap = new web3.eth.Contract(
          EthSwap.abi,
          deployedNetworkEthSwap && deployedNetworkEthSwap.address,
        );
        
        this.setState ({ethSwap});
        
      } else {
        window.alert("The contract hasn't been deployed on detected network");
      }
      this.setState({loading: false});

      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  constructor(props){
    super(props)
    this.state = { 
      web3: null, 
      account: null, 
      ethBalance: null, 
      token: null, 
      tokenBalance: null, 
      ethSwap: null,
      loading : true, 
    };
  }
  
  buyTokens = (etherAmount) => {
    this.setState({loading: true});
    this.state.ethSwap.methods.buyTokens().send({from: this.state.account, value: etherAmount}).on('transactionHash', (hash) => {
      this.setState({loading:false});
    });
  }

  sellTokens = (tokenAmount) => {
    this.setState({loading: true});
    this.state.ethSwap.methods.sellTokens(tokenAmount).send({from: this.state.account}).on('transactionHash', (hash) =>{
      this.setState({loading: false});
    });
  }


  render(){
    let content;
    if(this.state.loading){
      content = <p className="loading text-base text-center font-semibold"> Loading.... </p>
    } else {
      content = <Main 
      web3={this.state.web3}
      buyTokens={this.buyTokens}
      ethBalance={this.state.ethBalance}
      tokenBalance={this.state.tokenBalance}
      
      />
    }
    return (
      <div>
        < Navbar account = {this.state.account}/>
        <div className="container-fluid mt-5">
          <div >
            <main role="main"  >
            {content}
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
