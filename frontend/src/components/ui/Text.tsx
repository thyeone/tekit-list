import { cva, type VariantProps } from 'class-variance-authority';
import { type ElementType, forwardRef } from 'react';
import { Box, type BoxProps } from '@/headless/ui/Box';
import { cn } from '@/libs/cn';
import type { PolymorphicRef } from '@/headless/polymorphics';

export const textVariants = cva('', {
  variants: {
    variant: {
      '12-rg': 'font-normal text-[12px] leading-[18px]',
      '12-md': 'font-medium text-[12px]',
      '12-bd': 'font-bold text-[12px]',
      '13-rg': 'font-normal text-[13px]',
      '13-md': 'font-medium text-[13px]',
      '13-bd': 'font-bold text-[13px]',
      '14-rg': 'font-normal text-[14px]',
      '14-md': 'font-medium text-[14px]',
      '14-bd': 'font-bold text-[14px]',
      '15-rg': 'font-normal text-[15px]',
      '15-md': 'font-medium text-[15px]',
      '15-bd': 'font-bold text-[15px]',
      '16-rg': 'font-normal text-[16px]',
      '16-md': 'font-medium text-[16px]',
      '16-bd': 'font-bold text-[16px]',
      '18-rg': 'font-normal text-[18px]',
      '18-md': 'font-medium text-[18px]',
      '18-bd': 'font-bold text-[18px]',
      '20-rg': 'font-normal text-[20px]',
      '20-md': 'font-medium text-[20px]',
      '20-bd': 'font-bold text-[20px]',
      '24-rg': 'font-normal text-[24px]',
      '24-md': 'font-medium text-[24px]',
      '24-bd': 'font-bold text-[24px]',
      '28-rg': 'font-normal text-[28px]',
      '28-md': 'font-medium text-[28px]',
      '28-bd': 'font-bold text-[28px]',
      '32-rg': 'font-normal text-[32px]',
      '32-md': 'font-medium text-[32px]',
      '32-bd': 'font-bold text-[32px]',
      '40-rg': 'font-normal text-[40px]',
      '40-md': 'font-medium text-[40px]',
      '40-bd': 'font-bold text-[40px]',
    },
  },
});

export type TextProps<C extends ElementType> = VariantProps<
  typeof textVariants
> &
  BoxProps<C>;

export const Text = forwardRef(function Text<C extends ElementType = 'p'>(
  { as, className, variant, ...rest }: BoxProps<C> & TextProps<C>,
  ref?: PolymorphicRef<C>,
) {
  const typesRest = rest as BoxProps<C>;
  return (
    <Box
      className={cn(textVariants({ variant }), className)}
      ref={ref}
      as={as ?? 'p'}
      {...typesRest}
    />
  );
}) as <C extends ElementType = 'p'>(
  props: BoxProps<C> & { ref?: PolymorphicRef<C> } & TextProps<C>,
) => JSX.Element;
