'use client'
import Link from "next/link"


// const fetcher: Fetcher<User, string> = (id) => getUserById(id)

const HeaderComponent = () => {

    // const { data, error } = useSWR<User, Error>(uid, fetcher);

    return (
        <div className="bg-secondary">
            <div className="flex justify-between main-wrapper py-4 items-center">
                <Link href={'/'} className="text-white text-xl">Já Está Trips</Link>
                {/* <div className="text-white text-lg">Your Atravel Assistance App</div> */}
                <div className="flex gap-4">
                    <Link href={'signin'} className="btn text-primary font-semibold border border-primary rounded-lg">Log in</Link>
                    <Link href={'signup'} className="btn bg-primary font-semibold text-white rounded-lg">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent