import { Col } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { Label } from './Label'

type TextFieldProps<C extends React.ElementType = 'input' | 'textarea'> =
  React.ComponentProps<C> & {
    as?: C
    error?: string
    label?: string
    required?: boolean
  }
export function TextField<C extends React.ElementType = 'input' | 'textarea'>({
  as = 'input',
  error,
  value,
  label,
  required,
  className,
  ...rest
}: TextFieldProps<C>) {
  const Component = as === 'input' ? 'input' : 'textarea'

  return (
    <Col className={cn('w-full')}>
      {label && <Label required={required}>{label}</Label>}
      <Component
        value={value}
        className={cn(
          'h-44 w-full rounded-xl border border-grey-200 bg-white px-16 py-14 font-normal text-[16px] text-grey-900 transition-all placeholder:text-grey-300 hover:border-grey-300 focus:border-brand-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-grey-50 disabled:text-grey-400',
          {
            'h-[117px] resize-none': as === 'textarea',
            'border-red ring-2 ring-red/10': error,
          },
          className,
        )}
        {...rest}
      />
      {error && (
        <p className="mt-4 font-medium text-[14px] text-red-500">{error}</p>
      )}
    </Col>
  )
}

type FormTextFieldProps<TFieldValues extends FieldValues> = TextFieldProps & {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
}

export function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  error,
  ...rest
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...rest}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={error ?? fieldState.error?.message}
        />
      )}
    />
  )
}
