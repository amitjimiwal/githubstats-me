export default function Page({ params }: { params: { name: string } }) {
  return <div>My Username: {params.name}</div>;
}
