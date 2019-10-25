import React, { Component } from 'react';
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';

// insert contract ABI here
import TrstToken from './TrstToken.json'

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadTokenContract()
    await this.getBalance()
  }

  // Connect with MetaMask
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadTokenContract() {
    const web3 = window.web3
    
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Load contract
    const networkId = await web3.eth.net.getId()
    const networkData = TrstToken.networks[networkId]
    if(networkData) {
      const tokenContract = new web3.eth.Contract(TrstToken.abi, networkData.address)
      this.setState({ tokenContract })
    } else {
      window.alert('TrstToken contract not deployed to detected network.')
    }
  }

  async getBalance() {
    const balance = await this.state.tokenContract.methods.balanceOf(this.state.account).call()
    this.setState({ balance })
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
            { this.state.balance
              ? "Sampeyan punya " + this.state.balance / 1000 + " Trst Token"
              : "Tunggu Bentar"
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
