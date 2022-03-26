import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import getWeb3 from '../../utils/getWeb3';
import AbiContract from '../../contracts/abi.json';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [web3, setWeb3] = useState(null);
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    try {
      const web3 = await getWeb3();
      setWeb3(web3);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract.
           Check console for details.`
      );
      console.error(error);
    }
  };
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} Web3={web3} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
