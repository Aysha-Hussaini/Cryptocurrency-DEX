import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor} from '@fortawesome/free-solid-svg-icons';
import "./App.css"

import Identicon from "identicon.js"

class Navbar extends Component {
  render(){
    return (
      <div className="p-6 justify-center shadow-xl">
        <nav className=" fixed-top flex">
          <div className="container mx-auto flex">
            <a href="https://github.com/Aysha-Hussaini/Cryptocurrency-DEX.git" className="flex items-start">
              <FontAwesomeIcon icon={faMeteor} size="lg"  />
            </a>
            <a href="https://github.com/Aysha-Hussaini/Cryptocurrency-DEX.git" className="flex items-start">
                <span className="self-center text-lg font-semibold whitespace-nowrap text-purple-900 ">EthSwap Decentralized Exchange</span>
            </a>
          </div>
          <ul className="navbar-nav px-3">
             <li className="nav-item flex">
               <small id = "account" className=" flex items-end text-purple-900">
                     {this.props.account}
               </small>    
               {this.props.account
               ?<img
                  className="ml-2"
                  width ='25'
                  height='25'
                  src= {`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                  alt=""/>
               : <span></span>
            }         
            </li>  
         </ul>  
        </nav>
      </div>
    );
  }
}
export default Navbar;
