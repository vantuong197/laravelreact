

const useDebounce = () =>{
    const debounce = (func:any, timeout:number = 300) =>{
        let timer:any;
        return (...args:any) =>{
            clearTimeout(timer);
            timer = setTimeout(() =>{
                func.apply(this, args)
            }, timeout)
        }
    }

    return {debounce}
}

export default useDebounce;