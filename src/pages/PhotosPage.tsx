import React from 'react';
import Masthead from '../newui/Masthead';
import PhotoMosaic from '../newui/PhotoMosaic';
import '../newui/newPortfolio.css';

const PhotosPage: React.FC = () => (
  <div>
    <Masthead />
    <div className="page">
      <PhotoMosaic />
    </div>
    <footer className="site-footer">
      <span>Hana Oh</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  </div>
);

export default PhotosPage;
