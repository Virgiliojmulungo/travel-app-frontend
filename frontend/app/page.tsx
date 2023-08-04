'use client'
import Image from "next/image"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { fetchData } from "@/utils/api"

type Inputs = {
    searchQuery: string
}

type Countrys = {
    name: string,
    country: string,
    countryCode: string
}

const Home = () => {

    const [data, setData] = useState<Countrys[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    // console.log("data", data)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLoading(true)
        console.log(data)
        fetchData(`http://localhost:8080/api/v1/city/search?q=${data.searchQuery}`)
            .then((res) => {
                console.log(res)
                setData(res)
                setLoading(false)
            })
    }

    const randomString = (length: number): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            randomString += characters.charAt(randomIndex)
        }

        return randomString;
    }


    return (
        // h-[calc(100vh-73.6px)]
        <main className="bg-primary h-[calc(100vh-73.6px)] text-white">
            <div className="main-wrapper pt-12">
                {/* form */}
                <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex justify-between items-center">
                        <label htmlFor="destination" className="block text-8xl align-middle ">
                            Search <br />
                            <span className="text-5xl">for a destination city</span>
                        </label>
                        <Image alt="word" src={'/undraw_world_re_768g.svg'} width={400} height={400} />
                    </div>

                    <div>

                        <div className="mt-12 mb-4 relative">
                            <input
                                type="text"
                                id="destination"
                                className="px-8 py-4 rounded-full text-secondary outline-none w-full"
                                placeholder="Maputo"
                                {...register("searchQuery", { required: true })}
                            />
                            <button type="submit" className="btn bg-primary absolute right-2 top-1/2 -translate-y-1/2 rounded-full">Search</button>
                        </div>

                        <div className="bg-white rounded-[32px] text-secondary overflow-hidden">
                            {
                                data &&
                                data.map(res => (
                                    <div key={randomString(7659)}>
                                        <Link
                                            href={{
                                                pathname: '/city/details',
                                                query: {
                                                    name: `${res.name}`,
                                                    countryCode: `${res.countryCode}`,
                                                    countryName: `${res.country}`
                                                }
                                            }}
                                            className="flex gap-4 py-4 px-8 hover:bg-gray-100 items-start"
                                        >
                                            <Image className="mt-1" alt="location pin" src={'/location-pin-svgrepo-com.svg'} height={30} width={30} />
                                            <div>
                                                <div className="font-semibold">{res.name}</div>
                                                <div className="text-sm">{res.country}</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </form>
                {/* end-form */}
            </div>

            <div role="status" className={`fixed ${!loading ? 'hidden' : ''} top-0 left-0 w-full h-full bg-black bg-opacity-30 items flex justify-center items-center`}>
                <svg aria-hidden="true" className="w-36 h-36 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>

        </main>
    )
}

export default Home