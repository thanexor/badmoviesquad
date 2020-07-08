import { useState, useEffect } from 'react'

export function fetchData(fetchDataFunction, params) {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const d= await fetchDataFunction(params)
      setData(d)
    }
    getData()
  }, [params])

  return data
}