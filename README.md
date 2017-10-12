# blockchain-sweep

[![NPM Version](http://img.shields.io/npm/v/blockchain-sweep.svg?style=flat)](https://www.npmjs.org/package/blockchain-sweep)
[![NPM Downloads](https://img.shields.io/npm/dm/blockchain-sweep.svg?style=flat)](https://www.npmjs.org/package/blockchain-sweep)

Since the [Blockchain Receive Payments API](https://blockchain.info/api/api_receive) follows the BIP44 standard, which means that 20 addresses generated through that service with no payments received will block continued usage of the service, and you will have a really hard time recovering these funds.

The Blockchain support is really helpful with assisting users to recover their stuck funds, but they refuse to release their scripts that scans your xPub and finds the indexes of the stuck addresses.

[Blockchain supplied recovery manual](https://docs.google.com/document/d/1-2l6xOqcbjs9QWEqSh72RD1d8EEdvG_hQuEXw_f_o6w/edit)

## Installation

```bash
$ sudo npm install -g blockchain-sweep
```

## Usage

```
Options:

    -p, --pubkey [value]    Encoded Public key
    -r, --range <a>..<b>    Index range to check (default 0..100)
```

```bash
$ sweep -p xpub6AHA9hZDN11...
1950 '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX' 0.0531
# this indicates that we have one address with funds at index 1950
```



Login to your wallet, open the dev-tools (F12 in most common browsers) and run the following command

```javascript
Blockchain.MyWallet.wallet._getPrivateKey(0, "M/0/1950");
```

This function will return the private key of the Bitcoin address at the specified index. Go to Settings > Addresses > Import Bitcoin Address in your Blockchain wallet, and it's back.

For more information about how this function can be used, check the recovery manual above.