import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

// EVM
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContract,
  useContractWrite,
  usePrepareContractWrite,
  useSignMessage,
  useSigner,
} from "wagmi";

import { useEffect, useMemo, useState } from "react";
import { accessProof, handleGenerateProof } from "@/shared/axios";
import { recoverPublicKey } from "viem";
import { factRegistryAbi } from "@/shared/factRegistryAbi";

const inter = Inter({ subsets: ["latin"] });

type selectedTokenProveType = {
  block_number: number;
  calldata: any[];
  metadata: string;
};

export default function Home() {
  const { address, isConnected } = useAccount();

  const clickGenerateProof = async () => {
    await handleGenerateProof(address as string, 1);
    console.log("clickGenerateProof");
  };

  const clickVerifyProof = async () => {
    const proof: any = localStorage.getItem("proof");
    console.log("clickVerifyProof");
    await accessProof(
      "0x2eBAf969571f3814a230850FcCACCC82A932FB6E" as string,
      factRegistryAbi,
      "proveStorage",
      address as string,
      proof[0].block_number,
      proof[0].calldata[3],
      proof[0].calldata[4]
    );
  };
  return (
    <>
      {" "}
      <div className={styles.signupWrapper}>
        <div>
          <div className={styles.step}>STEP 1 : Select zkSync Wallet</div>
          <ConnectButton />
        </div>
      </div>
      {isConnected && (
        <div className={styles.proofbutton} onClick={clickGenerateProof}>
          Generate Proof
        </div>
      )}
      <br />
      {isConnected && (
        <div className={styles.proofbutton} onClick={clickVerifyProof}>
          Verify Proof
        </div>
      )}
    </>
  );
}
