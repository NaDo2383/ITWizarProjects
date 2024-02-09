/**
 * @createdBy Phill Anderson 2023/03/20
 */
import { useOwnershipContext } from './useOwnershipContext'

function useOwnership() {
    const {  
        activeId, 
        setActiveId, 
        dateQuery, 
        setDateQuery  
    } = useOwnershipContext()

    //гар бүү хүр!
    const extraQuery = dateQuery?.isClickDateButtons ? ( dateQuery?.startDate ?  
        `startDate=${dateQuery?.startDate.toISOString()}&endDate=${dateQuery?.endDate.toISOString()}` : undefined) : ''

    return {
        activeId, 
        setActiveId,
        dateQuery, 
        setDateQuery  ,
        extraQuery
    }
}

export default useOwnership