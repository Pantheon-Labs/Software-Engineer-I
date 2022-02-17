import useSWR from "swr";
import useSWRImmutable from 'swr/immutable'

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useResults(API_URL: string, fileId: string) {
  const shouldFetch = API_URL && fileId !== "" && fileId;
  const { data, error } = useSWRImmutable(
    shouldFetch && API_URL + "/results?fileId=" + fileId,
    fetcher,
    {
      refreshInterval: 1000,
      errorRetryCount: 10,
      errorRetryInterval: 1000,
    }
  );

  // 1. item wasn't added to dynamo yet
  // 2. item added, but results haven't returned
  const loading =
    shouldFetch &&
    (data?.message?.includes("not found") ||
      data?.message?.includes("not added yet"));

  console.log("Data:", data, "Error:", error);
  return {
    results: data,
    isResultsLoading: !error && loading,
    isResultsError: error,
  };
}
