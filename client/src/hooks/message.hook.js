import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback(html => window.M && html && window.M.toast({html}),[])
}