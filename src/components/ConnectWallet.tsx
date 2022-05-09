import React, {useEffect, useState} from 'react';
import {Coins, Coin} from "@terra-money/terra.js";
import {useConnectedWallet, useLCDClient, useWallet, WalletStatus} from '@terra-money/wallet-provider';

import {ButtonGroup, Button, Fab, ListItemIcon, ListItemText, Menu, MenuItem} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import './ConnectWallet.css';
import StationIcon from '../img/station.svg';
import TerraIcon from '../img/terra-logo-only-small.svg';

const formatWalletAddress = (s: string) => {
    return s.slice(5, 10) + '...' + s.slice(39);
}

const ConnectWallet = () => {

    const {
        status,
        network,
        wallets,
        availableConnectTypes,
        availableInstallTypes,
        availableConnections,
        supportFeatures,
        connect,
        install,
        disconnect,
    } = useWallet();
    const connectedWallet = useConnectedWallet();
    const lcd = useLCDClient();
    const [bank, setBank] = useState<Coins | null>();
    useEffect(() => {
        if (connectedWallet) {
            lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                setBank(coins);
            });
        } else {
            setBank(null);
        }
    }, [connectedWallet, lcd]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {status === WalletStatus.WALLET_NOT_CONNECTED && (
                <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={handleClick}>
                    <AccountBalanceWalletIcon sx={{mr: 1}}/>
                    Connect wallet
                </Fab>
            )}
            {status !== WalletStatus.WALLET_NOT_CONNECTED && (
                <ButtonGroup className="connected-wallet-btn" variant="contained"
                             aria-label="outlined primary button group">
                    <Button>
                        <img src={TerraIcon} width={25} alt={'Terra icon'}/>
                        {wallets && wallets.length > 0 ? formatWalletAddress(wallets[0].terraAddress) : ''}
                    </Button>
                    <Button>
                        <span style={{marginRight: 10}}>UST</span>
                        <span>{bank?.get("uusd")?.amount.dividedBy(1000000).toFixed(2) || "0.00"}</span>
                    </Button>
                </ButtonGroup>
            )}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {availableInstallTypes.map((connectType) => (
                    <MenuItem key={'install-' + connectType} onClick={() => install(connectType)}>
                        <ListItemIcon>
                            <img src={StationIcon} alt="Terra Station Wallet Icon" width={25}/>
                        </ListItemIcon>
                        <ListItemText>Install {connectType}</ListItemText>
                    </MenuItem>
                ))}
                {availableConnectTypes.map((connectType) => (
                    <MenuItem key={'connect-' + connectType} onClick={() => connect(connectType)}>
                        <ListItemIcon>
                            <img src={StationIcon} alt="Terra Station Wallet Icon" width={25}/>
                        </ListItemIcon>
                        <ListItemText>Connect {connectType}</ListItemText>
                    </MenuItem>
                ))}
                {availableConnections.map(
                    ({type, name, icon, identifier = ''}) => (
                        <MenuItem key={'connection-' + type + identifier} onClick={() => connect(type, identifier)}>
                            <ListItemIcon>
                                <img
                                    src={icon}
                                    alt={name}
                                    style={{width: '1em', height: '1em'}}
                                />
                            </ListItemIcon>
                            <ListItemText>{name} [{identifier}]</ListItemText>
                        </MenuItem>
                    ),
                )}
            </Menu>
        </div>
    )
}

export default ConnectWallet;
