import React from "react";
import ProblemList from "./ProblemList";

const SectionList = ({ sections }) => {
  
  return (
    <div>
      <h1>75 Coding Sheet</h1>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2>{section.title}</h2>
          <ProblemList
            problems={section.problems}
          />
        </div>
      ))}
    </div>
  );
};

export default SectionList;
