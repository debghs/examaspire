import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: false,
  },
};

export default withPayload(nextConfig) 
