import React, { useEffect, useState } from 'react'
import useArtist from '../useArtist'
import RecentWorkL from 'Components/ui/loader/recent'
import ProfilePageCard from 'Components/entities/artwork/ProfilePageCard'
import useCommonTranslation from 'locale/useCommonTranslation';
import Pagination from "Components/ui/pagination/Pagination";
import { useRouter } from 'next/router';
import useTab from 'Components/ui/tab/useTab';
import Select from 'Components/ui/select/Select';
import noDataImgForArtistDetail from "public/noImage.png"
import Image from 'next/image';
import { useGlobalContext } from 'common/global/useGlobalContext';

function ArtistTabPanels() {
    const { browserWindow } = useGlobalContext()
    const isMobileWidth = browserWindow.innerWidth < 501
    const { activeTabId } = useTab()
    const { data, loading, setFilterState, filterState, getAuthorArts, getListArts, artist } = useArtist()
    const { query } = useRouter()
    const [stype, setStype] = useState('');
    const [type, setType] = useState('');
    const paginate = (num) => {
        setFilterState(prev => ({ ...prev, page: num, stype, type }));
    };
    const {
        saleStatusI18,
        entireI18,
        projectNFTI18,
        competitionNFTI18,
        marketNFTI18,
        unsoldI18,
        saleI18,
        notPurchasedI18,
        notMintedI18
    } = useCommonTranslation();
    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);

    const options = [
        {
            text: entireI18,
            value: ""
        },
        {
            text: marketNFTI18,
            value: "market"
        },
        {
            text: projectNFTI18,
            value: "vm"
        },
        {
            text: competitionNFTI18,
            value: "competition"
        }
    ];

    const options2 = [
        {
            text: saleStatusI18,
            value: ""
        },
        {
            text: entireI18,
            value: ""
        },
        {
            text: saleI18,
            value: "SELL"
        },
        {
            text: unsoldI18,
            value: "NOT_SELL"
        }
    ];

    const [chosenSelect, setChosenSelect] = useState(options[0])
    const [chosenSelect2, setChosenSelect2] = useState(options2[0])

    useEffect(() => {
        doSearch();
    }, [stype, type])

    function handleSelect(select) {
        setChosenSelect(select)
        setStype(select.value);
    }

    function handleSelect2(select) {
        setChosenSelect2(select)
        setType(select.value);
    }

    function doSearch() {
        paginate(0);
    }

    function clearSearch() {
        setChosenSelect(options[0])
        setStype(options[0].value);
        setChosenSelect2(options2[0])
        setType(options2[0].value);
        setFilterState(prev => ({ ...prev, page: 0, stype: '', type: '' }));
    }

    useEffect(() => {
        clearSearch();
    }, [activeTabId]);

    useEffect(() => {
        if (query.id) {
            switch (activeTabId) {
                case 0:
                    getAuthorArts();
                    if (data && data.result) {
                        setMax(data.maxPrice);
                        setMin(data.minPrice);
                    }
                    break;
                case 1:
                    getListArts();
                    if (artist && artist.result) {
                        setMax(artist.maxPrice);
                        setMin(artist.minPrice);
                    }
                    break;
                default: {
                    return;
                }
            }
        }
    }, [query.id, filterState]);

    return (
        <>
            <div className="flex gap-3 sm:justify-end justify-center pt-[45px] sm:pt-[50px] ">
                <Select
                    options={options}
                    onSelect={handleSelect}
                    defaultVal={chosenSelect}
                    width={isMobileWidth ? 158 : 168}
                />
                <Select
                    options={options2}
                    onSelect={handleSelect2}
                    defaultVal={chosenSelect2}
                    width={isMobileWidth ? 158 : 168}
                />
            </div>

            <div className="sm:w-full mt-[30px] grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-2 sm:gap-8 gap-[12px] flex-wrap mx-auto justify-content">
                {loading ? (
                    Array.from({ length: 8 }, () => 0).map((el, index) => <RecentWorkL key={index} isMarket={true} />)
                ) : (
                    data?.content?.length > 0 ? data?.content.map((artwork, idx) => (
                        <ProfilePageCard key={'artist-artwork-' + idx} {...artwork} />
                    )) :
                        (
                            <div className="mt-8 col-span-full h-[500px] flex flex-col gap-9 justify-center items-center px-14">
                                <Image src={noDataImgForArtistDetail.src} width={130} height={130} alt='noImage' />
                                {
                                    activeTabId === 0 ? <p className="text-[#7B7B7B] text-[20px] font-bold">{notMintedI18}</p>
                                        : <p className="text-[#7B7B7B] text-[20px] font-bold">{notPurchasedI18}</p>
                                }
                            </div>
                        )
                )
                }
            </div>
            {
                data?.content?.length !== 0 && (
                    <div className="w-full flex justify-center pt-16 pb-8">
                        <Pagination
                            toLastPage={paginate}
                            toFirstPage={paginate}
                            toPrevPage={paginate}
                            toNextPage={paginate}
                            totalPages={data?.totalPages}
                            data={data?.content}
                            current={data?.number}
                            changePage={paginate}
                        />
                    </div>
                )
            }
        </>
    )
}

export default ArtistTabPanels