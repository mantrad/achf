import { useState, useEffect } from 'react';
// material
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import moment from 'moment';
// components
import Page from '../components/Page';
import {
  YourAPY,
  YourRebase,
  YourBalance,
  YourReflection,
  YourReflection1,
  YourReflection2,
  Infect,
  Logo
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
import getWeb3 from '../utils/getWeb3';
import AbiContract from '../contracts/abi.json';
import AbiRouter from '../contracts/abiRouter.json';
import AbiSubContract from '../contracts/abiSubContract.json';

export default function AccountApp() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null);
  const [countDown, setCountDown] = useState(null);
  const [totalBalanceUSD, setTotalBalanceUSD] = useState(null);
  const [totalAPY, setTotalAPY] = useState(null);
  const [rebase, setRebase] = useState(null);
  const [maxTx, setMaxTx] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(null);
  const [nextRewardAmount, setNextRewardAmount] = useState(null);
  const [nextRewardAmountUSD, setNextRewardAmountUSD] = useState(null);
  const [nextRewardYield, setNextRewardYield] = useState(null);
  const [roi1USD, setROI1USD] = useState(null);
  const [roi5Rate, setROI5Rate] = useState(null);
  const [roi5RUSD, setROI5RUSD] = useState(null);
  const [send, setSend] = useState(null);
  const [receive, setReceive] = useState(null);
  const [dailyRoi, setDailyRoi] = useState(null);
  const [allInRewards, setallInRewards] = useState(null);
  const [yearRoi, setYearRoi] = useState(null);
  const [totalRewards, setTotalRewards] = useState(null);
  const [distributedRewards, setDistributedRewards] = useState(null);
  const [fromLastReward, setFromLastReward] = useState(null);
  const [rewardPeriod, setRewardPeriod] = useState(null);
  const [rewardedsofar, setRewardedsofar] = useState(null);
  const [toberewarded, setToberewarded] = useState(null);

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const MainAddress = '';
      const SubAddress = '';
      const AvaxAddress = '0xd4675f1f6def698fb349047c7404db2eb08140bf';
      const USDCAddress = '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e';
      const instance = new web3.eth.Contract(AbiContract, MainAddress);
      const instanceSub = new web3.eth.Contract(AbiSubContract, SubAddress);
      setContract(instance);
      const router = await instance.methods.router().call();
      const instanceRouter = new web3.eth.Contract(AbiRouter, router);
      const AmountsOutToken = await instanceRouter.methods
        .getAmountsOut(100000, [MainAddress, AvaxAddress])
        .call();
      const AmountsOutUSD = await instanceRouter.methods
        .getAmountsOut(AmountsOutToken[1], [AvaxAddress, USDCAddress])
        .call();
      const tokenPrice = AmountsOutUSD[1] / 1e6;
      const fixedAPY = 0.0002355;
      const dailyAPY = ((1 + 0.0002355) ** 96 - 1) * 100;
      const day5APY = ((1 + 0.0002355) ** (96 * 5) - 1) * 100;
      const YearAPY = ((1 + 0.0002355) ** (96 * 365) - 1) * 100;
      const getMaxTokenPerWallet = await instance.methods.getMaxTokenPerWallet().call();
      const balanceWallet = await instance.methods.balanceOf(accounts[0]).call();
      const getOverviewOf = await instance.methods.getOverviewOf(accounts[0]).call();
      const lastRebasedTime = await instance.methods._lastRebasedTime().call();
      const initRebaseStartTime = await instance.methods._initRebaseStartTime().call();
      const totalDistributed = await instanceSub.methods.totalDistributed().call();
      const minPeriod = await instanceSub.methods.minPeriod().call();
      const shares = await instanceSub.methods.shares(accounts[0]).call();
      const getUnpaidEarnings = await instanceSub.methods.getUnpaidEarnings(accounts[0]).call();
      const totalDividends = await instanceSub.methods.totalDividends().call();
      const totalShares = await instanceSub.methods.totalShares().call();
      const init = parseInt(initRebaseStartTime, 10);
      const now = new Date().getTime() / 1000;
      const x = Math.ceil((now - init) / 900);
      const countDown = init + 900 * x - now;
      const n = Math.ceil((now - lastRebasedTime) / 900);
      const getRemainingTimeToBeRewarded = await instanceSub.methods
        .getRemainingTimeToBeRewarded(accounts[0])
        .call();
      if (totalDividends > 0) {
        const totalDividendsUSD = await instanceRouter.methods
          .getAmountsOut(totalDividends, [AvaxAddress, USDCAddress])
          .call();
        setTotalRewards(totalDividendsUSD[1] / 1e6);
      } else {
        setTotalRewards(totalDividends);
      }
      console.log(totalDistributed);
      if (totalDistributed > 0) {
        const totalDistributedUSD = await instanceRouter.methods
          .getAmountsOut(totalDistributed, [AvaxAddress, USDCAddress])
          .call();
        setDistributedRewards(totalDistributedUSD[1] / 1e6);
      } else {
        setDistributedRewards(0);
      }
      if (getRemainingTimeToBeRewarded < 0 || getRemainingTimeToBeRewarded > 1e6) {
        setFromLastReward(`Never Rewarded`);
      } else {
        setFromLastReward(moment.unix(getRemainingTimeToBeRewarded).startOf('hour').fromNow());
      }
      setRewardedsofar((shares.totalRealised / 1e5) * tokenPrice);
      setallInRewards(totalShares / 1e5);
      setRewardPeriod(minPeriod);
      setTokenPrice(tokenPrice);
      setNextRewardYield(0.0002355 * 100);
      setNextRewardAmount((balanceWallet / 1e5) * 0.0002355);
      setNextRewardAmountUSD((balanceWallet / 1e5) * 0.0002355 * tokenPrice);
      setROI1USD((balanceWallet / 1e5) * dailyAPY * tokenPrice);
      setROI5Rate(day5APY);
      setROI5RUSD((balanceWallet / 1e5) * day5APY * tokenPrice);
      setMaxTx(getMaxTokenPerWallet / 1e5);
      setSend(getOverviewOf[3] / 1e5);
      setReceive(getOverviewOf[4] / 1e5);
      setDailyRoi(dailyAPY);
      setYearRoi(YearAPY);
      setTotalBalance(balanceWallet / 1e5);
      setTotalBalanceUSD((balanceWallet / 1e5) * tokenPrice);
      setAccount(accounts[0]);
      setContract(instance);
      setCountDown(countDown);
      setWeb3(web3);
    } catch (error) {
      alert(`Please connect with metamask`);
      console.error(error);
    }
  };
  const claim = () => {
    contract.methods.claim().send({ from: account });
  };
  return (
    <Page title="Account | FUSEilies">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <YourBalance totalBalance={totalBalance} totalBalanceUSD={totalBalance} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <YourAPY totalAPY={yearRoi} dailyAPY={dailyRoi} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <YourRebase countDown={countDown} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <YourReflection maxTx={maxTx} send={send} receive={receive} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button onClick={claim} variant="contained">
              claim
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <YourReflection1
              tokenPrice={tokenPrice}
              NextRewardAmount={nextRewardAmount}
              NextRewardAmountUSD={nextRewardAmountUSD}
              NextRewardYield={nextRewardYield}
              ROI1USD={roi1USD}
              ROI5Rate={roi5Rate}
              ROI5USD={roi5RUSD}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <YourReflection2
              AllInRewards={allInRewards}
              TotalRewards={totalRewards}
              DistributedRewards={distributedRewards}
              FromLastReward={fromLastReward}
              RewardPeriod={rewardPeriod}
              Rewardedsofar={rewardedsofar}
              Toberewarded={toberewarded}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
