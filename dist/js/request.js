'use strict'

const getRegion = async (region) => {

  const respons = await fetch(`http://restcountries.eu/rest/v2/region/${region}`)

  if (respons.status === 200) {
    const data = await respons.json()
    return data[Math.floor(Math.random() * data.length)]
  } else {
    throw new Error('Could not fetch capital')
  }
}

const getWorld = async () => {
  const respons = await fetch('https://restcountries.eu/rest/v2/all')

  if (respons.status === 200) {
    const data = await respons.json()
    return data[Math.floor(Math.random() * data.length)]
  } else {
    throw new Error('Could not fetch capital')
  }
}



















































