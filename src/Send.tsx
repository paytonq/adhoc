import React from 'react';

declare var Peer: any;

interface SendState {
  connectionLink?: string;
  copySuccess: boolean;
  mediaStream?: MediaStream;
}

class Send extends React.Component<{}, SendState> {
  private readonly peer: any;
  private refVideo = React.createRef<HTMLVideoElement>();
  
  public constructor(props: {}) {
    super(props);

    this.peer = new Peer();
    this.state = {
      connectionLink: undefined,
      copySuccess: false
    }
  }

  private generateConnectionLink() {
    this.setState({connectionLink: window.location.href + this.peer.id});
  }

  private copyConnectionLink() {
    if (this.state.connectionLink) {
      navigator.permissions.query({name: "clipboard-write" as PermissionName}).then(result => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.clipboard.writeText(this.state.connectionLink as string).then(() => { 
            this.setState({ copySuccess: true })
            const getUserMedia = navigator.getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia;
            this.peer.on("call", (call: any) => {
              getUserMedia({video: true, audio: true}, (stream) => {
                call.answer(stream); // Answer the call with an A/V stream.
                call.on("stream", (remoteStream: MediaStream) => {
                  if (this.refVideo.current) {
                    this.refVideo.current.srcObject = remoteStream;
                  }
        
                  this.setState({mediaStream: remoteStream});              
              });
              }, function(err) {
                console.log("Failed to get local stream", err);
              });
            });
          });
        }
      });
    }
  }

  public render() {
    return (
    <>
      {!this.state.connectionLink && <button type="button" className="bttn-float bttn-lg bttn-primary" onClick={() => this.generateConnectionLink()}>
        Generate connection link
      </button>}
      {this.state.connectionLink && !this.state.mediaStream && <button type="button" className={!this.state.copySuccess ? "bttn-float bttn-lg bttn-primary" : "bttn-float bttn-lg bttn-success"} onClick={() => this.copyConnectionLink()}>
        { !this.state.copySuccess ? "Click to copy connection link" : "Successfully copied! Awaiting call..." }
      </button>}
      {this.state.mediaStream && (
          <>
            <video ref={this.refVideo} autoPlay={true} loop={true} controls={true}/>
            <br />
          </>
        )}
    </>
    );
  }
}

export default Send;
