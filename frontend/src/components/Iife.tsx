export function Iife(props: { children?: () => React.ReactNode }) {
  const { children } = props;
  return <>{children?.()}</>;
}
