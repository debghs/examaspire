import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-bianca-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          {"The page you're looking for doesn't exist or has been moved."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-900 bg-bianca-50 hover:bg-bianca-100 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
}
