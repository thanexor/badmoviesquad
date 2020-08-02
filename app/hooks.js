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

export function useFetchedDatum(fetchDataFunction, params) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const getData = useCallback(async () => {
      setLoading(true)
      const d = await fetchDataFunction(params)
      setData(d)
      setLoading(false)
    }, [fetchDataFunction, params, setData])

  useEffect(() => {
    getData()
  }, [params])

  return [ data, getData, loading ]
}