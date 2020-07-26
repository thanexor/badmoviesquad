import { useState, useEffect, useCallback } from 'react'

export function useFetchedData(fetchDataFunction, params) {
  const [data, setData] = useState([])

  const getData = useCallback(async () => {
      const d = await fetchDataFunction(params)
      setData(d)
    }, [fetchDataFunction, params, setData])

  useEffect(() => {
    getData()
  }, [params])

  return [ data, getData ]
}

export function useForceUpdate(fetchDataFunction, params) {
  const [data, setData] = useState(0)

  const forceUpdate = () => setData(data + 1)
  return forceUpdate
}