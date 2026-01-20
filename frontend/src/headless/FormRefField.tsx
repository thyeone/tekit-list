import {
  Controller,
  ControllerFieldState,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';
import React from 'react';
import { cn } from '@/libs/cn';

type FormFieldWrapperProps<T extends FieldValues> = Omit<
  ControllerProps<T>,
  'render'
> & {
  tabIndex?: number;
  className?: string;
  children:
    | ((fieldState: ControllerFieldState) => React.ReactNode)
    | React.ReactNode;
};

export const FormRefField = <T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  children,
  tabIndex = 0,
  className,
}: FormFieldWrapperProps<T>) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <div ref={field.ref} tabIndex={tabIndex} className={cn(className)}>
        {typeof children === 'function' ? children(fieldState) : children}
      </div>
    )}
  />
);
