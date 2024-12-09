import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, Input, LoadingButton } from '../components'
import { ISignInData } from '../types/userTypes'
import { useSignIn } from '../hooks'

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInData>({
    mode: 'onBlur',
  })

  const { mutate, isLoading } = useSignIn()

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <form
      className="flex flex-col m-auto gap-5 max-w-lg w-full custom-shadow-rounded p-8"
      onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      <Input
        register={register}
        placeholder="Enter your email"
        name="email"
        label="Email"
        type="email"
        error={errors.email?.message}
        validation={{
          required: 'This field is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
      />

      <Input
        register={register}
        placeholder="Enter your password"
        name="password"
        label="Password"
        type="password"
        error={errors.password?.message}
        validation={{
          required: 'This field is required',
          minLength: {
            value: 6,
            message: 'Minimum number of symbols is 6',
          },
        }}
      />

      <div className="sm:text-lg">
        Not Registered?{' '}
        <Link className="underline" to="/sign-up">
          Create an account here
        </Link>
      </div>
      
      <div>
        {!isLoading ? (
          <Button
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
