import { useState, useEffect } from 'react'
import countriesService from '../services/country'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      return
    }
    countriesService
      .getByName(name)
      .then((response) => {
        setCountry({ data: { ...response } })
      })
      .catch((e) => {
        if (e.response.data.error === 'not found') {
          setCountry({ data: null })
        } else {
          console.log(e)
        }
      })
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
