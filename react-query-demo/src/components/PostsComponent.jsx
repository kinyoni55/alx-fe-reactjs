import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) throw new Error('Network response failed');
    return res.json();
  };

const ReactQueryExample = () => {
    // Use the useQuery hook to handle data fetching and caching
    const { 
        data, 
        isError, 
        isLoading, 
        isFetching, 
        refetch 
      } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        cacheTime: 5 * 60 * 1000,    // Keep cached data for 5 minutes
        staleTime: 1 * 60 * 1000,     // Data stays fresh for 1 minute
        refetchOnWindowFocus: true,  // Refetch when window regains focus
        keepPreviousData: true       // Keep previous data during refetches
      });

    // Handle loading state
    if (isLoading) return <div>Loading...</div>;
    // Handle error state
    if (isError) return <div>Error loading data</div>;

    // Render the fetched data
    return (
        <div>
             <button 
               onClick={() => refetch()}
                disabled={isFetching}
               style={{
                   marginBottom: '1rem',
                   padding: '0.5rem 1rem',
                   cursor: isFetching ? 'not-allowed' : 'pointer'
                 }}
             >
         {isFetching ? 'Refreshing...' : 'Refresh Data'}
      </button>
            {data.map(item => (
                <div key={item.id} style={{ marginBottom: '1rem' }}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                </div>
            ))}
        </div>
    );
};

export default ReactQueryExample;