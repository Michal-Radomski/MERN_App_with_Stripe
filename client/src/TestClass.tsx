import React from "react";

class TestClass extends React.Component<{}, {}> {
  render() {
    return <div>{null}</div>;
  }
}

export default TestClass;

console.log("TestClass", TestClass, typeof TestClass);
console.log("React.Component", React.Component, typeof React.Component);
console.log("React", React, typeof React);
