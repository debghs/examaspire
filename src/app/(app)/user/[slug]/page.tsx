export default async function UserSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <div>User Slug Page: { slug }</div>;
}
