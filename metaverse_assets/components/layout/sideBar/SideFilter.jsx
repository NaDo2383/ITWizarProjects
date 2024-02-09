import Button from 'a/components/ui/button/Button'
import CloseBtn from 'a/components/ui/button/CloseBtn'
import { OutlineTag } from 'a/components/ui/button/OutlineBtn'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import FormRow from 'a/components/ui/form/FormRow'
import CheckBoxForFilter from 'a/components/ui/form/elements/checkbox/CheckBoxForFilter'
import CheckboxGroup from 'a/components/ui/form/elements/checkbox/CheckboxGroup'
import useCheckbox, {
    useCheckboxGroup,
} from 'a/components/ui/form/elements/checkbox/useCheckbox'
import { SearchInput } from 'a/components/ui/form/elements/input/InputSearch'
import useForm from 'a/components/ui/form/store/useForm'
import { Label } from 'a/components/ui/typography/Label'
import useAsset from 'a/features/asset/useAsset'
import { useAssetCtx } from 'a/features/asset/useAssetCtx'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'

// export const flatFormItems = [
//     {
//         label: 'Unity',
//         name: 'unity',
//         checked: false,
//     },
//     {
//         label: 'Unreal',
//         name: 'unreal',
//         checked: false,
//     },
//     {
//         label: 'WebXR',
//         name: 'webxr',
//         checked: false,
//     },
// ]

export const termsOfUseList = [
    {
        label: '재판매 가능',
        name: 'resaleAllowed',
        checked: false,
    },
    {
        label: '수익화 가능',
        name: 'commercialAllowed',
        checked: false,
    },
]

export const licenseTypes = [
    {
        code: 0,
        label: '복제권',
        name: 'reproduction',
        checked: false,
    },
    {
        code: 1,
        label: '공연권',
        name: 'performance',
        checked: false,
    },
    {
        code: 2,
        label: '공중송신권',
        name: 'publicTransmission',
        checked: false,
    },
    {
        code: 3,
        label: '배포권',
        name: 'derivative',
        checked: false,
    },
    {
        code: 4,
        label: '대여권',
        name: 'rental',
        checked: false,
    },
    {
        code: 5,
        label: '2차적저작물작성권',
        name: 'distribution',
        checked: false,
    },
    {
        code: 6,
        label: '전시권',
        name: 'exhibition',
        checked: false,
    },
]

