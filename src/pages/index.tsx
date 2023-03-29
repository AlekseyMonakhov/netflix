import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Billboard from '@/components/Billboard';

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


    return (
        <>
            <Navbar/>
            <Billboard/>
        </>
    )
}
