import ListView from './pages/ListView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GalleryGrid from './pages/GalleryGrid';
import SingleView from './pages/SingleView';
import StoreView from './pages/StoreView';


function App() {
return (
<Router>
<div className="app-shell">
<Routes>
<Route path="/" element={<GalleryGrid />} />
<Route path="/bild/:id" element={<SingleView />} />
<Route path="/store/:id/:thumbIdx" element={<StoreView />} />
<Route path="/liste/:id" element={<ListView showAll={false} />} />
<Route path="/store-liste" element={<ListView showAll={true} />} />
</Routes>
</div>
</Router>
);
}

export default App;