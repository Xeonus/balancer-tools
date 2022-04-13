import vyperABI from './../components/constants/ABIs/vyperABI.json';
import { ethers } from "ethers";

export async function getVyperContractWorkingSupply(contractAddress) {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20 = new ethers.Contract(
      contractAddress,
      vyperABI,
      provider
    );

    const working_supply = await erc20.working_supply();
    console.log("working_pool_supply", working_supply)
}