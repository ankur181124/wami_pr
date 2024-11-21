import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import contractABI from "../../data.json"
import { useWriteContract, useReadContract, useWaitForTransactionReceipt, useTransaction, useTransactionConfirmations , useSwitchAccount, useSwitchChain, useSignMessage, useVerifyMessage} from 'wagmi'
import { useState, useEffect } from 'react';

const Home: NextPage = () => {

  const [contractnum, setContractnum] = useState<number>()
  const [getcontractnum, setgetContractnum] = useState<number>()
  const [load, setLoad] = useState<boolean>(false)



  let {data} = useReadContract({
    abi:contractABI.abi,
    address:'0x37bFD256b278e3b983710249DF1DB0A5eE0Dea85',
    functionName:'getValue'
  })


  let getValueToSmartContract = ()=>{
    setgetContractnum(Number(data?.toString()))

    setLoad(!load)

  }


  const { writeContract,data:hashdata,isSuccess} = useWriteContract()


 
  // const {data:transactiondata,isFetched,isLoading,status} = useTransaction({
  //   hash:hashdata
  // })

  // console.log(transactiondata,isFetched,isLoading, status );

  // const result = useTransactionConfirmations({
  //   hash:hashdata
  // })

  // console.log('data:- '+ trdata);
  // console.log('fetched:- '+ isFetched);
  // console.log('Fetching:- '+ isFetching);
  // console.log('isPending:- '+ isPending);
  // console.log('isPaused:- '+ isPaused);
  // console.log('isLoading:- '+ isLoading);
  // console.log('isSuccess:- '+ suss);

  // console.log('________________________________________________________________________________________________________________')


  // const {data:trdata,isFetched,isFetching,isLoading,isPaused,isSuccess:suss,isPending,fetchStatus,error} = useWaitForTransactionReceipt({
  //   hash:hashdata
  // })

  // console.log('data:- '+ trdata);
  // console.log('fetched:- '+ isFetched);
  // console.log('Fetching:- '+ isFetching);
  // console.log('isPending:- '+ isPending);
  // console.log('isPaused:- '+ isPaused);
  // console.log('isLoading:- '+ isLoading);
  // console.log('isSuccess:- '+ suss);
  // console.log('fetchStatus:- '+ fetchStatus);
  // console.log('error:- '+ error);



  // console.log('________________________________________________________________________________________________________________')  

  
  
//  const {connectors} = useSwitchAccount()

// const {chains} = useSwitchChain()

const {signMessage,data:signdata, context, isSuccess:suss} = useSignMessage()

const signmessage = ()=>{
  let res = signMessage({message:'new message'})
  console.log(res);
  
}
console.log('data:- '+ signdata);
console.log('context:- '+ context);
console.log('isSuccess:- '+ suss);



const result = useVerifyMessage({
  address:'0x5d8c1B4800726DeE9eDa06aEe573949D89Bd64AB',
  message:'new messsage',
  signature:signdata
})
// console.log('___________________________________________________________________');

// console.log(result);



 

  let setValueToSmartContract = () => {
    writeContract({
      abi: contractABI.abi,
      address: '0x37bFD256b278e3b983710249DF1DB0A5eE0Dea85',
      functionName: 'setValue',
      args: [contractnum],
    })
   
  }

  let handelinput = (e:any)=>{
    setContractnum(Number(e.target.value))
  };

  useEffect(()=>{
 

  },[load,contractnum ])  

  return (
    <>

      <main className={styles.main}>
        <ConnectButton />
        <input
        id='inputNumber'
          placeholder='enter number to write on contract'
          type='number'
          required
          value={contractnum}
          onChange={handelinput}
        />
        <button onClick={setValueToSmartContract}>setValue</button>
        <button onClick={getValueToSmartContract}>getValue</button>
        <div>the number is :- {getcontractnum}</div>
        <button onClick={signmessage}>signMessage</button>

      </main>
    </>
  );
};

export default Home;
