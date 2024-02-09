/**
 * @createdBy Phill Anderson 2022/02/27
 */
import { useTransform } from 'framer-motion'
function useParallax( value, distance ) {
   return useTransform(value, [0,1], [-distance, distance])
}

export default useParallax