function SideFilter() {
    const [platformsList, setPlatformsList] = useState([])
    const { platforms } = useAssetCtx()
    const { getPlatformList } = useAsset()

    const { transformedCheckboxGroup: termsOfUseItems } = useCheckboxGroup(termsOfUseList)
    const { transformedCheckboxGroup: licenseTypeItems } = useCheckboxGroup(licenseTypes)

    const [initialFilterFormState, setInitialFilterFormState] = useState({
        termsOfUseItems,
        licenseTypeItems,
    })
    useEffect(() => {
        const initialFormTimer = setTimeout(() => {
            if (platforms) {
                const tempArr = []
                platforms.forEach((platform) => {
                    tempArr.push({
                        label: platform.name,
                        name: platform.id.toString(),
                        checked: false,
                    })
                })
                setPlatformsList(tempArr)
                const { transformedCheckboxGroup: platformItems } =
                    useCheckboxGroup(tempArr)
                setInitialFilterFormState((prev) => ({ ...prev, platformItems }))
            }
        }, 500)
        return () => clearTimeout(initialFormTimer)
    }, [platforms])

    const { getCheckedList } = useCheckbox()
    const { formState, formDispatch, createInitFormPayload } =
        useForm(initialFilterFormState)
    const [searchedTags, setSearchedTags] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const { getAssets } = useAsset()
    const { getAssetsPayload, setGetAssetsPayload } = useAssetCtx()
    const [filterData, setFilterData] = useState({
        flatFormItems: platformsList,
        termsOfUseList: termsOfUseList,
        licenseTypes: licenseTypes,
    })

    async function handleSubmit(e) {
        e.preventDefault()
        getAssets({ ...getAssetsPayload, page: 0 })
    }
    const handleSearch = () => {
        if (searchWord.trim() !== '') {
            setSearchedTags([...searchedTags, searchWord.trim()])
            setSearchWord('') // Clear the input field after saving the word
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch()
        }
    }

    const removeTagFormList = (e, idx) => {
        e.preventDefault()
        setSearchedTags(searchedTags.filter((element, index) => index !== idx))
    }

    function checkedLicenseTypesToString(array) {
        let result = ''
        array?.forEach((element, index) => {
            if (index === 0) {
                result += element?.item?.code + 1
            } else {
                result += ',' + (element?.item?.code + 1)
            }
        })
        return result
    }

    function searchedTagsToString(array) {
        let result = ''
        array?.forEach((element, index) => {
            if (index === 0) {
                result += element
            } else {
                result += ',' + element
            }
        })
        return result
    }

    function checkedPlatformTypesToString(array) {
        let result = ''
        array?.forEach((element, index) => {
            if (index === 0) {
                result +=
                    element?.item?.name.charAt(0).toUpperCase() +
                    element?.item?.name.slice(1)
            } else {
                result +=
                    ',' +
                    (element?.item?.name.charAt(0).toUpperCase() +
                        element?.item?.name.slice(1))
            }
        })

        if (result.includes('Webxr')) {
            return result.replace('Webxr', 'WebXR')
        }

        return result
    }

    function checkedTermsOfUseToString(array) {
        let result = {
            isCommercialAllowed: '',
            isResaleAllowed: '',
        }
        array?.forEach((element) => {
            if (element?.item?.name === 'resaleAllowed') {
                result = {
                    ...result,
                    isResaleAllowed: 'true',
                }
            } else if (element?.item?.name === 'commercialAllowed') {
                result = {
                    ...result,
                    isCommercialAllowed: 'true',
                }
            }
        })
        return result
    }

    function resetFilter() {
        setSearchedTags([])
        setSearchWord('')
        const initFormState = createInitFormPayload(initialFilterFormState)
        formDispatch({
            type: 'INIT_FORM_STATE',
            payload: initFormState,
        })
        setFilterData({
            flatFormItems: platformsList.map((item) => ({
                ...item,
                checked: false,
            })),
            termsOfUseList: termsOfUseList.map((item) => ({
                ...item,
                checked: false,
            })),
            licenseTypes: licenseTypes.map((item) => ({
                ...item,
                checked: false,
            })),
        })
    }

    useEffect(() => {
        const checkedLicenseTypes = getCheckedList(formState.licenseTypeItems)
        const checkedPlatformTypes = getCheckedList(formState.platformItems)
        const checkedTermsOfUse = getCheckedList(formState.termsOfUseItems)
        const licenseTypeString = checkedLicenseTypesToString(checkedLicenseTypes)
        const platformTypeString = checkedPlatformTypesToString(checkedPlatformTypes)
        const termsOfUseObject = checkedTermsOfUseToString(checkedTermsOfUse)
        const searchedTagsString = searchedTagsToString(searchedTags)
        setGetAssetsPayload((prev) => ({
            ...prev,
            ...termsOfUseObject,
            copyrightType: licenseTypeString,
            tags: searchedTagsString,
            type: platformTypeString,
        }))
    }, [formState, searchedTags])

    useEffect(() => {
        getPlatformList()
    }, [])

    return (
        <FilterForm>
            <div className="w-full flex justify-end">
                <div
                    onClick={() => resetFilter()}
                    className="text-end cursor-pointer text-accent border-solid border-2 py-1 px-2 rounded-full"
                >
                    필터 리셋
                </div>
            </div>
            <FormRow>
                <Label className="mb-2 text-md">사용플랫폼</Label>
                <CheckboxGroup
                    groupName="platformItems"
                    className="flex sm:flex-row flex-col gap-2 whitespace-nowrap"
                >
                    {platformsList &&
                        platformsList?.map((flatform, idx) => (
                            <CheckBoxForFilter
                                key={'flatform-group-' + idx}
                                name={flatform.name}
                                label={flatform.label}
                                checked={
                                    formState?.platformItems?.[flatform.name]?.value !==
                                    'false'
                                    // flatform.checked
                                }
                                item={flatform}
                            />
                        ))}
                </CheckboxGroup>
            </FormRow>
            <FormRow>
                <Label className="text-md">태그</Label>
                <Flex gap={1} className="mt-2" wrap={'true'}>
                    {searchedTags.length > 0 &&
                        searchedTags.map((tag, idx) => (
                            <OutlineTag key={'tag-' + idx}>
                                <span>{tag}</span>
                                <CloseBtn onClick={(e) => removeTagFormList(e, idx)} />
                            </OutlineTag>
                        ))}
                </Flex>
                <div className="relative mt-4">
                    <SearchInput
                        type="search"
                        placeholder="태그검색…"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <span
                        className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl"
                        onClick={handleSearch}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            className="fill-jacarta-500 h-4 w-4 dark:fill-white"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                        </svg>
                    </span>
                </div>
            </FormRow>
            <FormRow>
                <Label className="mb-2 text-md">이용조건</Label>
                <CheckboxGroup groupName="termsOfUseItems" flexdirection="column">
                    {filterData?.termsOfUseList.map((term, idx) => (
                        <CheckBoxForFilter
                            key={'termsOfUse-group-' + idx}
                            name={term.name}
                            label={term.label}
                            checked={
                                formState?.termsOfUseItems?.[term.name]?.value !== 'false'
                                // ||
                                // term.checked
                            }
                            item={term}
                        />
                    ))}
                </CheckboxGroup>
            </FormRow>
            <FormRow>
                <Label className="mb-2 text-md">이용허락권 종류</Label>
                <CheckboxGroup
                    groupName="licenseTypeItems"
                    className="flex sm:flex-row flex-col gap-2 whitespace-nowrap"
                >
                    {filterData?.licenseTypes.map((licenseType, idx) => (
                        <CheckBoxForFilter
                            key={'license-group-' + idx}
                            name={licenseType.name}
                            label={licenseType.label}
                            checked={
                                formState?.licenseTypeItems?.[licenseType.name]?.value !==
                                'false'
                                // licenseType.checked
                                // ||
                            }
                            item={licenseType}
                        />
                    ))}
                </CheckboxGroup>
            </FormRow>
            <FormRow>
                <Button onClick={handleSubmit}>filter</Button>
            </FormRow>
        </FilterForm>
    )
}

const FilterForm = tw.form`
    w-full
    h-auto
    p-4
`

export default SideFilter
