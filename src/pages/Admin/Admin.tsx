import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ResourceManager } from './ResourceManager';
import { resources } from './resources';
import styles from './Admin.module.css';

type Access = 'checking' | 'allowed' | 'denied';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setMessage('That email and password did not work.');
  };

  const sendLink = async () => {
    if (!supabase || !email.trim()) return setMessage('Enter your email first.');
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/admin` },
    });
    setBusy(false);
    // Same answer either way, so the form does not reveal who has an account.
    setMessage(error && error.status !== 400 ? 'Could not send the link. Try again shortly.' : 'If that address has access, a sign-in link is on its way.');
  };

  return (
    <form className={styles.login} onSubmit={signIn}>
      <h1 className="title">Sign in</h1>
      <p className={styles.intro}>For OFWA staff. Access is by invitation.</p>
      <label className="field">
        <span>Email</span>
        <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="field">
        <span>Password</span>
        <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {message && <div className="notice" role="status">{message}</div>}
      <div className={styles.actions}>
        <button type="submit" className="btn btn-brand" disabled={busy || !password}>Sign in</button>
        <button type="button" className="btn btn-line" disabled={busy} onClick={() => void sendLink()}>Email me a link instead</button>
      </div>
    </form>
  );
};

const Admin: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!supabase);
  const [access, setAccess] = useState<Access>('checking');
  const [tab, setTab] = useState(resources[0].key);

  // This page is for staff: keep it out of search results.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setAccess('checking');
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id;
  useEffect(() => {
    if (!supabase || !userId) return;
    let cancelled = false;
    supabase.rpc('is_admin').then(({ data, error }) => {
      if (!cancelled) setAccess(!error && data === true ? 'allowed' : 'denied');
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const signOut = () => void supabase?.auth.signOut();
  const current = resources.find((r) => r.key === tab) ?? resources[0];

  let body: React.ReactNode;
  if (!supabase) {
    body = (
      <div className={styles.login}>
        <h1 className="title">Admin is not connected</h1>
        <p className={styles.intro}>
          Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to connect this site to its Supabase project.
          Setup steps are in <code>supabase/README.md</code>.
        </p>
      </div>
    );
  } else if (!ready) {
    body = <p className={styles.state}>Loading</p>;
  } else if (!session) {
    body = <Login />;
  } else if (access === 'checking') {
    body = <p className={styles.state}>Checking your access</p>;
  } else if (access === 'denied') {
    body = (
      <div className={styles.login}>
        <h1 className="title">No access</h1>
        <p className={styles.intro}>{session.user.email} is not on the OFWA admin list. Ask the site owner to add it.</p>
        <button type="button" className="btn btn-line" onClick={signOut}>Sign out</button>
      </div>
    );
  } else {
    body = (
      <>
        <div className={styles.bar}>
          <div role="group" aria-label="Content" className="filters">
            {resources.map((r) => (
              <button key={r.key} type="button" className="filter" aria-pressed={tab === r.key} onClick={() => setTab(r.key)}>
                {r.label}
              </button>
            ))}
          </div>
          <div className={styles.who}>
            <span>{session.user.email}</span>
            <button type="button" className={styles.icon} aria-label="Sign out" onClick={signOut}><LogOut size={16} /></button>
          </div>
        </div>
        <ResourceManager key={current.key} resource={current} />
      </>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.top}>
          <a href="/" className={styles.back}>OFWA website</a>
          <span className="small-caps">Admin</span>
        </header>
        {body}
      </div>
    </div>
  );
};

export default Admin;
