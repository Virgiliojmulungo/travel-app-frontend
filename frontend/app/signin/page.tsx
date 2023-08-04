'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import Image from "next/image"

type Inputs = {
    email: string
    password: string
}

const SigninPage = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }

    return (
        <main className="bg-primary h-[calc(100vh-73.6px)] text-white">

            <div className="pt-12 flex gap-12 justify-center items-center">

                <div className="w-[300px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <h1 className="text-4xl font-semibold mb-4">Log in</h1>

                        <div>
                            <label htmlFor="email" className="block">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="p-4 outline-none rounded-2xl text-secondary w-full"
                                {...register("email", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="password"
                                className="p-4 outline-none rounded-2xl text-secondary w-full"
                                {...register("password", { required: true })}
                            />
                        </div>
                        <button type="submit" className="bg-white text-primary font-semibold rounded-2xl px-8 py-4">Log in</button>
                    </form>
                </div>

                <div>
                    <Image alt="navigation" className="mt-24" src={'/undraw_navigation_re_wxx4.svg'} width={300} height={300} />
                </div>

            </div>
        </main>
    )
}

export default SigninPage