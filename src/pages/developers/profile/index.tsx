import { useParams, useNavigate } from "react-router";
import Card from "../../../components/card";
import LoadingSpinner from "../../../components/loading-spinner";
import { useGetDeveloperByUidQuery, useUpdateDeveloperMutation } from "../../../store/api/developersApi";
import { useGetBlogsQuery } from "../../../store/api/blogsApi";
import { useAuth } from "../../../store/useAuth";
import { useState } from "react";
import Button from "../../../components/button";

const DeveloperProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: devArr, isLoading: isLoadingDev } = useGetDeveloperByUidQuery(id || "");
    const developer = devArr && devArr.length > 0 ? devArr[0] : null;
    const { data: blogsData, isLoading: isLoadingBlogs } = useGetBlogsQuery({ page: 1, limit: 1000 });
    const blogs = blogsData?.data?.filter(blog => blog.author === developer?.name || blog.author === developer?.uid || blog.author === developer?.id) || [];
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState(developer?.name || "");
    const [editBio, setEditBio] = useState(developer?.bio || "");
    const [editSkills, setEditSkills] = useState<string[]>(developer?.skills || []);
    const [editGithub, setEditGithub] = useState(developer?.social?.github || "");
    const [editTwitter, setEditTwitter] = useState(developer?.social?.twitter || "");
    const [updateDeveloper] = useUpdateDeveloperMutation();

    if (isLoadingDev || isLoadingBlogs) return <LoadingSpinner />;
    if (!developer) return <div>Developer not found.</div>;

    const socials = developer.social || {};
    const skills = developer.skills || [];
    const avatar = developer.profilePicture;
    const getInitials = (name: string) => name.split(' ').map(n => n[0]?.toUpperCase()).join('');

    // When entering edit mode, populate fields with current values
    const handleEditClick = () => {
        setEditName(developer.name || "");
        setEditBio(developer.bio || "");
        setEditSkills(developer.skills || []);
        setEditGithub(developer.social?.github || "");
        setEditTwitter(developer.social?.twitter || "");
        setEditMode(true);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <div className="p-6 text-center">
                            {avatar ? (
                                <img src={avatar} alt={developer.name} className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-gray-700 object-cover" />
                            ) : (
                                <div className="w-40 h-40 rounded-full mx-auto mb-4 flex items-center justify-center bg-indigo-200 text-indigo-700 text-5xl font-bold border-4 border-gray-200 dark:border-gray-700">
                                    {getInitials(developer.name)}
                                </div>
                            )}
                            <h1 className="text-2xl font-bold mb-2">{developer.name}</h1>
                            {/* Only show edit button if logged-in user is viewing their own profile */}
                            {user && (user.uid === developer.uid) && !editMode && (
                                <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded" onClick={handleEditClick}>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="font-bold mb-2">About</h3>
                            {editMode ? (
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                    value={editBio}
                                    onChange={e => setEditBio(e.target.value)}
                                    placeholder="Tell us about yourself"
                                />
                            ) : (
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{developer.bio}</p>
                            )}
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="font-bold mb-4">Skills</h3>
                            {editMode ? (
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                    value={editSkills.join(", ")}
                                    onChange={e => setEditSkills(e.target.value.split(",").map(s => s.trim()))}
                                    placeholder="Comma separated skills"
                                />
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {skills.length > 0 ? skills.map(skill => (
                                        <span key={skill} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{skill}</span>
                                    )) : <span className="text-gray-400">No skills listed</span>}
                                </div>
                            )}
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="font-bold mb-2">Social Links</h3>
                            {editMode ? (
                                <>
                                    <input
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                        value={editGithub}
                                        onChange={e => setEditGithub(e.target.value)}
                                        placeholder="GitHub URL"
                                    />
                                    <input
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                        value={editTwitter}
                                        onChange={e => setEditTwitter(e.target.value)}
                                        placeholder="Twitter URL"
                                    />
                                </>
                            ) : (
                                <div className="flex justify-center space-x-4">
                                    {socials.github && <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">GitHub</a>}
                                    {socials.twitter && <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">Twitter</a>}
                                </div>
                            )}
                        </div>
                        {editMode && (
                            <div className="border-t border-gray-200 dark:border-gray-700 p-6 flex gap-2">
                                <Button
                                    variant="primary"
                                    onClick={async () => {
                                        await updateDeveloper({
                                            id: developer.id || "",
                                            data: {
                                                name: editName,
                                                bio: editBio,
                                                skills: editSkills,
                                                uid: developer.uid,
                                                social: { github: editGithub, twitter: editTwitter }
                                            }
                                        });
                                        setEditMode(false);
                                        window.location.reload();
                                    }}
                                >Save</Button>
                                <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
                            </div>
                        )}
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
                    <div className="space-y-6">
                        {blogs.length > 0 ? blogs.map(post => (
                            <Card key={post.id} className="hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" onClick={() => navigate(`/blogs/${post.id}`)}>{post.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{new Date(post.date).toLocaleDateString()}</p>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.content.slice(0, 120)}...</p>
                                    <span onClick={() => navigate(`/blogs/${post.id}`)} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">Read more &rarr;</span>
                                </div>
                            </Card>
                        )) : (
                            <p>This developer hasn't posted anything yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperProfilePage;