import { useQuery } from "react-query"
import { fetchCurrentUser } from "../services/authApi"

const useGetCurrentUser = () => {
  return useQuery('fetchCurrentUser', fetchCurrentUser, {
    staleTime: Infinity
  })
}

export default useGetCurrentUser