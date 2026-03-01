import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import images from '../galleryData.json';
import './StoreView.css';

function StoreView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detailRef = useRef(null);
  const [isRevolution, setIsRevolution] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [layout, setLayout] = useState('linear-h');

  // NEU: Die toggle-Logik vor dem currentImage
  const toggleArea = (mode) => {
    if (mode === 'teilen') {
      if (showDetails && isRevolution) {
        setShowDetails(false);
      } else {
        setShowDetails(true);
        setIsRevolution(true);
      }
    } else {
      // Normaler Details-Modus (Weißer Button)
      setShowDetails(!showDetails);
      setIsRevolution(false);
    }
  };

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
            {/* ZURÜCK und DETAILS bleiben immer da */}
            <div className="btn-container-vertical">
              <button className="btn-dark" onClick={() => navigate(-1)}>ZURÜCK</button>
              <InfoIcon textKey="zurueck" className="icon-below-left" />
            </div>

            <div className="btn-container-vertical">
              <button className="btn-white" onClick={() => toggleArea('details')}>DETAILS</button>
              <InfoIcon textKey="details" className="icon-below-left" />
            </div>

            {/* NEU: Der TEILEN-Button erscheint NUR bei mehrteiligen Werken */}
            {(currentImage.teile > 1 || (currentImage.teile_status && currentImage.teile_status.length > 1)) && (
              <div className="btn-container-vertical">
                <button className="btn-yellow" onClick={() => toggleArea('teilen')}>TEILEN</button>
                <InfoIcon textKey="teilen" className="icon-below-left" />
              </div>
            )}

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
          <hr className="divider" />
          <div className="gallery-wall">
            <div className={`parts-grid ${layout}`}>
              {currentImage.teile_status && currentImage.teile_status.map(teil => (
                <div key={teil.teil_id} className="framed-part">
                  {/* 1. Das Bild */}
                  <img src={teil.url} alt={`Teil ${teil.teil_id}`} />

                  {/* 2. Dein neuer Code (jetzt harmonisch im selben Rahmen) */}
                  {isRevolution && (
                    <div className="part-info-row">
                      <span className="user-label">
                        {teil.status === 'reserviert'
                          ? `Reserviert für: ${teil.user}`
                          : 'Verfügbar'}
                      </span>
                      <p className="part-price">Preis: {teil.preis || "Nicht definiert"} EUR</p>
                    </div>
                  )}
                </div> // Hier schließt der Rahmen für das einzelne Teil

              ))}
            </div>
            <div className="centered-info-block">
              <InfoIcon textKey="teile_fotos" />
            </div>
          </div>

          <div className="layout-controls">
            {layout !== 'linear-h' && (
              <div className="btn-group">
                <button onClick={() => setLayout('linear-h')}>Linear-H</button>
                <InfoIcon textKey="linear_h" className="icon-below-left" />
              </div>
            )}
            {layout !== 'linear-v' && (
              <div className="btn-group">
                <button onClick={() => setLayout('linear-v')}>Linear-V</button>
                <InfoIcon textKey="linear_v" className="icon-below-left" />
              </div>
            )}
            {layout !== 'quadrat' && (
              <div className="btn-group">
                <button onClick={() => setLayout('quadrat')}>Quadrat</button>
                <InfoIcon textKey="quadrat" className="icon-below-left" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreView;