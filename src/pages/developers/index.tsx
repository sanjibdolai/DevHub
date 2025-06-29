import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import Card from "../../components/card";
import Button from "../../components/button";
import LoadingSpinner from "../../components/loading-spinner";
import { useGetDevelopersQuery } from "../../store/api/developersApi";
import type { Developer } from "../../store/api/developersApi";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "../../components/pagination/Pagination";

const developersPerPage = 6;

const DevelopersPage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const navigate = useNavigate();
    const { data, isLoading } = useGetDevelopersQuery({ page, limit: developersPerPage, search, skills: selectedSkills });
    const developers: Developer[] = data?.data || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / developersPerPage);

    // For skill filter options, get all unique skills from all pages (fetch all developers for global skills)
    const { data: allDevs } = useGetDevelopersQuery({ page: 1, limit: 1000 });
    const allSkills = useMemo(() => {
        const skillSet = new Set<string>();
        (allDevs?.data || []).forEach(dev => dev.skills.forEach(skill => skillSet.add(skill)));
        return Array.from(skillSet).sort();
    }, [allDevs]);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6">Developer Directory</h1>
            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4">
                <Button onClick={() => setMobileFilterOpen(true)} className="w-full">Filter & Search</Button>
            </div>
            {/* Mobile Filter Modal */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-11/12 max-w-md p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
                            onClick={() => setMobileFilterOpen(false)}
                            aria-label="Close filter"
                        >
                            &times;
                        </button>
                        <div className="mb-6">
                            <label htmlFor="dev-search-mobile" className="text-sm font-medium mb-1 block">Search</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z" /></svg>
                                </span>
                                <input
                                    id="dev-search-mobile"
                                    type="text"
                                    className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                                    placeholder="Search by name, bio, etc."
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                                    aria-label="Search developers"
                                />
                            </div>
                        </div>
                        <div>
                            <span className="text-sm font-medium mb-2 block">Skills</span>
                            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                                {allSkills.map(skill => (
                                    <label key={skill} className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            value={skill}
                                            checked={selectedSkills.includes(skill)}
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    setSelectedSkills([...selectedSkills, skill]);
                                                } else {
                                                    setSelectedSkills(selectedSkills.filter(s => s !== skill));
                                                }
                                                setPage(1);
                                            }}
                                            className="accent-indigo-600 h-4 w-4 rounded border-gray-300 dark:border-gray-700"
                                        />
                                        <span>{skill}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {(search || selectedSkills.length > 0) && (
                            <button
                                type="button"
                                className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow text-sm hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 w-full"
                                onClick={() => { setSearch(""); setSelectedSkills([]); setPage(1); }}
                            >
                                Clear Filters
                            </button>
                        )}
                        <Button onClick={() => setMobileFilterOpen(false)} className="mt-4 w-full">Apply</Button>
                    </div>
                </div>
            )}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar: Search & Skills (Desktop only) */}
                <aside className="hidden md:block md:w-1/4 w-full md:sticky md:top-24 h-fit bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 mb-6 md:mb-0">
                    <div className="mb-6">
                        <label htmlFor="dev-search" className="text-sm font-medium mb-1 block">Search</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z" /></svg>
                            </span>
                            <input
                                id="dev-search"
                                type="text"
                                className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                                placeholder="Search by name, bio, etc."
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                aria-label="Search developers"
                            />
                        </div>
                    </div>
                    <div>
                        <span className="text-sm font-medium mb-2 block">Skills</span>
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                            {allSkills.map(skill => (
                                <label key={skill} className="flex items-center gap-2 cursor-pointer text-sm">
                                    <input
                                        type="checkbox"
                                        value={skill}
                                        checked={selectedSkills.includes(skill)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedSkills([...selectedSkills, skill]);
                                            } else {
                                                setSelectedSkills(selectedSkills.filter(s => s !== skill));
                                            }
                                            setPage(1);
                                        }}
                                        className="accent-indigo-600 h-4 w-4 rounded border-gray-300 dark:border-gray-700"
                                    />
                                    <span>{skill}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {(search || selectedSkills.length > 0) && (
                        <button
                            type="button"
                            className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow text-sm hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 w-full"
                            onClick={() => { setSearch(""); setSelectedSkills([]); setPage(1); }}
                        >
                            Clear Filters
                        </button>
                    )}
                </aside>
                {/* Main Content: Developer Cards */}
                <main className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {developers.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12 w-full">
                                No developers found matching your criteria.
                            </div>
                        ) : developers.map((dev) => (
                            <Card key={dev.uid} className="hover:-translate-y-1 hover:shadow-2xl">
                                <div className="p-6 text-center">
                                    {dev.profilePicture ? (
                                        <img src={dev.profilePicture} alt={dev.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-gray-700 object-cover" />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center bg-indigo-200 text-indigo-700 text-3xl font-bold border-4 border-gray-200 dark:border-gray-700">
                                            {dev.name.split(' ').map((n) => n[0]?.toUpperCase()).join('')}
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold">{dev.name}</h3>
                                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        {dev.skills.slice(0, 3).map((skill: string) => (
                                            <span key={skill} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{skill}</span>
                                        ))}
                                    </div>
                                    <Button onClick={() => navigate(`/developers/${dev.uid}`)} className="mt-6 w-full">View Profile</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination className="mt-8">
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                              .filter(p =>
                                p === 1 ||
                                p === totalPages ||
                                (p >= page - 1 && p <= page + 1)
                              )
                              .reduce((acc, p, idx, arr) => {
                                if (idx > 0 && p - arr[idx - 1] > 1) {
                                  acc.push('ellipsis');
                                }
                                acc.push(p);
                                return acc;
                              }, [] as (number | 'ellipsis')[])
                              .map((p, idx) =>
                                p === 'ellipsis' ? (
                                  <PaginationItem key={"ellipsis-" + idx}>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                ) : (
                                  <PaginationItem key={p}>
                                    <PaginationLink isActive={page === p} onClick={() => setPage(p as number)}>{p}</PaginationLink>
                                  </PaginationItem>
                                )
                              )
                            }
                            <PaginationItem>
                              <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DevelopersPage;