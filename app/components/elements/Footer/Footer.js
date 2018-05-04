import React, { Fragment } from 'react';

class Footer extends React.Component {
  render() {
    return (
      <Fragment>
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                This <strong>React Boilerplate</strong> by <strong> <a href="http://allenroyston.com/">Allen Royston</a></strong>.                
              </p>
              <p><small>- Simple is better -</small></p>
            </div>
          </div>
        </footer>
      </Fragment>
    )
  }
}

export default Footer;
