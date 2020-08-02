// The submition of an item might be working, need to figure out a way to
// read data from the blockchain


import React, { Component } from "react";
import StoreContract from "./contracts/Store.json";
import getWeb3 from "./getWeb3";

import StoreFront from "./storeFront.js";

import "./App.css";

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null,
      loading: true,
      itemId: "", 
      itemName: "", 
      itemValue: null,
      itemCount: 0,
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = StoreContract.networks[networkId];
      const instance = new web3.eth.Contract(
       StoreContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      //console.log(StoreContract.abi);
      
      const itemCount = await instance.methods.itemCount().call();
      this.setState({ itemCount });
  //@TODO: create off-chain database to get items that are on chain
  // might take items completely off chain so that it doesn't need to store
  // item information (doesn't really need to be stored on chain)
      // for (var i = 0; i < itemCount; i++) {
      //   const item = await instance.methods.itemsForSale[i];
      //   this.setState({
      //     items: [...this.state.items, item]
      //   })
      // }
      console.log("item count: " + itemCount);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.storeFront);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  

  storeFront = async () => {
    const { accounts, contract } = this.state;

    
    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ storageValue: response });
  };

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  addItem = async(itemId, itemName, itemValue) => {
    this.setState({loading: true});
    //const {itemId, itemName, itemValue} = item.target;
    const { accounts, contract } = this.state;
    await this.state.contract.methods.addItemsToSale(itemId, itemName, itemValue).send({ from: this.state.accounts[0] });
    this.setState({loading: false});
    console.log("item submitted");
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Store Front</h1>
        <p>This is a practice project that simulates a store's webpage.</p>
        <h2>Items for sale.</h2>
        <h2>
          <StoreFront 
            addItem={this.addItem}
            handleChange={this.handleChange} 
            data={this.state}
          />
        </h2>
        { /*<table>
             { this.items.map((item, key) => {
              return(
                <div>
                  item value: {item.value}
                  item name: {item.name}
                </div>
              )
            })}
          </table> */}
        <p>
          Account being used is: {this.state.accounts[0]}
        </p>
        <div>Item Count is: {this.state.itemCount}</div>
      </div>
    );
  }
}

export default App;
