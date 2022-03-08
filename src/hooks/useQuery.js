import { useEffect, useState } from "react";

function useQuery(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => setData(data.results.filter(x => x.title !== "")))
}, [])

  return { data };
}

export default useQuery;