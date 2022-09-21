import { useState, useEffect } from "react";

import "./table.css";

const Index = ({ data }) => {
  const [headerData] = useState(() => {
    return Object.keys(data[0]).map((header) =>
      header.split(/(?=[A-Z])/).join(" ")
    );
  });
  const [entryData, setEntryData] = useState(() => {
    return data.reduce((acum, curr) => {
      let reducedEntry = [];
      for (let entry in curr) {
        reducedEntry.push(curr[entry] ?? "");
      }
      return [...acum, reducedEntry];
    }, []);
  });

  useEffect(() => {
    setEntryData(() => {
      return data.reduce((acum, curr) => {
        let reducedEntry = [];
        for (let entry in curr) {
          reducedEntry.push(curr[entry]);
        }
        return [...acum, reducedEntry];
      }, []);
    });
  }, [data]);

  return (
    <table>
      <thead>
        <tr>
          {headerData.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entryData.map((entries, i) => (
          <tr key={i} className={i & 1 && "bg-light-green"}>
            {entries.map((entry, i) => (
              <td key={i}>{entry}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Index;
