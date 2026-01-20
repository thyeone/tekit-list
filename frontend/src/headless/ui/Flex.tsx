import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import type {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../polymorphics';

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    center: {
      true: 'justify-center items-center',
    },
    wrap: {
      true: 'flex-wrap',
    },
  },
  defaultVariants: {
    direction: 'row',
  },
});

export type FlexProps<C extends React.ElementType = 'div'> =
  PolymorphicComponentProps<C> & {
    component?: C;
    asChild?: boolean;
    gap?: number;
    direction?: 'row' | 'col';
    center?: boolean;
    align?: 'start' | 'center' | 'end';
    justify?: 'start' | 'center' | 'end' | 'between';
    wrap?: boolean;
    flex?: number;
  };

const FlexComponent = <C extends React.ElementType = 'div'>(
  {
    as,
    component,
    asChild,
    children,
    className,
    direction = 'row',
    center,
    align,
    justify,
    gap,
    wrap,
    flex,
    ...props
  }: FlexProps<C>,
  ref: PolymorphicRef<C>,
) => {
  const Element = component ?? as ?? 'div';

  const componentProps = {
    ...(as === 'button' && { type: 'button' }),
    style: { gap, flex },
    className: flexVariants({
      direction,
      align,
      justify,
      center,
      wrap,
      className,
    }),
    ref,
    ...props,
  };

  if (asChild) {
    return (
      <Slot {...(componentProps as React.HTMLAttributes<HTMLElement>)}>
        {children}
      </Slot>
    );
  }

  return React.createElement(Element, componentProps, children);
};

export const Flex = forwardRef(FlexComponent) as <
  C extends React.ElementType = 'div',
>(
  props: FlexProps<C> & { ref?: PolymorphicRef<C> },
) => JSX.Element;

export const Col = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: FlexProps<C>,
    ref: PolymorphicRef<C>,
  ) => <Flex {...props} direction="col" ref={ref} />,
) as <C extends React.ElementType = 'div'>(
  props: FlexProps<C> & { ref?: PolymorphicRef<C> },
) => JSX.Element;

export const Row = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: FlexProps<C>,
    ref: PolymorphicRef<C>,
  ) => <Flex {...props} direction="row" ref={ref} />,
) as <C extends React.ElementType = 'div'>(
  props: FlexProps<C> & { ref?: PolymorphicRef<C> },
) => JSX.Element;
