import React from 'react';
import { useParams, Link } from 'react-router-dom';
import images from '../galleryData.json';
import './ListView.css';

function ListView({ showAll = false }) {
  const { id } = useParams();
  
  // Sortierung nach ID (001 bis 200)
  const sortedImages = [...images].sort((a, b) => a.id.localeCompare(b.id));

  // Daten filtern: Entweder alle oder nur das eine Werk
  const displayData = showAll 
    ? sortedImages 
    : images.filter(img => img.id === id);

  return (
    <div className="list-container print-area">
      <header className="list-header">
        <h1>{showAll ? 'Gesamt-Werkverzeichnis / STORE' : 'Werkspezifikation'}</h1>
        <p className="date-stamp">Stand: {new Date().toLocaleDateString('de-DE')}</p>
        <button className="no-print btn-print" onClick={() => window.print()}>Seite drucken / PDF</button>
      </header>

      <table className="excel-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vorschau</th>
            <th>Titel / Details</th>
            <th>Format (Teil A)</th>
            <th>Teile</th>
            <th>Preis</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map(img => (
            <React.Fragment key={img.id}>
              <tr className="main-row">
                <td className="cell-id">{img.id}</td>
                <td className="cell-thumb">
                  {/* Nimmt entweder Haupt-URL oder URL von Teil A */}
                  <img src={img.url || (img.teile_status && img.teile_status[0].url)} alt="thumb" />
                </td>
                <td className="cell-title">
                  <strong>{img.title}</strong>
                  <div className="attr-sub">{img.technik} | {img.ort}</div>
                </td>
                <td>{img.format || 'k.A.'}</td>
                <td>{img.teile || '1'}</td>
                <td className="cell-price">{img.preis} {img.waehrung || 'EUR'}</td>
              </tr>
              
              {/* Wenn es mehrteilig ist und wir die Einzelansicht haben, Teile auflisten */}
              {!showAll && img.teile_status && img.teile_status.map(teil => (
                <tr key={teil.teil_id} className="sub-row">
                  <td colSpan="2" className="text-right">↳ {teil.teil_id}</td>
                  <td colSpan="2">{teil.bezeichnung}</td>
                  <td>Status: {teil.status}</td>
                  <td>{teil.preis} EUR</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      
      <footer className="no-print footer-nav">
        <Link to="/">Zurück zur Galerie</Link>
      </footer>
    </div>
  );
}

export default ListView;