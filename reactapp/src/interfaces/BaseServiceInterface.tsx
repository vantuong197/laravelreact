

export interface CheckStateProps {
    [key: number]: boolean
}

export interface FilterProps extends CheckStateProps{
    isAnyChecked: boolean
    checkState: {[key: number]: boolean}
    model:string
}

export interface UpdateStatusByFieldParam {
    id: string, 
    value: boolean, 
    column: string, 
    model: string
}