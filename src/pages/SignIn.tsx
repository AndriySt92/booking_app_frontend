import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { signIn } from '../services/authApi'
import { useAppContext } from '../contexts/AppContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, LoadingButton } from '../components'
import { ISignInData } from '../types/userTypes'

const SignIn = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const location = useLocation()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInData>()

  const mutation = useMutation(signIn, {
    onSuccess: async () => {
      showToast({ message: 'Sign in Successful!', type: 'SUCCESS' })
      await queryClient.invalidateQueries('validateToken')
      navigate(location.state?.from?.pathname || '/')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('email', { required: 'This field is required' })}></input>
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}></input>
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{' '}
          <Link className="underline" to="/sign-up">
            Create an account here
          </Link>
        </span>
        {!mutation.isLoading ? (
          <Button
            disabled={mutation.isLoading}
            btnType="submit"
            classes="bg-blue-600 text-white hover:bg-blue-500">
            Sign In
          </Button>
        ) : (
          <LoadingButton classes="bg-blue-600 text-white hover:bg-blue-500">
            Loading...
          </LoadingButton>
        )}
      </span>
    </form>
  )
}

export default SignIn
