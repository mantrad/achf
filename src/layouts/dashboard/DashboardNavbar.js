import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
  Web3: PropTypes.object
};

export default function DashboardNavbar({ onOpenSidebar, Web3 }) {
  const { pathname } = useLocation();
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (Web3) {
        const accounts = await Web3.eth.getAccounts();
        if (accounts) {
          const balance = await Web3.eth.getBalance(accounts[0]);
          const account = accounts[0].replace(accounts[0].slice(6, 37), '...');
          setBalance((balance / 1e18).toFixed(2));
          setWallet(account);
        }
      }
    };
    connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, Web3]);

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <Button
            variant="contained"
            href="https://fuseprotocol.gitbook.io/fuseprotocol/"
            target="_blank"
          >
            Document
          </Button>
          {wallet ? (
            <Button variant="contained">{wallet}</Button>
          ) : (
            <Button variant="contained">Connect Wallet</Button>
          )}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
