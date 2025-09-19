console.log('🚀 Starting Full Stack Learning Hub API...');

const http = require('http');
const url = require('url');

// נתונים פשוטים (במקום מסד נתונים)
let users = [
  { id: 1, name: 'משתמש ראשון', email: 'user1@example.com', role: 'student' },
  { id: 2, name: 'משתמש שני', email: 'user2@example.com', role: 'teacher' }
];

let courses = [
  { id: 1, title: 'JavaScript Basics', description: 'לימוד JavaScript בסיסי', students: 25, subject: 'Frontend', level: 'Beginner' },
  { id: 2, title: 'React Development', description: 'פיתוח עם React', students: 18, subject: 'Frontend', level: 'Intermediate' },
  { id: 3, title: 'Node.js Backend', description: 'פיתוח Backend עם Node.js', students: 12, subject: 'Backend', level: 'Intermediate' },
  { id: 4, title: 'Python Programming', description: 'לימוד תכנות Python', students: 32, subject: 'Programming', level: 'Beginner' },
  { id: 5, title: 'Database Design', description: 'עיצוב מסדי נתונים', students: 15, subject: 'Database', level: 'Intermediate' },
  { id: 6, title: 'Machine Learning', description: 'למידת מכונה עם Python', students: 8, subject: 'AI/ML', level: 'Advanced' },
  { id: 7, title: 'Web Security', description: 'אבטחת אתרים ואפליקציות', students: 22, subject: 'Security', level: 'Intermediate' },
  { id: 8, title: 'DevOps Fundamentals', description: 'יסודות DevOps', students: 19, subject: 'DevOps', level: 'Intermediate' },
  { id: 9, title: 'Mobile Development', description: 'פיתוח אפליקציות מובייל', students: 14, subject: 'Mobile', level: 'Advanced' },
  { id: 10, title: 'UI/UX Design', description: 'עיצוב ממשק משתמש', students: 28, subject: 'Design', level: 'Beginner' }
];

let subjects = [
  { id: 1, name: 'Frontend', courses: 2, students: 43 },
  { id: 2, name: 'Backend', courses: 1, students: 12 },
  { id: 3, name: 'Programming', courses: 1, students: 32 },
  { id: 4, name: 'Database', courses: 1, students: 15 },
  { id: 5, name: 'AI/ML', courses: 1, students: 8 },
  { id: 6, name: 'Security', courses: 1, students: 22 },
  { id: 7, name: 'DevOps', courses: 1, students: 19 },
  { id: 8, name: 'Mobile', courses: 1, students: 14 },
  { id: 9, name: 'Design', courses: 1, students: 28 }
];

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  console.log(`${method} ${path}`);

  // Routes
  if (path === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: '🎓 FullStack Learning Hub API',
      status: 'running',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        users: '/api/users',
        courses: '/api/courses',
        subjects: '/api/subjects',
        stats: '/api/stats'
      }
    }));
  }
  
  else if (path === '/health' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      message: 'API is healthy!',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }));
  }
  
  else if (path === '/api/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      data: users,
      count: users.length
    }));
  }
  
  else if (path === '/api/users' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const newUser = JSON.parse(body);
        newUser.id = users.length + 1;
        users.push(newUser);
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'User created successfully',
          data: newUser
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid JSON'
        }));
      }
    });
  }
  
  else if (path === '/api/courses' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      data: courses,
      count: courses.length
    }));
  }
  
  else if (path === '/api/subjects' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      data: subjects,
      count: subjects.length
    }));
  }
  
  else if (path.startsWith('/api/users/') && method === 'DELETE') {
    const userId = parseInt(path.split('/')[3]);
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1)[0];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'User deleted successfully',
        data: deletedUser
      }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'User not found'
      }));
    }
  }
  
  else if (path.startsWith('/api/courses/') && method === 'DELETE') {
    const courseId = parseInt(path.split('/')[3]);
    const courseIndex = courses.findIndex(course => course.id === courseId);
    
    if (courseIndex !== -1) {
      const deletedCourse = courses.splice(courseIndex, 1)[0];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Course deleted successfully',
        data: deletedCourse
      }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Course not found'
      }));
    }
  }
  
  else if (path === '/api/stats' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      data: {
        totalUsers: users.length,
        totalCourses: courses.length,
        totalSubjects: subjects.length,
        totalStudents: courses.reduce((sum, course) => sum + course.students, 0),
        serverUptime: Math.floor(process.uptime()),
        subjectsBreakdown: subjects.map(subject => ({
          name: subject.name,
          courses: subject.courses,
          students: subject.students
        }))
      }
    }));
  }
  
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: false,
      error: 'Route not found',
      path: path,
      method: method
    }));
  }
});

const PORT = 3060;
server.listen(PORT, () => {
  console.log(`✅ Full API Server running on http://localhost:${PORT}`);
  console.log(`📚 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
  console.log(`📖 Courses API: http://localhost:${PORT}/api/courses`);
  console.log(`📚 Subjects API: http://localhost:${PORT}/api/subjects`);
  console.log(`📊 Stats API: http://localhost:${PORT}/api/stats`);
  console.log(`🏠 Home: http://localhost:${PORT}/`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Full API Server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
