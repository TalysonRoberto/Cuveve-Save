import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { useBackButton, useStoragePersist } from './hooks';

const Home = lazy(() => import('./pages/Home'));
const SetupList = lazy(() => import('./pages/SetupList'));
const SetupEdit = lazy(() => import('./pages/SetupEdit'));
const TagManager = lazy(() => import('./pages/TagManager'));

function LoadingFallback() {
  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50dvh' }}>
      <div style={{ width: 120, height: 6, borderRadius: 3, background: 'var(--bg-raised)', overflow: 'hidden' }}>
        <div
          style={{
            width: '40%',
            height: '100%',
            borderRadius: 3,
            background: 'var(--accent)',
            animation: 'shimmer 1.2s ease-in-out infinite',
          }}
        />
      </div>
      <style>{`@keyframes shimmer { 0%{transform:translateX(-100%)} 50%{transform:translateX(150%)} 100%{transform:translateX(-100%)} }`}</style>
    </div>
  );
}

export default function App() {
  useStoragePersist();
  useBackButton();

  return (
    <div className="app">
      <div className="bg-blob bg-blob-1" aria-hidden="true" />
      <div className="bg-blob bg-blob-2" aria-hidden="true" />
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setups" element={<SetupList />} />
          <Route path="/setups/novo" element={<SetupEdit />} />
          <Route path="/setups/:id" element={<SetupEdit />} />
          <Route path="/tags" element={<TagManager />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}
