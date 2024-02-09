/**
 * @createdBy Phill Anderson 2022/11/16
 */
import { ICenterObj, IFlex } from './_interface'

function checkDirection(column: boolean): string {
    return column ? 'flex-col' : 'flex-row'
}

function checkClassNames(classNames: string): string {
    return classNames
}

function checkCentered(centerObj: ICenterObj): string {
    if (centerObj) {
        if (centerObj.x && centerObj.y) {
            return 'items-center justify-center'
        } else if (centerObj.y) {
            return 'items-center'
        } else if (centerObj.x) {
            return 'justify-center'
        }
    }
    return ''
}

export function checkFlexProps(props: IFlex): string {
    const { column, className, between, center } = props
    const direction = checkDirection(column!)
    const justifyContent = between ? 'justify-between' : ''
    const centered = checkCentered(center!)
    const classNames = checkClassNames(className!)
    const classes = [direction, justifyContent, centered, classNames].join(' ')
    return classes
}
