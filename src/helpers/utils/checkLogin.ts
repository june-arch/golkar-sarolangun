import { useAppDispatch, useAppSelector } from '@/helpers/redux/hook'
import {
  selectExpirated,
  selectIsLogin,
  selectToken,
  setIsLogin,
  setToken,
} from '@/helpers/redux/slice/auth-admin.slice'

export const useCheckLogin = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(selectIsLogin)
  const token = useAppSelector(selectToken)
  const expirated = useAppSelector(selectExpirated)
  if (!isLogin) {
    return false
  }
  if (!(token && expirated && expirated != 0)) {
    return false
  }

  const now = new Date().getTime()
  const diff = Math.floor((now - expirated) / 1000 / 60)
  if (diff > 60 * 12) {
    dispatch(setIsLogin(false))
    dispatch(setToken(null))
    return false
  }
  return true
}
