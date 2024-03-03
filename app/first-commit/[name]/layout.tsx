export default function NameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  return <>{children}</>;
}
