export default async function ResultSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
  return <div>Result Slug Page: { slug }</div>;
}
