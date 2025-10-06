// @ts-ignore
import Link from 'next/link'
// @ts-ignore
import { Code, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    learning: [
      { name: 'HTML & CSS', href: '/learning/html-css' },
      { name: 'JavaScript', href: '/learning/javascript' },
      { name: 'React', href: '/learning/react' },
      { name: 'Node.js', href: '/learning/nodejs' },
      { name: 'MongoDB', href: '/learning/mongodb' },
    ],
    practice: [
      { name: 'תרגול קוד', href: '/practice' },
      { name: 'מבחנים', href: '/quizzes' },
      { name: 'פרויקטים', href: '/projects' },
      { name: 'AI Mentor', href: '/ai-mentor' },
    ],
    community: [
      { name: 'פורום', href: '/community/forum' },
      { name: 'צ׳אט', href: '/community/chat' },
      { name: 'פרויקטים קבוצתיים', href: '/community/projects' },
      { name: 'Leaderboard', href: '/community/leaderboard' },
    ],
    support: [
      { name: 'עזרה', href: '/help' },
      { name: 'תמיכה טכנית', href: '/support' },
      { name: 'נגישות', href: '/accessibility' },
      { name: 'צור קשר', href: '/contact' },
    ],
  }

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { name: 'Email', href: 'mailto:contact@fullstackhub.com', icon: Mail },
  ]

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link 
              href="/" 
              className="flex items-center space-x-2 rtl:space-x-reverse mb-4 focus-visible"
              aria-label="FullStack Learning Hub - דף הבית"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">FullStack Learning Hub</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              פלטפורמה אינטראקטיבית, שיתופית וחדשנית ללמידת Full Stack Development. 
              למד, תרגל, בנה פרויקטים וצור קשרים עם קהילת מפתחים.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors focus-visible"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Learning Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">למידה</h3>
            <ul className="space-y-2">
              {footerLinks.learning.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors focus-visible"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">תרגול</h3>
            <ul className="space-y-2">
              {footerLinks.practice.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors focus-visible"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">קהילה ותמיכה</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors focus-visible"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors focus-visible"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} FullStack Learning Hub. כל הזכויות שמורות.
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors focus-visible"
              >
                מדיניות פרטיות
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors focus-visible"
              >
                תנאי שימוש
              </Link>
              <Link
                href="/accessibility"
                className="text-gray-400 hover:text-white transition-colors focus-visible"
              >
                נגישות
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
