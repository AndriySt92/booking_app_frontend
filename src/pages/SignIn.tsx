import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, Input, LoadingButton, Text, Title } from '../components'
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
      <Title color="gradient">Welcome Back</Title>

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
        <Text as="span" size="md">
          Not Registered?{' '}
        </Text>
        <Link className="underline" to="/sign-up">
          <Text as="span" size="md">
            Create an account here
          </Text>
        </Link>
      </div>

      <div>
        {!isLoading ? (
          <Button
            type="submit"
            className="w-full justify-center bg-blue-600 text-white hover:bg-blue-500">
            Sign In
          </Button>
        ) : (
          <LoadingButton className="w-full justify-center bg-blue-600 text-white hover:bg-blue-500">
            Loading...
          </LoadingButton>
        )}
      </div>
    </form>
  )
}

export default SignIn
