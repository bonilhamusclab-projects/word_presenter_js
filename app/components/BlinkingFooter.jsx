import React, { Component } from 'react'


export default class BlinkingFooter extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const footer_style = {
      height: this.props.height,
      backgroundColor: this.props.flash ? "white" : "black"
    }
    const [left, right] = [this.props.left, this.props.right]
      .map(l => "col-md-" + l)
    return (
      <footer className="footer container-fluid">
        <div className="row-fluid">
          <div className={left}></div>
          <div className={right + " panel panel-default"}>
            <h5 className="panel-heading">Signal</h5>
            <div className="panel-body" style={footer_style}/>
          </div>
        </div>
      </footer>
    )
  }
}
