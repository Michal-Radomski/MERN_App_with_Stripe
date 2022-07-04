import React from "react";

const TestFunction = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>{null}</div>
    </React.Fragment>
  );
};

export default TestFunction;

console.log("TestFunction", TestFunction, typeof TestFunction);
console.log("React", React, typeof React);
