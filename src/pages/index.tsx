import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "../../hooks/useCurrentUser";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default function Home() {
    const { data: user } = useCurrentUser();


    return (
        <>
            <h1 className={'text-4xl text-green-500'}>
                heloF
            </h1>
            <p className="text-white">Logged in as: {user?.name}</p>
            <button className="h-10 w-full bg-white" onClick={() => signOut()}>Sign Out</button>
        </>
    )
}
