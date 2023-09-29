import Box from "@/components/Box";
import {useEffect, useState} from "react";

interface ToDont {
    id: number;
    text: string;
    count: number;
}

interface ToDontProps {
    contract: any;
    currentAccount: string;
}

export default function ToDonts({ contract, currentAccount }: ToDontProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [toDonts, setToDonts] = useState<ToDont[]>([]);
    const [addingNewToDont, setAddingNewToDont] = useState<boolean>(false);
    const [newToDont, setNewToDont] = useState<string>('');
    const [openToDont, setOpenToDont] = useState<number | null>(null);

    const toggleToDont = (toDont: ToDont) => {
        if(loading) return;
        if (openToDont === toDont.id) {
            setOpenToDont(null);
        } else {
            setOpenToDont(toDont.id);
        }
    };

    const toggleAddingToDont = () => {
        if(loading) return;
        if(addingNewToDont) {
            setAddingNewToDont(false);
            setNewToDont('');
        } else {
            setAddingNewToDont(true);
        }
    }

    const doWhileLoading = async (callback: () => Promise<void>) => {
        if(loading) return;
        setLoading(true);
        await callback();
        setLoading(false);
    }

    const addNewToDont = async () => {
        await doWhileLoading(async () => {
            try {
                if(!newToDont.length) return;

                const added = await contract.addTask(newToDont);
                await added.wait();

                await regenerateToDonts();

                toggleAddingToDont();
            } catch (err){
                console.error(err);
            }
        });
    }

    const incrementToDont = async (toDont: ToDont) => {
        await doWhileLoading(async () => {
            try {
                const incremented = await contract.incrementTask(toDont.id);
                await incremented.wait();
                await regenerateToDonts();
                setOpenToDont(null);
            } catch(err){
                console.error(err);
            }
        });
    }

    const deleteToDont = async (toDont: ToDont) => {
        await doWhileLoading(async () => {
            try {
                const removed = await contract.removeTask(toDont.id);
                await removed.wait();
                await regenerateToDonts();
                setOpenToDont(null);
            } catch (err){
                console.log('err', err);
            }
        });
    }

    const regenerateToDonts = async () => {
        try {
            const _toDonts = await contract.getTasks(currentAccount);
            setToDonts(_toDonts);
        } catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        regenerateToDonts();
    }, []);

    const buttonAnimation = 'hover:scale-[1.2] active:scale-[0.9] transition-transform duration-100 ease-in-out';

    return (
        <section>
            <Box>
                <section className="mt-3 overflow-y-auto max-h-[340px] px-[30px] pb-[50px] relative">

                    {/* --------------------------- */}
                    {/* ------- NEW TO DONT ------- */}
                    {/* --------------------------- */}
                    {addingNewToDont && (
                        <section className="pt-2 mb-4 cursor-pointer select-none">
                            <section className="flex justify-between">

                                <section className="flex flex-1 items-start">
                                    <figure className="px-1.5 py-1 rounded bg-red-500 inline-flex justify-center items-center">
                                        <span className="text-white text-[9px] font-black leading-snug">DON’T</span>
                                    </figure>

                                    <div className="mx-2 text-zinc-800 text-[11px] font-normal leading-snug flex-1">
                                        <textarea value={newToDont} onChange={(e) => setNewToDont(e.target.value)}
                                                  className="h-[60px] border-[2px] border-[#E1E1E1] p-2 rounded resize-none w-full"
                                                  placeholder="Ever build another boring TODO app"></textarea>
                                    </div>
                                </section>

                                <section className="flex flex-col">
                                    <div className={`w-[26px] h-[26px] relative cursor-pointer ${buttonAnimation}`} onClick={addNewToDont}>
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 0C9.5522 0 6.24559 1.36958 3.80774 3.80774C1.36968 6.24566 0 9.5522 0 13C0 16.4478 1.36958 19.7544 3.80774 22.1923C6.24566 24.6303 9.5522 26 13 26C16.4478 26 19.7544 24.6304 22.1923 22.1923C24.6303 19.7543 26 16.4478 26 13C26 9.5522 24.6304 6.24559 22.1923 3.80774C19.7543 1.36968 16.4478 0 13 0ZM13 23.4839C10.2195 23.4839 7.55293 22.3794 5.58685 20.4132C3.62071 18.4471 2.51623 15.7804 2.51623 13.0001C2.51623 10.2198 3.62071 7.55303 5.58685 5.58696C7.553 3.62081 10.2197 2.51634 13 2.51634C15.7803 2.51634 18.4471 3.62081 20.4131 5.58696C22.3793 7.5531 23.4838 10.2198 23.4838 13.0001C23.4838 15.7804 22.3793 18.4472 20.4131 20.4132C18.447 22.3794 15.7803 23.4839 13 23.4839Z" fill="#6D62EA"/>
                                            <path d="M18.871 10.4503C18.8609 10.1049 18.7094 9.77894 18.4516 9.54865C18.1931 9.33842 17.8646 9.23331 17.5321 9.2542C17.1995 9.27522 16.8868 9.42073 16.6568 9.66195L11.742 14.5768L9.7626 12.5806C9.50132 12.3151 9.14545 12.1643 8.77292 12.1613C8.4756 12.1568 8.18715 12.2628 7.96356 12.459C7.70693 12.6896 7.55623 13.0154 7.54666 13.3604C7.5371 13.7052 7.66965 14.0388 7.91331 14.2832L10.1317 16.5015C10.5572 16.9283 11.1352 17.168 11.7377 17.168C12.3404 17.168 12.9182 16.9283 13.3439 16.5015L18.502 11.3728C18.7463 11.1289 18.8797 10.7954 18.8709 10.4502L18.871 10.4503Z" fill="#6D62EA"/>
                                        </svg>
                                    </div>
                                </section>

                            </section>
                        </section>
                    )}

                    {!toDonts.length && !addingNewToDont && (
                        <section className="flex flex-col items-center justify-center mt-[110px]">
                            <span className="text-zinc-800 text-[14px] font-medium">Nothing here yet</span>
                            <span className="text-zinc-500 text-[11px] font-normal mt-1">Click the plus button below to add a new item</span>

                        </section>
                    )}

                    {/* ---------------------------- */}
                    {/* ------- TO DONT LIST ------- */}
                    {/* ---------------------------- */}
                    {toDonts.map((toDont) => (
                        <section className="pt-2 cursor-pointer select-none" key={toDont.id} onClick={() => toggleToDont(toDont)}>
                            <section className="flex justify-between">

                                {/* ------- REMOVE BUTTON ------- */}
                                {openToDont === toDont.id && (
                                    <figure className={`w-[26px] h-[26px] relative mr-2 ${buttonAnimation}`} onClick={() => deleteToDont(toDont)}>
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.192 3.80759C19.7369 1.35225 16.4724 -0.000240711 12.9995 3.21335e-08C5.83146 3.21335e-08 0 5.832 0 13.0001C0 20.1682 5.8317 26 13 26C20.1683 26 26 20.1678 26 12.9999C26 9.5274 24.6474 6.26269 22.192 3.80759ZM12.9998 22.7184C7.64159 22.7184 3.28154 18.3588 3.28154 13.0001C3.28154 10.9118 3.94603 8.97706 5.07091 7.39105L18.6085 20.9285C17.0225 22.0541 15.0877 22.7185 12.9997 22.7185L12.9998 22.7184ZM20.9293 18.6087L7.39194 5.07125C8.97734 3.94568 10.9118 3.28157 13.0002 3.28157C15.5961 3.28157 18.0368 4.29213 19.8724 6.12787C21.708 7.96344 22.7187 10.4037 22.7187 12.9999C22.7187 15.0882 22.0543 17.0227 20.9293 18.6087H20.9293Z" fill="#FF0000"/>
                                        </svg>
                                    </figure>
                                )}

                                {/* ------- TEXT ------- */}
                                <section className="flex items-center flex-1">
                                    <figure className="px-1.5 py-1 rounded bg-red-500 inline-flex justify-center items-center">
                                        <span className="text-white text-[9px] font-black leading-snug">DON’T</span>
                                    </figure>

                                    <div className="ml-2 text-zinc-800 text-[11px] font-normal leading-snug">{toDont.text}</div>
                                </section>

                                {/* ------- ACTIONS ------- */}
                                <section className={buttonAnimation}>
                                    {openToDont === toDont.id ? (
                                        <div className="w-[26px] h-[26px] relative" onClick={() => incrementToDont(toDont)}>
                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.4053 11.9947L9.29068 14.144C8.66662 14.7681 7.62662 14.7681 7.00271 14.144C6.37865 13.5199 6.37865 12.4799 7.00271 11.856L11.8214 6.96803C12.1334 6.656 12.5493 6.48267 12.9654 6.48267C13.3814 6.48267 13.7975 6.656 14.1095 6.96803L19.0322 11.856C19.7255 12.5494 19.6562 13.7281 18.8242 14.3173C18.1655 14.8027 17.2295 14.664 16.6749 14.0747L14.8375 12.2721L14.6295 12.2375V17.9228C14.6295 18.8241 13.9016 19.5174 13.0349 19.5174H13C12.0987 19.5174 11.4054 18.7895 11.4054 17.9228L11.4053 11.9947Z" fill="#6D62EA"/>
                                                <path d="M13 26C20.176 26 26 20.176 26 13C26 5.824 20.2107 0 13 0C5.78933 0 0 5.824 0 13C0 20.176 5.824 26 13 26ZM13 3.25867C18.3733 3.25867 22.7413 7.62667 22.7413 13C22.7413 18.3733 18.408 22.7413 13 22.7413C7.592 22.7413 3.25867 18.3733 3.25867 13C3.25867 7.62667 7.62667 3.25867 13 3.25867Z" fill="#6D62EA"/>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className={`w-[26px] h-[26px] relative border-[3.5px] rounded-full flex items-center justify-center ${toDont.count > 0 ? "border-[#6D62EA]" : "border-[#DDDDDD]"}`}>
                                            {toDont.count > 0 && (
                                                <span className="text-[#6D62EA] text-xs font-black">
                                                    {toDont.count}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </section>

                            </section>
                        </section>
                    ))}

                </section>

                {/* ---------------------------------- */}
                {/* ------- ADD TO DONT BUTTON ------- */}
                {/* ---------------------------------- */}
                <figure className="absolute -bottom-8 right-0 left-0 z-30 flex justify-center items-center" onClick={() => toggleAddingToDont()}>
                    <figure className={`w-16 h-16 rounded-full shadow flex items-center justify-center cursor-pointer ${buttonAnimation} 
                        ${addingNewToDont ? 'bg-gray-400 rotate-45' : 'bg-indigo-500'} transition-all duration-100`}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.3864 29.017V0.892044H17.1591V29.017H12.3864ZM0.710228 17.3409V12.5682H28.8352V17.3409H0.710228Z" fill="white"/>
                        </svg>
                    </figure>
                </figure>
            </Box>
        </section>
    )
}
