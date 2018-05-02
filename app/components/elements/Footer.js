import React, { Fragment } from 'react';

class Footer extends React.Component {
  render() {
    return (
      <Fragment>
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                This <strong>React Demo</strong> by <strong> <a href="https://allenroyston.com">Allen Royston</a></strong>.                
              </p>
              <blockquite>Simple is better</blockquite>              
            </div>
          </div>
        </footer>
      </Fragment>
    )
  }
}

export default Footer;
