import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  Divider,
  IconButton
} from '@mui/material';
import Iconify from '../../components/Iconify';
// mocks_
import account from '../../_mocks_/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import sidebarConfig from './SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  Web3: PropTypes.object
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar, Web3 }) {
  const { pathname } = useLocation();
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }

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
  const connectWallet = async () => {
    window.location.reload(false);
  };
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: 'relative' }}
        >
          <Box
            component="img"
            src="/static/logo.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />
          <Stack direction="row" spacing={2}>
            <Button fullWidth size="large" color="inherit" variant="outlined" href="#">
              <Iconify icon="ic:twotone-discord" color="#DF3E30" height={24} />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              href="https://t.me/fuseprotocolofc"
            >
              <Iconify icon="logos:telegram" color="#1877F2" height={24} />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              href="https://twitter.com/fuseprotocolofc"
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" height={24} />
            </Button>
          </Stack>
        </Stack>
      </Box>

      <NavSection navConfig={sidebarConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
