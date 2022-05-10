import React, {useEffect, useState} from 'react';
import {Coins} from "@terra-money/terra.js";
import {useConnectedWallet, useLCDClient} from '@terra-money/wallet-provider';

import WalletHoldings from "./WalletHoldings";

const WalletHoldingsWidget = () => {
    const connectedWallet = useConnectedWallet();
    const lcd = useLCDClient();
    const [bank, setBank] = useState<Coins | null>(null);
    useEffect(() => {
        if (connectedWallet) {
            lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                setBank(coins);
            });
        } else {
            setBank(null);
        }
    }, [connectedWallet, lcd]);
    return (
        <>
            <WalletHoldings bank={bank}/>
        </>
    )
}

export default WalletHoldingsWidget;
