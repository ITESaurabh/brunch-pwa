import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types';
import { APP_NAME } from '../config/constants';

export default function SEO({ description, title, siteTitle }) {
  return (
    <Helmet
      title={title}
      titleTemplate={siteTitle ? `%s | ${siteTitle}` : null}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: 'ITESaurabh',
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]}
    />
  )
}

SEO.propTypes = {
    title: PropTypes.string.isRequired,
    siteTitle: PropTypes.string,
    description: PropTypes.string,
};

SEO.defaultProps = {
    title: APP_NAME,
    siteTitle: 'Brunch PWA v2',
    description: 'A PWA to easily update brunch and install add-ons'
}