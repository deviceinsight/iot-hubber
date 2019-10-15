import React, { Component } from 'react';

import { Page, Modal, Header, Button, Notification } from 'components';
import Connector from 'containers/Connector';
import Producer from 'containers/Producer';
import Consumer from 'containers/Consumer';

import { connect, disconnect, produce, getStatusWithMessage, STATUS_CONNECTED } from 'api/api';

class App extends Component {
  state = {
    connected: false,
    lastResponse: '',
    lastResponseStatus: '',
    consuming: false,
    config: {}
  };

  connect = config => {
    this.setState({ config });
    connect(config)
      .then(response => {
        console.log(response);
        const { data } = response;
        if (data.status === STATUS_CONNECTED) {
          this.setState({
            connected: true,
            lastResponse: getStatusWithMessage(response, 'success')
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          connected: false,
          lastResponse: getStatusWithMessage(err.response, 'error')
        });
      });
  };

  disconnect = () => {
    const {
      config: { clientId }
    } = this.state;

    disconnect(clientId).then(response => {
      this.setState({ config: {}, connected: false });
    });
  };

  produce = ({ topic, content }) => {
    const {
      config: { clientId }
    } = this.state;

    return produce({ clientId, topic, content });
  };

  render() {
    const {
      connected,
      lastResponse,
      config: { clientId }
    } = this.state;

    return (
      <div className="App">
        {connected ? (
          <>
            <Header title="Iot Hubber">
              <Button warning onClick={this.disconnect}>
                Disconnect
              </Button>
            </Header>
            <div className="row-1">
              <Page title="Produce Messages">
                <Producer onProduce={this.produce} />
              </Page>
              <Page title="Consume Messages">
                <Consumer clientId={clientId} />
              </Page>
            </div>
          </>
        ) : (
          <Modal title="Connect to your IoT Hub">
            <Connector onConnect={this.connect} />
          </Modal>
        )}
        <Notification type={lastResponse.status} text={lastResponse.message} />
      </div>
    );
  }
}

export default App;
