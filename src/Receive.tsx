import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AppHeader from './AppHeader';
import Footer from './Footer';

declare var Peer: any;

interface ReceiveParams {
  senderId?: string;
}

interface ReceiveProps extends RouteComponentProps<ReceiveParams> {
}

interface ReceiveState {
  mediaStream?: MediaStream;
}

class Receive extends React.Component<ReceiveProps, ReceiveState> {
  private readonly peer: any;
  private refVideo = React.createRef<HTMLVideoElement>();

  public constructor(props: ReceiveProps) {
    super(props);

    this.peer = new Peer();
    this.state = {};
  }

  private connect() {
    if (this.props.match.params.senderId) {
      const getUserMedia = navigator.getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia;
      getUserMedia({video: true, audio: true}, (stream) => {
        const call = this.peer.call(this.props.match.params.senderId, stream);
        call.on("stream", (remoteStream: MediaStream) => {
          if (this.refVideo.current) {
            this.refVideo.current.srcObject = remoteStream;
          }

          this.setState({mediaStream: remoteStream});       
        });
      }, (err) => {
        console.error('Failed to get local stream', err);
      });
    }
  }

  public render() {
    return (
      <>
        <AppHeader />
        {!this.state.mediaStream && <button type="button" className="bttn-float bttn-lg bttn-primary" onClick={() => this.connect()}>
          Connect
        </button>}
        {this.state.mediaStream && (
          <>
            <video ref={this.refVideo} autoPlay={true} loop={true} controls={true}/>
            <br />
          </>
        )}
        {!this.state.mediaStream && <Footer />}
      </>
    );
  }
}

export default Receive;
