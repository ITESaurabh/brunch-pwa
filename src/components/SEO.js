import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types';
import { APP_NAME } from '../config/constants';

export default function SEO({ description, title, siteTitle }) {
  return (
    <Helmet prioritizeSeoTags>
       <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  )
}

SEO.propTypes = {
    title: PropTypes.string.isRequired,
    siteTitle: PropTypes.string,
    description: PropTypes.string,
};

SEO.defaultProps = {
    title: APP_NAME,
    siteTitle: 'Brunch PWA V2',
    description: 'A PWA to easily update brunch and install add-ons'
}