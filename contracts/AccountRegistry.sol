// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/// @title 账户注册，进入卷叠
/// @notice 公用函数，只加不减，无需访问控制
/// @dev 注册时验证签名
contract AccountRegistry {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // 存储一下
    mapping(address => bool) public registeredAccounts;

    // 前端用事件
    event AccountRegistered(address account);

    function _verify(
        bytes32 data,
        bytes memory signature,
        address account
    ) internal pure returns (bool) {
        return data.toEthSignedMessageHash().recover(signature) == account;
    }

    function registerAccount(bytes calldata _signature) external {
        address _account = msg.sender;
        require(!registeredAccounts[_account], "Account already registered");

        // 验证签名
        // 与client约定的消息
        bytes32 messageHash = keccak256(
            abi.encodePacked(address(this), "registerAccount")
        );
        // 开始验证
        require(
            _verify(messageHash, _signature, _account),
            "Register signature is invalid!"
        );

        // 成功注册
        registeredAccounts[_account] = true;
        emit AccountRegistered(_account);
    }
}
