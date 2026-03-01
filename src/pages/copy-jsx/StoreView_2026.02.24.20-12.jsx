import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import images from '../galleryData.json';
import './StoreView.css';

function StoreView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detailRef = useRef(null);

  const [showDetails, setShowDetails] = useState(false);
  const [layout, setLayout] = useState('linear-h');

  const currentImage = images.find(img => img.id === id);

  useEffect(() => {
    if (showDetails && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showDetails]);

  if (!currentImage) return <div className="error-msg">Werk nicht gefunden.</div>;

  const infoTexts = {
    titelfoto: `Das ist das Ausstellungsfoto von **${currentImage.title}**. Es ist hier das **Titelfoto** der Arbeit.`,
    store: `Klick hier, du siehst die **Liste aller angebotenen Arbeiten** hier im **STORE**.`,
    zurueck: `Klick hier, du siehst dein **letztes Foto** aus der Startseiten-Galerie.`,
    details: `Klick hier, du siehst den **unteren Teil** dieser Seite. Das sind Einzelheiten von **${currentImage.title}**.`,
    teilen: `Klick hier, du siehst im unteren Teil dieser Seite **alle Teile** von **${currentImage.title}**.`,
    kaufen: `Klick hier, damit legst du **${currentImage.title}** in den Warenkorb. Dort kannst du es für **${currentImage.preis} ${currentImage.waehrung || 'EUR'}** kaufen.`,
    commerce_min: `Hier siehst du aktuell die **minimale Commerce-Info** von **${currentImage.title}**. Wenn du auf **Liste** klickst, zeige ich dir die **komplette Info**.`,
    liste: `Klick hier, damit siehst du die **komplette Commerce-Struktur** von **${currentImage.title}**. Du kannst sie ausdrucken oder bookmarken.`,
    linear_v: `Klick hier, und die Teile von **${currentImage.title}** werden in einer **vertikalen Linie** angeordnet.`,
    linear_h: `Klick hier, und die Teile von **${currentImage.title}** werden in einer **horizontalen Linie** angeordnet.`,
    quadrat: `Klick hier, und die Teile von **${currentImage.title}** werden im **Quadrat** angeordnet (2x2).`,
    teile_fotos: `Hier siehst du alle **${currentImage.teile || currentImage.teile_status?.length || '4'}** Teile von **${currentImage.title}**.`
  };

  const InfoIcon = ({ textKey, className = "" }) => {
    const rawText = infoTexts[textKey] || "Info folgt...";
    const formattedText = rawText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return (
      <div className={`info-wrapper ${className}`}>
        <span className="info-icon">i</span>
        <div className="tooltip-box">
          <span dangerouslySetInnerHTML={{ __html: formattedText }} />
          <div className="tooltip-arrow"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="store-page">
      <div className="store-upper-section">

        {/* LINKS: Hauptbild */}
        <div className="store-image-left">
          <div className="image-rel-container">
            <img src={currentImage.url} alt={currentImage.title} className="main-store-img" />
            <InfoIcon textKey="titelfoto" className="icon-on-image-bottom" />
          </div>
        </div>

        {/* RECHTS: Informationen */}
        <div className="store-info-right">
          <h2 className="main-work-title-big">{currentImage.title}</h2>

          {/* Commerce-Liste */}
          <div className="commerce-list-container">
            <div className="commerce-row">
              <span className="comm-label">1. Titel</span>
              <span className="comm-value">{currentImage.title}</span>
            </div>
            <div className="commerce-row">
              <span className="comm-label">3. Jahr</span>
              <span className="comm-value">{currentImage.jahr}</span>
            </div>
            <div className="commerce-row">
              <span className="comm-label">4. Preis</span>
              <span className="comm-value">{currentImage.preis} {currentImage.waehrung || 'EUR'}</span>
            </div>
            <div className="commerce-row">
              <span className="comm-label">5. Teile</span>
              <span className="comm-value">{currentImage.teile || '4'}</span>
            </div>
            <InfoIcon textKey="commerce_min" className="icon-below-left" />
          </div>

          {/* Navigations-Reihe (STORE / LISTE) */}
          <div className="brand-nav-row">
            <div className="brand-left">
              <span className="brand-text" style={{ cursor: 'pointer' }} onClick={() => navigate('/store-liste')}>
                STORE
              </span>
              <InfoIcon textKey="store" className="icon-below-left" />
            </div>

            <div className="brand-right">
              <button className="btn-list-link" onClick={() => navigate(`/liste/${currentImage.id}`)}>
                LISTE
              </button>
              <InfoIcon textKey="liste" className="icon-below-left" />
            </div>
          </div>

          {/* Aktions-Buttons */}
          <div className="action-buttons">
            <div className="btn-container-vertical">
              <button className="btn-dark" onClick={() => navigate(-1)}>ZURÜCK</button>
              <InfoIcon textKey="zurueck" className="icon-below-left" />
            </div>
            <div className="btn-container-vertical">
              <button className="btn-white" onClick={() => setShowDetails(!showDetails)}>DETAILS</button>
              <InfoIcon textKey="details" className="icon-below-left" />
            </div>
            <div className="btn-container-vertical">
              <button className="btn-yellow">TEILEN</button>
              <InfoIcon textKey="teilen" className="icon-below-left" />
            </div>
            <div className="btn-container-vertical green-grow">
              <button className="btn-green">KAUFEN</button>
              <InfoIcon textKey="kaufen" className="icon-below-left" />
            </div>
          </div>
        </div> {/* Ende store-info-right */}
      </div> {/* Ende store-upper-section */}

      {/* UNTERER TEIL (Details) */}
      {showDetails && (
        <div className="store-detail-area" ref={detailRef}>
          {/* Anforderung 2: Dynamische Überschrift mittig über den Bildern */}
          <h2 style={{ textAlign: 'center', marginBottom: '30px', textTransform: 'uppercase' }}>
            {layout === 'quadrat' ? 'Teile-Revolution' : 'Details'}
          </h2>

          <hr className="divider" />

          <div className={`gallery-wall ${layout}`}>
            {currentImage.teile_status && currentImage.teile_status.map((teil, index) => (
              <div key={teil.teil_id} className="framed-part-wrapper">

                <div className="framed-part">
                  <img src={teil.url} alt={teil.teil_id} />
                </div>

                {/* Anforderung 3a & 3b: Texte UNTER (Quadrat/H) oder RECHTS (V) */}
                <div className="part-info-text">
                  <div className="user-status-row">
                    <strong>{teil.status === 'reserviert' ? 'Reserviert' : 'Verfügbar'}</strong>
                    {teil.user && <span className="user-id"> für {teil.user}</span>}
                  </div>

                  {/* Anforderung 5: Info-Icon mit spezifischem Inhalt */}
                  <InfoIcon
                    customText={`
                1. Name: ${teil.bezeichnung || teil.teil_id} 
                2. Status: ${teil.status}
                3. Preis: ${teil.preis || '175'} EUR
                4. User: ${teil.user || 'Keiner'}
              `}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreView;