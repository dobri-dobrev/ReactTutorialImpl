'use strict';

var React = require('react');
var $ = require('jquery');



var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitized: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML = {{__html: rawMarkup}} />
      </div>
      );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map( function(comment){
      return(
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="CommentList">
        {commentNodes}
      </div>
      );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="CommentForm">
      Form
      </div>
      );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []}
  },
  callServer: function(){
    $.ajax({
        url: this.props.url,
        jsonp: "callback",
        dataType: "jsonp",
        success: function( data ) {
            this.setState({data: data}); // server response
        }.bind(this),
        error: function(xhr, status, err){
          console.log("Shit");
        }
    });
  },
  componentDidMount: function() {
    this.callServer();
    //setInterval(this.callServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="CommentBox">
        <h1> Comments</h1>
        <CommentList data = {this.state.data} />
        <CommentForm />
      </div>
      );
  }
});



React.render(
  <CommentBox url= "http://localhost:4567/jsonp" pollInterval={2000}/>,
  $("#container")[0]
);

