/**
 * @createdBy Phill Anderson 2022/11/16
 */

export interface IFlex extends JsxChildren {
    column?: boolean
    gap?: number
    between?: boolean
    className?: string
    center?: ICenterObj
}

export interface ICenterObj {
    x?: boolean
    y?: boolean
}
