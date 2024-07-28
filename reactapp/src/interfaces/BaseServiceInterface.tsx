

export interface CheckStateProps {
    [key: number]: boolean
}

export interface FilterProps{
    isAnyChecked: boolean
    checkState: {[key: number]: boolean}
    model:string
    handleQueryString: (value:string, field:string) =>void
}

export interface UpdateStatusByFieldParam {
    id: string, 
    value: boolean, 
    column: string, 
    model: string
}