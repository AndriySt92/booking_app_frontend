import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, LoadingButton } from '../components'
import { ISignInData } from '../types/userTypes'
import { useSignIn } from '../hooks'

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInData>()
  const { mutate, isLoading } = useSignIn()

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <form
      className="flex flex-col gap-5 max-w-lg w-full custom-shadow-rounded p-8"
      onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-md sm:text-lg font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('email', { required: 'This field is required' })}></input>
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </label>
      <label className="text-gray-700 text-md sm:text-lg font-bold flex-1">
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
      <div className="text-sm">
        Not Registered?{' '}
        <Link className="underline" to="/sign-up">
          Create an account here
        </Link>
      </div>
      <div>
        {!isLoading ? (
          <Button
            disabled={isLoading}
            btnType="submit"
            classes="w-full justify-center bg-blue-600 text-white hover:bg-blue-500">
            Sign In
          </Button>
        ) : (
          <LoadingButton classes="w-full justify-center bg-blue-600 text-white hover:bg-blue-500">
            Loading...
          </LoadingButton>
        )}
      </div>
    </form>
  )
}

export default SignIn
