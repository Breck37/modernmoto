import React from "react";
import Link from "next/link";

export const QualifyingLink = ({ qualifyingContent, canShowQualifying }) => {
  if (!canShowQualifying) {
    return <h3>{qualifyingContent.label}</h3>;
  }

  return (
    <Link href={qualifyingContent.link} passHref>
      <a href="" target="_blank" className="qualifying-link">
        <h3>{qualifyingContent.label}</h3>
      </a>
    </Link>
  );
};
