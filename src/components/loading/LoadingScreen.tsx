import dynamic from "next/dynamic";
import { MoonLoader } from "react-spinners";

const LoadingScreen = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <MoonLoader />
        </div>
    );
}

export default dynamic(() => Promise.resolve(LoadingScreen), {ssr: false});