import { useForm } from 'react-hook-form'
import { ISignUpData } from '../types/userTypes'
import { Button, Error, Input, LoadingButton, Text, Title } from '../components'
import { useSignUp } from '../hooks'
import { Link } from 'react-router-dom'

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>({
    mode: 'onBlur',
  })

  const { mutate, isLoading, error } = useSignUp()

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <form
      className="flex flex-col m-auto gap-5 max-w-lg w-full custom-shadow-rounded p-8"
      onSubmit={onSubmit}>
      <Title>Create an Account</Title>
      <div className="flex flex-col md:flex-row gap-5">
        <Input
          register={register}
          placeholder="Enter your first name"
          name="firstName"
          label="First Name"
          error={errors.firstName?.message}
          validation={{
            required: 'This field is required',
            minLength: {
              value: 2,
              message: 'Minimum number of symbols is 2',
            },
          }}
        />
        <Input
          register={register}
          placeholder="Enter your last name"
          name="lastName"
          label="Last Name"
          error={errors.lastName?.message}
          validation={{
            required: 'This field is required',
            minLength: {
              value: 2,
              message: 'Minimum number of symbols is 2',
            },
          }}
        />
      </div>
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

      <Input
        register={register}
        placeholder="Confirm password"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message}
        validation={{
          validate: (val) => {
            if (!val) {
              return 'This field is required'
            } else if (watch('password') !== val) {
              return 'Your passwords do no match'
            }
          },
        }}
      />
      <div className="sm:text-lg">
        <Text as="span" size="md">
          Already have an account?{' '}
        </Text>

        <Link className="underline" to="/sign-in">
          <Text as="span" size="md">
            Sign in here
          </Text>
        </Link>
      </div>
      {error && <Error message={error.message} size="small" />}
      <div>
        {!isLoading ? (
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-500">
            Create Account
          </Button>
        ) : (
          <LoadingButton className="bg-blue-600 text-white hover:bg-blue-500">
            Loading...
          </LoadingButton>
        )}
      </div>
    </form>
  )
}

export default Register
