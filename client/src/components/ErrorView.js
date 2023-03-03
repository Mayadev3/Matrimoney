import React from "react";

export default function ErrorView(props) {
  return (
    <div className="ErrorView">
      <p>
        <h2 style={{ color: "red" }}>
          Error {props.code}: {props.text}
        </h2>
      </p>
    </div>
  );
}
