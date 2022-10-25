import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';

const PopupError = ({isError}) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    Toast.fire({
        icon: 'error',
        title: `Error : ( ${isError} )`,
        color: 'red',
    });
    return <></>;
}

export default dynamic(() => Promise.resolve(PopupError), {ssr: false});