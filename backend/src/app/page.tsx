import Image from 'next/image';

export default function Home() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <header style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--surface-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
        padding: '0 24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="align-center" style={{ gap: '12px' }}>
          <div style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--text-white)',
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}>
            A
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Academix</h3>
            <p className="text-xs" style={{ margin: 0, marginTop: '-2px' }}>Academic Analytics Portal</p>
          </div>
        </div>

        <div className="align-center" style={{ gap: '16px' }}>
          <span className="badge badge-success">System Online</span>
          <span className="badge badge-primary">v1.0.0</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container" style={{ padding: '48px 24px', flex: 1 }}>
        <section style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ marginBottom: '16px', fontSize: '2.5rem' }}>
            College Academic Analytics Portal
          </h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '1.125rem' }}>
            A production-ready Next.js 15 enterprise architecture built for administrators,
            heads of departments, faculty members, and students. Monitor academic performance,
            attendance anomalies, and grade distributions in real-time.
          </p>
        </section>

        {/* Tech Stack Diagnostics */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.5rem' }}>
            Integrated Technology Stack
          </h2>
          <div className="grid-4">
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>Next.js 15</div>
              <p className="text-sm">App Router, SSR/ISR, React 19, and optimized Server Actions architecture.</p>
              <span className="badge badge-primary" style={{ width: 'fit-content', marginTop: 'auto' }}>Active</span>
            </div>
            
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: 'var(--success)', fontSize: '1.5rem', fontWeight: 'bold' }}>PostgreSQL</div>
              <p className="text-sm">Relational storage optimized with multi-table indexes, cascades, and constraints.</p>
              <span className="badge badge-success" style={{ width: 'fit-content', marginTop: 'auto' }}>Ready</span>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: '#8b5cf6', fontSize: '1.5rem', fontWeight: 'bold' }}>Prisma ORM</div>
              <p className="text-sm">Fully-typed schema definitions for relational data mappings and automated migrations.</p>
              <span className="badge" style={{ backgroundColor: '#f5f3ff', color: '#8b5cf6', width: 'fit-content', marginTop: 'auto' }}>Generated</span>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: 'var(--danger)', fontSize: '1.5rem', fontWeight: 'bold' }}>Redis Cache</div>
              <p className="text-sm">High-performance caching layer powered by ioredis for fast metrics rendering.</p>
              <span className="badge badge-danger" style={{ width: 'fit-content', marginTop: 'auto' }}>Configured</span>
            </div>
          </div>
        </section>

        {/* Role Privileges Overview */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Role-Based Architecture</h2>
          <div className="grid-2">
            
            {/* Admin & HOD Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.5rem' }}>👑</span> Administrator & HOD Portal
                </h3>
                <p className="text-sm" style={{ marginTop: '4px' }}>Clearance Weight: 40 (Admin) / 30 (HOD)</p>
              </div>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Institution Control:</strong> Manage departments, courses, faculty, and student registries.</li>
                <li><strong>Advanced Analytics:</strong> View department passing rates, GPA trends, and enrollment ratios.</li>
                <li><strong>Redis Caching:</strong> Complex statistics queries cached to ensure sub-10ms response times.</li>
              </ul>
            </div>

            {/* Faculty & Student Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎓</span> Faculty & Student Portal
                </h3>
                <p className="text-sm" style={{ marginTop: '4px' }}>Clearance Weight: 20 (Faculty) / 10 (Student)</p>
              </div>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Class Management:</strong> Faculty can record daily attendance and submit grades.</li>
                <li><strong>Progress Tracking:</strong> Students access their attendance percent, gpa graphs, and cards.</li>
                <li><strong>Middleware Security:</strong> Route protections and custom context passing.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Scalable Backend Project Structure */}
        <section className="card" style={{ backgroundColor: 'var(--surface)', padding: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Scalable Project Structure</h3>
          <p className="text-sm" style={{ marginBottom: '24px' }}>
            The backend is structured to separate concern layers cleanly, enabling rapid scaling of endpoints:
          </p>
          <div className="grid-3" style={{ fontSize: '0.85rem' }}>
            <div>
              <strong style={{ color: 'var(--primary)' }}>📁 src/config/</strong>
              <p style={{ marginTop: '4px' }}>Environment variables verification (`env.ts`) and role clearance controls (`roles.ts`).</p>
            </div>
            <div>
              <strong style={{ color: 'var(--primary)' }}>📁 src/lib/</strong>
              <p style={{ marginTop: '4px' }}>Singletons for DB (`db.ts`), Cache (`redis.ts`), Cryptography (`auth.ts`), custom error handlers, and payload parsing.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--primary)' }}>📁 src/services/</strong>
              <p style={{ marginTop: '4px' }}>Pure business logic layers (`student`, `faculty`, `hod`, `analytics`) detached from route handlers for testability.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--surface-border)',
        padding: '24px 0',
        textAlign: 'center',
        marginTop: 'auto',
        fontSize: '0.875rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container">
          <p>© 2026 Academix Analytics System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
