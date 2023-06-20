import axios from "axios";
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const metadata_endpoint = process.env.NEXT_PUBLIC_METADATA_URL as string

export const handleGenerateProof = async (address:string, selectedTokenId:number) => {
    const res = await axios.post("/api/everai", {
      addr: address,
      tokenId: selectedTokenId,
    });
    const original = localStorage.getItem("proofs") || "{}"
   const json_original = JSON.parse(original)
   if(json_original[selectedTokenId]){
    json_original[selectedTokenId].push({"block_number":res.data.block_number ,"calldata": res.data.calldata, "metadata": `${metadata_endpoint}${selectedTokenId}` })
   }else {
    json_original[selectedTokenId] =  [{"block_number":res.data.block_number ,"calldata": res.data.calldata,"metadata": `${metadata_endpoint}${selectedTokenId}`}]

   }
    localStorage.setItem("proofs",JSON.stringify( json_original ));
    return res.data
  };

   const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

  export const accessProof =async(contractAddress :string, abi: { inputs: { internalType: string; name: string; type: string; }[]; name: string; outputs: { internalType: string; name: string; type: string; }[]; stateMutability: string; type: string; }[], function_name:string, account:string, block_number:number, slot: string, storageProof:string) => {
      const data = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi,
      functionName: function_name,
        args: [account, block_number,slot,storageProof]
    })
  }

