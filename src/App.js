import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import abi from "./abi.json";

function App() {
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  const btnhandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };

  const getbalance = (address) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  const accountChangeHandler = (account) => {
    setdata({
      address: account,
    });
    getbalance(account);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contractAddress = "0x448ee326eafD27939699d0a312f22f805f9c66aB";
    let contract = new ethers.Contract(contractAddress, abi, signer);
    await contract.buy({ value: 100 });
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
        <Card.Header>Write to contract</Card.Header>
        <Card.Body>
          <form onSubmit={handleTransfer}>
            <Button type="submit">BUY 1 TOCKEN</Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
export default App;
