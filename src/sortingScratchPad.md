const [currentSort, setCurrentSort] = useState<SortParams>({
sortKey: "",
dir: SortDir.NONE,
});

.sort((a, b) => sortHelper(a, b, currentSort))

const handleSortChange = useCallback((sortKey: string) => {
setCurrentSort((prevData: SortParams) => {
if (sortKey === prevData.sortKey) {
if (prevData.dir === SortDir.ASC) {
return { sortKey, dir: SortDir.DESC };
} else {
return { sortKey: "", dir: SortDir.NONE };
}
} else {
return { sortKey, dir: SortDir.ASC };
}
});
}, []);

const sortHelper = useCallback(
(itemA: any, itemB: any, sortParams: SortParams) => {
console.log("sort parms", sortParams);
if (sortParams.sortKey === "") return 1;
return sortParams.dir === SortDir.ASC
? itemA[sortParams.sortKey].localeCompare(
itemB[sortParams.sortKey],
)
:itemB[sortParams.sortKey].localeCompare(
itemA[sortParams.sortKey],
);
},
[],
);
