'use client'
import Image from "next/image"
import BunnerImgUrl from '../../../public/undraw_city_life_gnpr.svg'
import { IconCloud, IconInfoCircle, IconExchange } from "@tabler/icons-react"
import useSWR from 'swr'
import { fetchData } from "@/utils/api"
import { useEffect, useState } from "react"

type Response = {
    gdp: number,
    population: number,
    forecasts: {
        date: string,
        max: number,
        min: number,
    }[],
    conversionRates: any
}

const CityDetailsPage = ({ searchParams }: any) => {
    // console.log(searchParams)

    const [resData, setResData] = useState<Response | null>(null)
    const { data, error } = useSWR(`http://localhost:8080/api/v1/city/detail/?city=${searchParams.name}&countryCode=${searchParams.countryCode}&countryName=${searchParams.countryName}`, fetchData)
    // console.log(data)

    useEffect(() => {
        setResData(data)
    }, [data])

    const celsiusToKelvin = (t: number): string => {
        const k = 273.15
        const s = t - k
        const r = s.toFixed(2)
        return r
    }

    const getDate = (dateString: string): string => {
        const timestamp = parseFloat(dateString)

        const month = ["Jan", "Fev", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Out", "Nov", "Dez"]
        const date = new Date(timestamp)
        return timestamp.toString()
    }

    const getBalanceFotmat = (num: number): string => {
        return (
            num
                .toFixed(2) // always two decimal digits
                .replace('.', ',') // replace decimal point character with ,
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' USD'
        ) // use . as a separator
    }

    const getNumFotmat = (num: number): string => {
        return (
            num
                .toFixed(0) // always two decimal digits
                .replace('.', ',') // replace decimal point character with ,
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        ) // use . as a separator
    }

    // const ferecast[]

    if (!searchParams) return <div>404</div>

    if (!data) return (
        <div role="status" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 items flex justify-center items-center">
            <svg aria-hidden="true" className="w-36 h-36 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )

    return (
        <div>
            <div className="flex justify-center bg-primary">
                <Image src={BunnerImgUrl} alt="bunner" />
            </div>

            <div className="main-wrapper mt-8">

                <div className="p-4 my-4 rounded-2xl">

                    <div className="flex gap-2 mb-8 items-start">
                        <Image className="mt-1" alt="location pin" src={'/location-pin-svgrepo-com.svg'} height={32} width={32} />
                        <div>
                            <div className="text-xl font-semibold">{searchParams.name}</div>
                            <div className="text-[#696969] text-sm">{searchParams.countryName}</div>
                        </div>
                    </div>

                    <div>
                        <div className="flex gap-4">
                            <IconCloud size={100} color="#696969" stroke={1} />
                            <div className="pt-4">
                                <div>Weather</div>
                                <div className="text-4xl">{celsiusToKelvin(resData?.forecasts[0].max || 3)}°C</div>
                            </div>
                        </div>
                        <div className="flex gap-4 overflow-auto pb-4">
                            {resData?.forecasts.map(forecast => (
                                <div key={forecast.date} className="text-sm py-2 px-6 rounded-lg border border-dashed border-border text-center">
                                    {/* <div className="mb-2">{getDate(forecast.date)}</div> */}
                                    <div className="mb-2 text-[#696969] text-[10px]">{forecast.date}</div>
                                    <div className="text-base font-medium">{celsiusToKelvin(forecast.max)}°C</div>
                                    <div className="text-[#696969]">{celsiusToKelvin(forecast.min)}°C</div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-8">

                    <div className="p-4 my-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <IconInfoCircle size={44} color="#696969" stroke={1} />
                            <div>
                                <div className="font-semibold">Other Informations</div>
                                {/* <div className="text-[#696969] text-xs">12-32-4342</div> */}
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-[#696969] text-sm">Current Population</div>
                            <div>{getNumFotmat(resData?.population || 1)}</div>
                        </div>
                        <div>
                            <div className="text-[#696969] text-sm">Gross Domestic Product</div>
                            <div>{getBalanceFotmat(resData?.gdp || 1)}</div>
                        </div>
                    </div>

                    {/* <div className="flex gap-4 p-4 my-4 bg-gray-100 rounded-2xl">
                        <IconUsersGroup size={50} color="#696969" stroke={1} />
                        <div>
                            <div>Currency</div>
                            <div className="text-4xl">23°C</div>
                        </div>
                    </div> */}

                    <div className="p-4 my-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <IconExchange size={44} color="#696969" stroke={1} />
                            <div>
                                <div className="font-semibold">Exchange Rates</div>
                                <div className="text-[#696969] text-xs">12-32-4342</div>
                            </div>
                        </div>

                        <table>
                            <tr>
                                <th>Currency</th>
                                <th>value</th>
                            </tr>
                            <tr>
                                <td>USD</td>
                                <td>{resData?.conversionRates.USD}</td>
                            </tr>
                            <tr>
                                <td>EUR</td>
                                <td>{resData?.conversionRates.EUR}</td>
                            </tr>
                            <tr>
                                <td>ZAR</td>
                                <td>{resData?.conversionRates.ZAR}</td>
                            </tr>
                        </table>
                    </div>

                </div>



                {/* City Details Page {params.id} */}
            </div>

        </div>
    )
}

export default CityDetailsPage