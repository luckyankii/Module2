import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/SmartWallet.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [showContractAddress, setShowContractAddress] = useState(false);

  const [buyNFT, setbuyNFT] = useState("");

  const contractAddress = "0x2B2812a2639f0B27C1a2968eAae8eaF3B4bFB536";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window?.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet?.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts?.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet?.request({
      method: "eth_requestAccounts",
    });
    handleAccount(accounts);

    // once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const BuyNFT = async () => {
    if (atm) {
      let tx = await atm.BuyNFT(1);
      await tx.wait();
      getBalance();
    }
  };

  const toggleContractAddress = () => {
    setShowContractAddress(
      (prevShowContractAddress) => !prevShowContractAddress
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (atm) {
      getBalance();
    }
  }, [atm]);

  return (
    <main className="Avax_container">
      <header>
        <h1>ETH Intermediate Module 2 </h1>
      </header>
      <div className="Avax_content">
        {!account ? (
          <button onClick={connectAccount}>
            Click Here to connect MetaMask
          </button>
        ) : (
          <>
            <p>Your Account Details: {account}</p>
            <div className="Avax_button">
              <button onClick={toggleContractAddress}>
                {showContractAddress
                  ? "Hide Contract Address"
                  : "Show Contract Address"}
              </button>
              {showContractAddress && (
                <div>
                  <p>Contract Address -: {contractAddress}</p>
                </div>
              )}
              <button onClick={deposit}>Deposit TestNet ETH from here </button>
              <button onClick={withdraw}>Withdraw TestNet ETH from here</button>
              <button onClick={BuyNFT}>Buy NFT .</button>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        html,
        body {
          margin: 0;
          padding: 0;
          font-family: "Arial", sans-serif;
          height: 100%;

          background: linear-gradient(45deg, #3498db, #2ecc71);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .Avax_container {
          text-align: center;
          padding: 40px;
          position: relative;
          background-color: #fff;
          background: linear-gradient(99deg, #9121db, #9ecc99);
          border-radius: 16px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          min-height: 100vh; /* Cover entire screen height */
          overflow: hidden; /* Hide overflowing pseudo-elements */
        }

        header {
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #3498db;
        }

        h1 {
          font-size: 32px;
          color: #333;
          margin: 0;
        }

        .Avax_content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .account-text {
          margin-bottom: 15px;
          padding: 15px;
          font-size: 16px;
          background: linear-gradient(45deg, #3498db, #2ecc71);
          color: #fff;
          border-radius: 8px;
          border: 2px solid #2980b9;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .account-text:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }

        .account-text p {
          margin: 0;
        }

        .Avax_button {
          margin-top: 20px;
        }

        button {
          display: block;
          margin-bottom: 15px;
          position: relative;
          padding: 15px 30px;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          background: linear-gradient(45deg, #3498db, #2ecc71);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.3s ease, transform 0.3s ease;
          outline: none; /* Remove button outline on focus */
        }

        button:hover {
          background: linear-gradient(45deg, #2980b9, #27ae60);
          transform: scale(1.05);
        }

        button::before,
        button::after {
          avax_content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          z-index: -1;
          transition: transform 0.5s ease;
        }

        button::before {
          top: 0;
          left: 0;
          transform: translate(-150%, -150%);
        }

        button::after {
          bottom: 0;
          right: 0;
          transform: translate(150%, 150%);
        }

        button:hover::before,
        button:hover::after {
          transform: translate(0, 0);
        }
      `}</style>
    </main>
  );
}
