// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SecureWallet {
    address payable public walletOwner;
    uint256 public walletBalance;

    event FundsDeposited(uint256 amount);
    event FundsWithdrawn(uint256 amount);
    event NFTPurchased(uint256 _number);

    constructor(uint initialBalance) payable {
        walletOwner = payable(msg.sender);
        walletBalance = initialBalance;
    }

    function getWalletBalance() public view returns (uint256) {
        return walletBalance;
    }

    function depositFunds(uint256 _amount) public payable {
        try this.walletBalance += _amount {
            emit FundsDeposited(_amount);
        } catch {
            revert("Deposit failed");
        }
    }

    // Custom error
    error InsufficientFunds(uint256 balance, uint256 withdrawAmount);

    function withdrawFunds(uint256 _withdrawAmount) public {
        try this.walletBalance -= _withdrawAmount {
            emit FundsWithdrawn(_withdrawAmount);
        } catch InsufficientFunds(uint256 currentBalance, uint256 requestedAmount) {
            revert string(abi.encodePacked("Insufficient funds. Current balance: ", currentBalance, ", Requested amount: ", requestedAmount));
        } catch {
            revert("Withdrawal failed");
        }
    }

    function getWalletAddress() public view returns (address) {
        return address(this);
    }

    function getWalletContractBalance() public view returns (uint256) {
        try this.getWalletAddress().balance {
            // No need to catch here if it's just a view function
            return address(this).balance;
        } catch {
            revert("Failed to get wallet contract balance");
        }
    }

    function purchaseNFT(uint256 _number) public {
        try this.withdrawFunds(_number) {
            emit NFTPurchased(_number);
        } catch {
            revert("NFT purchase failed");
        }
    }
}