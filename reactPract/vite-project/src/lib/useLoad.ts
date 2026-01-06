import { useRef, useEffect, useState } from 'react'

export const useLoad = (func: any, lastId: string | undefined) => {
    const ref = useRef<HTMLDivElement | null>(null)
    
    const lastIdRef = useRef<string | undefined>('')
    useEffect(() => { lastIdRef.current = lastId }, [lastId])

    useEffect(() => {
        if (!ref.current || !lastIdRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    func(lastIdRef.current)
                }
            }, { threshold: 1 }
        )

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [func])

    return ref
}