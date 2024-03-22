/*
React query for signup and login
1. Install react-query - npm i @tanstack/react-query
2. SETUP - We can't use QueryClientProvider in the layout we've to create another file which will be 'client',
in app create ReactQueryProvider an we'll wrap the children in that.

Creating new instance of react query
const queryClient = new QueryClient();

Now we need QueryClientProvider so we'll wrap our app in this and it need a client which is query Client

<QueryCient client={queryClient}>
Component
</QueryCient>

Api request using useQuery

const {data, isLoading, isError, error, status and there are lots of options we can get} =useQuery({
    queryKey:['posts'] -> We pass the key to each query so it can identify it uniquely.
    queryFn:() => {} This function fetch the api
    we can create helpers file in that we can write helper functions to fetch the data.
    e.g
    queryFn:fetchPosts
});

There is reactQueryDevtool
npm i @tanstack/react-query-devtools
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

and in main file use it above closing tag of QueryClientProvider

.
.
<ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>

so there will be small icon, if click on that we can see the everything there,

* Post api request using mutation
const {mutate, isError, isPending, error and etc} = useMutation({
    mutationFn: userLogin - Handler function for api
});
If the handler function expect some parameters then we've to pass it using mutate() function.

const handleSubmit = (e) => {

    mutate({name,email,password})
}

1. E.g If we add a new post then the post will be added but it is not showing on UI but if we refresh it it comes,because it happens because of caching feature in react-query, We can see in react query devtool, we can see if we add somthing then data goes to stale, to get the update data, we've to invalidate data, so it will fetch it again.

so in useMutation

It calls before mutation happens - Before
onMutate: () => {
    return {id:1} // this id will go in context in onSuccess
}

at the top of the component
const queryClient = useQueryClient();

It calls when mutation is successed
variables means the payload we pass
onSuccess: (data,variables,context) => {
    queryClient.invalidateQueries({
        queryKey : ['posts']
    })
}

onError: (error,variables,context) => {}

onSettled: (data, and more) => {}

we can use reset function of mutation
isError && <p onClick={reset}>Unable to post</p>
so it will reset that error and the state of the app.

When we fetch the query by using react query, it marks that query instantly as stale, means this is no longer fetched. And we need to invaidate this query to fetch fresh data again.

e.g If we've posts components there we are fetching the posts and showing, and there is a toggle state variable and the button and if toggle is trure then we'll show the posts otherwise not, but issue is if toggle is false, and make it true again then the api request is made everytime to fetch the posts. to avoid this,
so in main app 

in new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
        }
    }
})

so everything will be fresh for 1 minute, so it won't fetch it again, before one minite.

If for something we don't want to fetch again at all, so in that query
e.g in tags
staleTime: Infinity
so it won't refetch.

gcTime: 0 - look in the docs for this. 

* and there is 'refetchInterval: 1000 * 5' if we add it it will fetch the particular query after every 5 seconds.
*/