import React, { useEffect } from "react";

const TestScrollPage = () => {
  useEffect(() => {
    // Scroll to top after paint
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 200);
  }, []);

  return (
    <div style={{ height: "1500px", paddingTop: "100px" }}>
      <h1 style={{ textAlign: "center" }}>This is a test scroll page</h1>
      <p style={{ textAlign: "center" }}>You should land at the very top.</p>
    </div>
  );
};

export default TestScrollPage;
