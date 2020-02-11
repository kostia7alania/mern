import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) =>{
            setLoading(true)
        try {
            if(body) {
                body = JSON.stringify(body)
            }

            const res = await fetch(url, {method, body, headers})
            const data = await res.json()

            if(!res.ok) {
                throw new Error(data.message || 'Что-то пошло не так с сетью') 
            }

            return data
        } catch(e) {
            setError(e.message)
            throw e
        } finally {
            setLoading(false)
        }
    }, [])
    
    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}