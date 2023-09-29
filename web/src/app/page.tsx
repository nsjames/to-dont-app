'use client';

import {useEffect, useState} from "react";
import { ethers } from "ethers";
import ToDonts from "@/components/ToDonts";
import abi from "./abi.json";
import Box from "@/components/Box";

const CONTRACT_ADDRESS = "0x638A246F0Ec8883eF68280293FFE8Cfbabe61B44";

export default function Home() {

    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);

    const [currentAccount, setCurrentAccount] = useState<string>("");

    const [contract, setContract] = useState<any>(null);

    const loggedIn = currentAccount !== "";

    const handleAccountsChanged = (accounts:Array<string>) => {
        if (accounts.length === 0) {
            setCurrentAccount("");
            setContract(null);
            return;
        }

        setCurrentAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setContract(new ethers.Contract(CONTRACT_ADDRESS, abi, provider.getSigner()));
    }

    useEffect(() => {
        setIsMetamaskInstalled(!!window.ethereum);
    }, []);
    useEffect(() => {
        if(isMetamaskInstalled){
            window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged);
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
    }, [isMetamaskInstalled]);

    const login = async () => {
        window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then(handleAccountsChanged);
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#EFEEF6] relative">

            {!isMetamaskInstalled && (
                <Box>
                    <section className="h-full px-[30px] pb-[50px] flex flex-col justify-center items-center">
                        Install Metamask
                    </section>
                </Box>
            )}

            {isMetamaskInstalled && (
                <section>
                    {loggedIn && <ToDonts contract={contract} currentAccount={currentAccount} />}

                    {!loggedIn && (
                        <Box>
                            <section className=" h-full px-[30px] pb-[50px] flex flex-col justify-center items-center">
                                Login with Metamask
                                <button onClick={login} className="bg-blue-500 mt-5 text-white px-4 py-2 rounded-md">Login</button>
                            </section>
                        </Box>
                    )}
                </section>
            )}

        </main>
    )
}
