import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SetupList from './pages/SetupList';
import SetupEdit from './pages/SetupEdit';
import TagManager from './pages/TagManager';

export default function App() {
  return (
    <div className="app">
      <div className="bg-blob bg-blob-1" aria-hidden="true" />
      <div className="bg-blob bg-blob-2" aria-hidden="true" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setups" element={<SetupList />} />
        <Route path="/setups/novo" element={<SetupEdit />} />
        <Route path="/setups/:id" element={<SetupEdit />} />
        <Route path="/tags" element={<TagManager />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}
