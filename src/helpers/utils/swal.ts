import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});

export const ToastTimer = (Toast: typeof Swal) => {
    return Toast.fire({
        icon: 'error',
        title: `Opss Something went wrong. Please try again later`,
        color: 'red',});
}