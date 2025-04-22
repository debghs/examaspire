export default async function ExamSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <div>Exam Slug Page: {slug}</div>;
}
