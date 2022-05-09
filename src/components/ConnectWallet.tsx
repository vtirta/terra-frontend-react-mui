import * as React from 'react';
import {useWallet, WalletStatus} from '@terra-money/wallet-provider';

import {Fab, ListItemIcon, ListItemText, Menu, MenuItem} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StationIcon from '../img/station.svg';
import Button from "@mui/material/Button";

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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
                    ({ type, name, icon, identifier = '' }) => (
                        <MenuItem key={'connection-' + type + identifier} onClick={() => connect(type, identifier)}>
                            <ListItemIcon>
                                <img
                                    src={icon}
                                    alt={name}
                                    style={{ width: '1em', height: '1em' }}
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
