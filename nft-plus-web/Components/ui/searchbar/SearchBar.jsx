import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import Image from 'next/image';
function SearchBar({ onClick }) {
    const [searchQuery, setSearchQuery] = useState("");

    function handleSearch() {
        onClick(searchQuery)
    }

    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            onClick(searchQuery)
        }
    }

    return (
            <SearchBarContainer>
                <SearchInput
                    onKeyDown={handleEnterKey}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={'작가 이름을 검색해보세요.'}
                />
                <SearchIcon 
                    onClick={handleSearch}
                >
                   <Image 
                        src="/search.svg" 
                        alt="search" 
                        width={26}
                        height={26}
                    />
                </SearchIcon>
            </SearchBarContainer>
    )
}

const SearchBarContainer = tw.div`
    w-full 
    flex 
    justify-between 
    items-center 
    py-[10px]
    pl-[10px]
    pr-[7px]
    bg-[#0F1111]
    rounded-[5px]
    overflow-hidden
    cursor-pointer
`

const SearchInput = tw.input`
    w-full 
    text-lg 
    font-[400]  
    text-[14px]
    rounded-r-full 
    focus:outline-none 
    placeholder:font-[400] 
    placeholder:text-[#5A5A5A] 
    placeholder:text-[14px] 
    bg-[#0F1111]
`

const SearchIcon = tw.div`
    flex
    items-center
`

export default SearchBar