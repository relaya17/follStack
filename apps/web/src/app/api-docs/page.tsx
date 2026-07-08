export default function ApiDocsPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white">API Documentation</h1>
      <p className="mb-6 text-slate-600 dark:text-slate-300">
        שירות ה-API עדיין לא מחובר בסביבה הנוכחית. כשה-backend יעלה מחדש, התיעוד יופיע כאן.
      </p>
      <a
        href="/learning"
        className="rounded-xl bg-primary-600 px-5 py-2.5 font-medium text-white hover:bg-primary-700"
      >
        חזרה ללמידה
      </a>
    </div>
  )
}
