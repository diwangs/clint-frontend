import React, { Component } from 'react';
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';

// insert contract ABI here
import TrstToken from './TrstToken.json'
import Vault from './Vault.json'
import Staking from './Staking.json'

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3()
    await Promise.all([
      this.loadContract(TrstToken),
      this.loadContract(Vault),
      this.loadContract(Staking)
    ])
    await this.testFunc()
  }

  // Connect with MetaMask
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    // Load account
    if (window.web3) {
      const accounts = await window.web3.eth.getAccounts()
      // window.web3.eth.defaultAccount = accounts[0] is defaultAccount deprecated?
      // https://ethereum.stackexchange.com/questions/38365/web3-eth-defaultaccount-not-working
      this.setState({ account: accounts[0] })
    }
  }

  async loadContract(contractDefinition) {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = contractDefinition.networks[networkId]
    if (networkData) {
      const contractHandle = new web3.eth.Contract(contractDefinition.abi, networkData.address)
      var newState = {}
      newState[contractDefinition.contractName] = contractHandle
      this.setState(newState)
    } else {
      window.alert(contractDefinition.contractName + ' contract not deployed to detected network.')
    }
  }

  async testFunc() {
    const balance = await this.state.TrstToken.methods.balance(this.state.account).call()
    this.setState({ balance })
    await this.state.Vault.methods
      .proposeLoan(1000000000, 1000000)
      .send({from: this.state.account}) 
      // due too error in defaultAccount, account must be added as argument everytime
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.balance
              ? "Balance: " + this.state.balance / 1000 + " Trst Token"
              : "Retrieving..."
            }
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
