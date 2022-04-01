import { useState, useEffect } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  Price,
  Pool,
  Insurance,
  FirePit,
  FirePitUSD,
  FirePitPercent,
  Treasury,
  Overview,
  Logo
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
import getWeb3 from '../utils/getWeb3';
import AbiContract from '../contracts/abi.json';
import AbiRouter from '../contracts/abiRouter.json';
import AbiMetis from '../contracts/abiMetis.json';
import AbiPair from '../contracts/abiPair.json';

export default function DashboardApp() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(null);
  const [poolValue, setPoolValue] = useState(null);
  const [treasuryAmountUSD, setTreasuryAmountUSD] = useState(null);
  const [firePitAmount, setFirePitAmount] = useState(null);
  const [firePitAmountUSD, setFirePitAmountUSD] = useState(null);
  const [firePitPercent, setFirePitPercent] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [overview, setOverview] = useState({});
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const MetisAddress = '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000';
      const MainAddress = '0xa95974910b55407D166A033173C42B4C539221a4';
      const USDCAddress = '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21';
      const instance = new web3.eth.Contract(AbiContract, MainAddress);
      const instanceMetis = new web3.eth.Contract(AbiMetis, MetisAddress);
      const router = await instance.methods.router().call();
      const decimals = await instance.methods.decimals().call();
      const instanceRouter = new web3.eth.Contract(AbiRouter, router);
      const AmountsOutToken = await instanceRouter.methods
        .getAmountsOut(100000, [MainAddress, MetisAddress])
        .call();
      const AmountsOutUSD = await instanceRouter.methods
        .getAmountsOut(AmountsOutToken[1], [MetisAddress, USDCAddress])
        .call();
      const tokenPrice = AmountsOutUSD[1] / 1e6;
      const totalSupply = await instance.methods.totalSupply().call();
      const firePitAddr = await instance.methods.blackHole().call();
      const pairAddr = await instance.methods.pair().call();
      const treasuryAddr = await instance.methods.treasuryReceiver().call();
      const insuranceAddr = await instance.methods.InsuranceFundReceiver().call();
      const firePitBalance = await instance.methods.balanceOf(firePitAddr).call();
      const treasuryBalance = await instanceMetis.methods.balanceOf(treasuryAddr).call();
      const insuranceBalance = await instanceMetis.methods.balanceOf(insuranceAddr).call();
      if (treasuryBalance / 1e18 > 0.01) {
        const treasuryAmountsOutUSD = await instanceRouter.methods
          .getAmountsOut(treasuryBalance, [MetisAddress, USDCAddress])
          .call();
        setTreasuryAmountUSD(treasuryAmountsOutUSD[1] / 1e6);
      } else {
        setTreasuryAmountUSD(0);
      }
      if (firePitBalance > 0) {
        const firePitAmountsOutUSD = await instanceRouter.methods
          .getAmountsOut(firePitBalance, [MetisAddress, USDCAddress])
          .call();
        setFirePitAmountUSD(firePitAmountsOutUSD[0] / 1e6);
      } else {
        setFirePitAmountUSD(0);
      }
      if (insuranceBalance > 0) {
        const insuranceAmountsOutUSD = await instanceRouter.methods
          .getAmountsOut(insuranceBalance, [MetisAddress, USDCAddress])
          .call();
        setInsurance(insuranceAmountsOutUSD[1] / 1e6);
      } else {
        setInsurance(0);
      }
      const instancePair = new web3.eth.Contract(AbiPair, pairAddr);
      const reserve = await instancePair.methods.getReserves().call();
      const poolValue = (reserve.reserve0 / 1e8) * tokenPrice;
      const initRebaseStartTime = await instance.methods._initRebaseStartTime().call();
      const circulatingSupply = (totalSupply - firePitBalance) / 1e5;
      const marketCap = tokenPrice * circulatingSupply;
      const percentFirepit = (firePitBalance / totalSupply) * 100;
      const init = parseInt(initRebaseStartTime, 10);
      const now = new Date().getTime() / 1000;
      const x = Math.ceil((now - init) / 900);
      const countDown = init + 900 * x - now;
      const data = {};
      data.tokenPrice = tokenPrice;
      data.marketCap = marketCap;
      data.circulatingSupply = circulatingSupply;
      data.totalSupply = totalSupply;
      data.countDown = Math.floor(countDown);
      setAccount(accounts[0]);
      setContract(instance);
      setWeb3(web3);
      setTokenPrice(tokenPrice);
      setFirePitAmount(firePitBalance / 1e5);
      setPoolValue(poolValue);
      setFirePitPercent(percentFirepit);
      setOverview(data);
    } catch (error) {
      alert(`Please connect with Metamask!`);
      console.error(error);
    }
  };
  return (
    <Page title="Account | FUSEilies">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Overview Overview={overview} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Price Price={tokenPrice} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Treasury Treasury={treasuryAmountUSD} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Pool Pool={poolValue} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Insurance Insurance={insurance} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <FirePit FirePit={firePitAmount} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <FirePitUSD FirePitUSD={firePitAmountUSD} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <FirePitPercent FirePitPercent={firePitPercent} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
