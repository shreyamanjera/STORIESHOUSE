"use client";

export default function BackLink() {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/stories-house");
  };

  return <button className="about-back-link" type="button" onClick={goBack}>← BACK</button>;
}
