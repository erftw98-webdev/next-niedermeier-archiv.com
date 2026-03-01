import React from 'react';
import { useParams, Link } from 'react-router-dom';
import images from '../galleryData.json';
import './ListView.css';

function ListView({ showAll = false }) {
  const { id } = useParams();
  
  // Sortierung nach ID (001 bis 200)
  const sortedImages = [...images].sort((a, b) => a.id.localeCompare(b.id));

  // Daten filtern: Entweder alle (STORE) oder nur das eine Werk (LISTE)
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
              {/* HAUPTZEILE DES WERKS */}
              <tr className="main-row">
                <td className="cell-id">{img.id}</td>
                <td className="cell-thumb">
                  {/* Nimmt entweder Haupt-URL oder URL von Teil A */}
                  <img src={img.url || (img.teile_status && img.teile_status[0].url)} alt="Vorschau" />
                </td>
                <td className="cell-title">
                  {/* --- DEIN NEUES TITEL & TECHNIK DESIGN --- */}
                  <div style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '2px', textTransform: 'uppercase' }}>
                    {img.title}
                  </div>
                  <div className="attr-sub" style={{ fontWeight: 'normal', fontSize: '0.85rem', color: '#555' }}>
                    {img.technik || "Keine Angabe zur Technik"}
                    {img.ort ? ` | ${img.ort}` : ""}
                  </div>
                  {/* --- ENDE DESIGN --- */}
                </td>
                <td>{img.format || 'k.A.'}</td>
                <td>{img.teile || '1'}</td>
                <td className="cell-price">{img.preis} {img.waehrung || 'EUR'}</td>
              </tr>
              
              {/* TEILE-REVOLUTION: Wenn es mehrteilig ist und wir die Einzelansicht (LISTE) haben */}
              {!showAll && img.teile_status && img.teile_status.map(teil => (
                <tr key={teil.teil_id} className="sub-row">
                  <td className="cell-id" style={{ borderRight: 'none' }}></td>
                  <td className="cell-thumb text-right" style={{ borderLeft: 'none', fontSize: '1.2rem' }}>↳</td>
                  <td colSpan="1">
                    <strong>{teil.bezeichnung || teil.teil_id}</strong>
                  </td>
                  <td>{img.format}</td> {/* Format von Teil A gilt für alle */}
                  <td>Status: <strong>{teil.status}</strong> {teil.user ? `(${teil.user})` : ''}</td>
                  <td className="cell-price">{teil.preis} EUR</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      
      <footer className="no-print footer-nav">
        <Link to="/" style={{ marginRight: '20px' }}>Zurück zur Galerie</Link>
        {!showAll && <Link to="/store-liste">Zur Gesamtliste (STORE)</Link>}
      </footer>
    </div>
  );
}

export default ListView;