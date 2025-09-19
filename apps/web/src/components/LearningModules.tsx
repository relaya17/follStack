import Link from 'next/link'
import { 
  FileCode, 
  Globe, 
  Database, 
  Server,
  CheckCircle,
  Clock,
  Users,
  Star
} from 'lucide-react'

export function LearningModules() {
  const modules = [
    {
      id: 'html-css',
      title: 'HTML & CSS',
      description: 'יסודות בניית אתרים עם HTML5 ו-CSS3 מתקדם',
      icon: FileCode,
      color: 'from-orange-500 to-red-500',
      duration: '4 שבועות',
      lessons: 24,
      difficulty: 'מתחילים',
      progress: 0,
      topics: ['HTML5 Semantics', 'CSS Grid & Flexbox', 'Responsive Design', 'CSS Animations'],
      features: ['תרגילים אינטראקטיביים', 'פרויקטים מעשיים', 'מבחנים', 'תמיכה בנגישות']
    },
    {
      id: 'javascript',
      title: 'JavaScript',
      description: 'שפת התכנות הפופולרית ביותר בעולם עם ES6+',
      icon: FileCode,
      color: 'from-yellow-500 to-orange-500',
      duration: '6 שבועות',
      lessons: 36,
      difficulty: 'בינוני',
      progress: 0,
      topics: ['ES6+ Features', 'Async/Await', 'DOM Manipulation', 'Event Handling'],
      features: ['עורך קוד חי', 'תרגילים מתקדמים', 'פרויקטים', 'AI Code Review']
    },
    {
      id: 'typescript',
      title: 'TypeScript',
      description: 'JavaScript עם טיפוסים - הכלי החיוני לפיתוח מודרני',
      icon: FileCode,
      color: 'from-blue-500 to-indigo-500',
      duration: '3 שבועות',
      lessons: 18,
      difficulty: 'בינוני',
      progress: 0,
      topics: ['Type System', 'Interfaces', 'Generics', 'Advanced Types'],
      features: ['Type Checking', 'IntelliSense', 'תרגילים מעשיים', 'Integration עם React']
    },
    {
      id: 'react',
      title: 'React',
      description: 'ספריית UI הפופולרית ביותר לבניית ממשקי משתמש',
      icon: Globe,
      color: 'from-cyan-500 to-blue-500',
      duration: '8 שבועות',
      lessons: 48,
      difficulty: 'מתקדם',
      progress: 0,
      topics: ['Components & Props', 'Hooks', 'State Management', 'Routing'],
      features: ['React DevTools', 'Testing', 'Performance', 'Best Practices']
    },
    {
      id: 'nodejs',
      title: 'Node.js',
      description: 'פיתוח Backend עם JavaScript על שרת',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      duration: '6 שבועות',
      lessons: 30,
      difficulty: 'מתקדם',
      progress: 0,
      topics: ['Express.js', 'REST APIs', 'Middleware', 'Authentication'],
      features: ['API Development', 'Database Integration', 'Security', 'Deployment']
    },
    {
      id: 'mongodb',
      title: 'MongoDB',
      description: 'מסד נתונים NoSQL מתקדם לפיתוח Full Stack',
      icon: Database,
      color: 'from-green-600 to-green-800',
      duration: '4 שבועות',
      lessons: 20,
      difficulty: 'בינוני',
      progress: 0,
      topics: ['CRUD Operations', 'Aggregation', 'Indexing', 'Performance'],
      features: ['MongoDB Atlas', 'Mongoose ODM', 'Data Modeling', 'Optimization']
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'מתחילים':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'בינוני':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'מתקדם':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <section className="py-16" aria-labelledby="modules-heading">
      <div className="text-center mb-16">
        <h2 id="modules-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          מודולי הלמידה שלנו
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          מסלול למידה מובנה מהבסיס ועד לפרויקטים מתקדמים
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <div
              key={module.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group"
            >
              {/* Header with gradient */}
              <div className={`h-32 bg-gradient-to-r ${module.color} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 left-4">
                  <h3 className="text-xl font-bold text-white mb-1">{module.title}</h3>
                  <p className="text-white/90 text-sm">{module.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 ml-1" />
                      {module.duration}
                    </div>
                    <div className="flex items-center">
                      <FileCode className="h-4 w-4 ml-1" />
                      {module.lessons} שיעורים
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span>התקדמות</span>
                    <span>{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">נושאים עיקריים:</h4>
                  <div className="flex flex-wrap gap-1">
                    {module.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">תכונות:</h4>
                  <ul className="space-y-1">
                    {module.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="h-3 w-3 text-green-500 ml-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Link
                    href={`/learning/${module.id}`}
                    className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors focus-visible font-medium"
                  >
                    {module.progress > 0 ? 'המשך למידה' : 'התחל למידה'}
                  </Link>
                  <button
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible"
                    aria-label="הוסף למועדפים"
                    title="הוסף למועדפים"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Learning Path */}
      <div className="mt-16 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            מסלול הלמידה המלא
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            התחל מהבסיס ועבור לפרויקטים מתקדמים עם מסלול למידה מובנה
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Users className="h-5 w-5 text-primary-600" />
              <span className="text-gray-700 dark:text-gray-300">1,200+ סטודנטים פעילים</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">95% שיעור השלמה</span>
            </div>
          </div>
          
          <Link
            href="/learning-path"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors focus-visible font-medium"
          >
            צפה במסלול המלא
          </Link>
        </div>
      </div>
    </section>
  )
}
