import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * API route to handle revalidation requests from Payload CMS
 * This runs in the proper Next.js context where revalidatePath and revalidateTag are supported
 */
export async function POST(request: NextRequest) {
  try {
    const { paths = [], tags = [], secret } = await request.json()

    // Verify secret to prevent unauthorized revalidation
    const expectedSecret = process.env.REVALIDATE_SECRET
    if (secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, message: 'Invalid revalidation secret' },
        { status: 401 },
      )
    }

    // Revalidate all provided paths
    if (Array.isArray(paths) && paths.length > 0) {
      paths.forEach((path) => {
        console.log(`Revalidating path: ${path}`)
        revalidatePath(path)
      })
    }

    // Revalidate all provided tags
    if (Array.isArray(tags) && tags.length > 0) {
      tags.forEach((tag) => {
        console.log(`Revalidating tag: ${tag}`)
        revalidateTag(tag)
      })
    }

    return NextResponse.json({
      success: true,
      revalidated: {
        paths: paths || [],
        tags: tags || [],
      },
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)

    return NextResponse.json(
      { success: false, message: 'Error revalidating content' },
      { status: 500 },
    )
  }
}
