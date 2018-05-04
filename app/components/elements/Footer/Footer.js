import React, { Fragment } from 'react';

class Footer extends React.Component {
  render() {
    return pug`
      Fragment
        footer.footer
          .container
            .content.has-text-centered
              p
              | This&nbsp;
              strong React Boilerplate&nbsp;
              | created by&nbsp;
              a(href="http://allenroyston.com/") Allen Royston              
    `
  }
}

export default Footer;
