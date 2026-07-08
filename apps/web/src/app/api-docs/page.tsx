export default function ApiDocsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white">API Documentation</h1>
      <p className="mb-6 text-slate-600 dark:text-slate-300">
        תיעוד Swagger של ה-backend זמין כשהשרת רץ.
      </p>
      <a
        href={`${apiUrl}/api-docs`}
        className="rounded-xl bg-primary-600 px-5 py-2.5 font-medium text-white hover:bg-primary-700"
        target="_blank"
        rel="noreferrer"
      >
        פתח Swagger
      </a>
      <p className="mt-4 text-sm text-slate-500">
        Health: <a className="underline" href={`${apiUrl}/health`}>{apiUrl}/health</a>
      </p>
    </div>
  )
}
