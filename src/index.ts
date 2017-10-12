#!/usr/bin/env node

import * as bitcore from "bitcore";
import { Insight } from "bitcore-explorers";

const encodedXPub = "";

interface Address {
    index: number;
    address: string;
    balance?: number;
}

class Wallet {

    private pubKey;

    /**
     * Create a wallet with an encoded xpub
     * @param xpub
     */
    constructor(xpub: string) {
        this.pubKey = bitcore.HDPublicKey(xpub);
    }

    /**
     * Get addresses at index
     * @param index
     */
    public getAddresses(index: number): Address[] {
        return [
            this.derive(0, index),
            this.derive(1, index)
        ];
    }

    private derive(parent: number, index: number): Address {
        let pub = this.pubKey.derive(parent).derive(index).toObject().publicKey;
        let pk = new bitcore.PublicKey(pub);

        let address = pk.toAddress("livenet");

        return {
            address: address.toString(),
            index
        };
    }
}

const wallet = new Wallet(encodedXPub);

// Collect all addresses from this xpub
let addresses: Address[] = [];
for (let index = 0; index < 200; index++) {
    for (let address of wallet.getAddresses(index)) {
        addresses.push(address);
    }
}

// String array with all the bitcoin addresses
let rawAddresses: string[] = [];
for (let address of addresses) {
    rawAddresses.push(address.address);
}

new Insight().getUnspentUtxos(rawAddresses, (err, utxos) => {
    if (err) {
        throw err;
    }

    for (let utxo of utxos) {
        utxo = utxo.toObject();

        for (let address of addresses) {
            if (utxo.address === address.address) {
                console.log(address.index, address.address, utxo.amount);
            }
        }
    }
});
