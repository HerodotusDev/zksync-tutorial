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
import { everaiDuoABI } from "@/shared/everaiDuo";
import { MintNFT } from "@/components/MintNFT";
import { handleGenerateProof, handleOwnedNFTs } from "@/shared/axios";
import Link from "next/link";
import { recoverPublicKey } from "viem";
import { staradgeAbi } from "@/shared/staradgeAbi";

const inter = Inter({ subsets: ["latin"] });

type selectedTokenProveType = {
  block_number: number;
  calldata: any[];
  metadata: string;
};

export default function Home() {
  const { address, isConnected } = useAccount();
  const [ownednfts, setOwnedNfts] = useState<any[]>();
  const [selectedTokenId, setSelectedTokenId] = useState<number>();
  const [selectedBlockNumber, setSelectedBlockNumber] = useState<number>();
  const [selectedTokenProves, setSelectedTokenProves] =
    useState<selectedTokenProveType[]>();
  const [stepStatus, setStepStatus] = useState<number>(1);
  const [isMapping, setIsMapping] = useState(false);
  const [isLoadingProof, setIsLoadingProof] = useState<boolean>(false);

  // ------------------ start claim function write ------------------

  const handleClaiming = async () => {};

  // -------------------------------STARKNET END-----------------------------------------------

  // -------------------------------ADDRESS VERIFICATION START------------------------------------------------

  // const handleAddrMappingToStarknet = async () => {
  //   const signatureBuffer = Buffer.from(data as string);
  //   const v = signatureBuffer[64] + 27; // add 27 to get the recovery ID
  //   const r = signatureBuffer.slice(0, 32).toString("hex");
  //   const s = signatureBuffer.slice(32, 64).toString("hex");

  //   const public_key = await recoverPublicKey({
  //     hash: "0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68",
  //     signature:
  //       "0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c",
  //   });

  //   console.log({
  //     message: data,
  //     public_key: public_key,
  //     signature_r: r,
  //     signature_s: s,
  //   });

  //   // TODO : NEED TO CONNECT WITH STARKNET

  //   localStorage.setItem(
  //     "mapping_L1_L2",
  //     JSON.stringify({ L1: address, L2: starknetAccount?.address })
  //   );
  //   setIsMapping(true);
  // };

  // -------------------------------ADDRESS VERIFICATION END------------------------------------------------

  // const updateMappingState = async () => {
  //   const item = localStorage.getItem("mapping_L1_L2");
  //   const data = JSON.parse(item as string);
  //   if (data) {
  //     if (data.L1 == address && data.L2 == starknetAccount?.address) {
  //       setIsMapping(true);
  //     } else {
  //       setIsMapping(false);
  //     }
  //   } else {
  //     setIsMapping(false);
  //   }
  // };

  const handleSelection = async (tokenId: any) => {
    setSelectedTokenId(tokenId);
    updateProofsStates(tokenId);
  };

  const updateNFTState = async () => {
    const res = await handleOwnedNFTs(address as string);
    setOwnedNfts(res);
  };

  const updateProofsStates = async (tokenId: number) => {
    const result = localStorage.getItem("proofs") || "{}";
    const proofs = JSON.parse(result)[tokenId];
    setSelectedBlockNumber(undefined);
    setSelectedTokenProves(proofs);
  };

  const clickGenerateProof = async () => {
    setIsLoadingProof(true);
    await handleGenerateProof(address as string, selectedTokenId as number);
    await updateProofsStates(selectedTokenId as number);
    setIsLoadingProof(false);
  };

  // -------------------------------USE EFFECTS------------------------------------------------

  // useEffect(() => {
  //   updateNFTState();
  // }, [isConnected, address]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     handleAddrMappingToStarknet();
  //   }
  // }, [isLoading]);

  // useEffect(() => {
  //   updateMappingState();
  // }, [isConnected, isStarknetConnected]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     updateMappingState();
  //   }
  // }, []);

  return (
    <div className={styles.signupWrapper}>
      <div>
        <div className={styles.step}>STEP 1 : Select zkSync Wallet</div>
        <ConnectButton />
      </div>
    </div>
  );
}
