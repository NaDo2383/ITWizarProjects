import { TbBeach } from 'react-icons/tb'
import { HiOutlineHomeModern } from 'react-icons/hi2'
import { LiaSwimmingPoolSolid } from 'react-icons/lia'
import {
    GiIsland,
    GiPaperWindmill,
    GiCastle,
    GiUndergroundCave,
    GiDesert,
    GiBarn,
    GiCampingTent,
    GiBoatFishing,
} from 'react-icons/gi'
import { FaPersonSkiing } from 'react-icons/fa6'
import { FaRegSnowflake } from 'react-icons/fa'
import { SiInfluxdb } from 'react-icons/si'
import { IconType } from 'react-icons'

export interface IFilterMenu {
    icon: IconType
    label: string
    selected?: boolean
}

export const filterMenus: IFilterMenu[] = [
    {
        icon: TbBeach,
        label: 'Beach',
        selected: false,
    },
    {
        icon: GiPaperWindmill,
        label: 'Windmills',
        selected: false,
    },
    {
        icon: HiOutlineHomeModern,
        label: 'Modern',
        selected: false,
    },
    {
        icon: LiaSwimmingPoolSolid,
        label: 'Swimming',
        selected: false,
    },
    {
        icon: GiIsland,
        label: 'Island',
        selected: false,
    },
    {
        icon: GiBoatFishing,
        label: 'Fishing',
        selected: false,
    },
    {
        icon: FaPersonSkiing,
        label: 'Skiing',
        selected: false,
    },
    {
        icon: GiCastle,
        label: 'Castle',
        selected: false,
    },
    {
        icon: GiCampingTent,
        label: 'Camping',
        selected: false,
    },
    {
        icon: FaRegSnowflake,
        label: 'Arctic',
        selected: false,
    },
    {
        icon: GiUndergroundCave,
        label: 'Cave',
        selected: false,
    },
    {
        icon: GiDesert,
        label: 'Desert',
        selected: false,
    },
    {
        icon: GiBarn,
        label: 'Barn',
        selected: false,
    },
    {
        icon: SiInfluxdb,
        label: 'Flux',
        selected: false,
    },
]
