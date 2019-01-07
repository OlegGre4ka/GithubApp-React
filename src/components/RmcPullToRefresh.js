import React from "react";
import PullToRefresh from 'rmc-pull-to-refresh';
export default class RmcPullToRefresh extends React.Component {
  state = {
    refreshing: false,
    switchContainer:false
  };
  componentDidMount() {
    // setTimeout(() => { this.setState({ refreshing: true }); }, 10);
    // setTimeout(() => { this.setState({ refreshing: true }); }, 100);
    // setTimeout(() => { this.setState({ refreshing: true }); }, 1500);
    // setTimeout(() => { this.setState({ refreshing: false }); }, 5000);
  }
  render() {
    const { items } = this.props;
    return (
      <div>
        {/* <button
          style={{ display: 'inline-block', marginBottom: 30, border: 1 }}
          onClick={() => this.setState({ switchContainer: !this.state.switchContainer })}
        >
        Show all list! 
           switchContainer: {this.state.switchContainer ? 'true' : 'false'} 
        </button> */}

        {/* todos: 现在如果 getScrollContainer 变化，需要设置新 key 来触发 componentWillUnmount */}
        <PullToRefresh
          key={this.state.switchContainer}
          style={{
            height: 150,
            width: '100%' ,
            overflow: "auto",
            border: "1px solid rgb(1, 228, 228)",
            cursor:'pointer'
          }}
          {...(this.state.switchContainer
            ? { getScrollContainer: () => document.body }
            : {})}
          className="forTest"
          direction="down"
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1000);
          }}
          onClick={() => this.setState({ switchContainer: !this.state.switchContainer })}
          indicator={{ deactivate: " " }}
          damping={150}
        >
          <button
          // className="btn-right"
          style={{ display: 'inline-block',textAlign: "center", marginBottom: 0, border: 1, paddingBottom:0, cursor:'pointer'}}
          onClick={() => this.setState({ switchContainer: !this.state.switchContainer })}
        >
        {this.state.switchContainer ? 'Hide' : 'Show  all'} list! 
          {/* switchContainer: {this.state.switchContainer ? 'true' : 'false'} */}
        </button>
          {items.map(i => (
            <div
              key={i.id}
              style={{ textAlign: "center" }}
              // onClick={() => alert(i)}
            >
              <span style={{ color: "blue" }}>{i.name}</span> -{" "}
              <span style={{ color: "green" }}>{i.owner.login}: </span>
              <a href={i.html_url} target="_blank" rel="noreferrer noopener">
                {i.html_url}
              </a>
            </div>
          ))}
        </PullToRefresh>

        <div
          dangerouslySetInnerHTML={{
            __html: navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)
              ? "<style>#qrcode, .highlight{ display: none }</style>"
              : ""
          }}
        />
      </div>
    );
  }
}
