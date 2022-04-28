import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import abi from "./abi.json";

function App() {
  // usetstate for storing and retrieving wallet details
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };

  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });

    // Setting a balance
    getbalance(account);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
    // const signer = await provider.getSigner();
    // const erc20 = new ethers.Contract(
    //   "0x448ee326eafD27939699d0a312f22f805f9c66aB",
    //   abi,
    //   signer
    // );
    // console.log(erc20.buy())

    // const res = await erc20.buy('0.1');
    // console.log(res);
// Connect to the network
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner();

// The address from the above deployment example
let contractAddress = "0x448ee326eafD27939699d0a312f22f805f9c66aB";

// We connect to the Contract using a Provider, so we will only
// have read-only access to the Contract
let contract = new ethers.Contract(contractAddress, abi, signer);
console.log(contract)

await contract.buy({value: 1})

  };

  return (
    <div className="App">
      <Card className="text-center">
        <Card.Header>
          <strong>Address: </strong>
          {data.address}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Balance: </strong>
            {data.Balance}
          </Card.Text>
          <Button onClick={btnhandler} variant="primary">
            Connect to wallet
          </Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="text-xl font-semibold text-gray-700 text-center">
          Write to contract
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleTransfer}>
            <Button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              BUY 1 TOCKEN
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
