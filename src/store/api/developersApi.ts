import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Developer {
    id?: string;
    uid: string;
    name: string;
    email: string; // Added email property
    bio?: string;
    skills: string[];
    profilePicture?: string;
    social?: {
        github?: string;
        twitter?: string;
    };
    location?: string;
}

export interface DevelopersResponse {
    data: Developer[];
    total: number;
}

export const developersApi = createApi({
    reducerPath: 'developersApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({
        getDevelopers: builder.query<DevelopersResponse, { page: number; limit: number; search?: string; skills?: string[] }>({
            query: ({ page, limit, search = '', skills = [] }) => {
                const params = new URLSearchParams({
                    _page: page.toString(),
                    _limit: limit.toString(),
                });
                if (search) params.append('q', search);
                if (skills.length) skills.forEach(skill => params.append('skills_like', skill));
                return `developers?${params.toString()}`;
            },
            transformResponse: (response: Developer[], meta) => {
                const total = Number(meta?.response?.headers.get('x-total-count')) || response.length;
                return { data: response, total };
            },
        }),
        addDeveloper: builder.mutation<Developer, Partial<Developer>>({
            query: (body) => ({
                url: 'developers',
                method: 'POST',
                body,
            }),
        }),
        getDeveloperByUid: builder.query<Developer[], string>({
            query: (uid) => `developers?uid=${uid}`,
        }),
        updateDeveloper: builder.mutation<Developer, { id: string; data: Partial<Developer> }>({
            query: ({ id, data }) => ({
                url: `developers/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const { useGetDevelopersQuery, useAddDeveloperMutation, useGetDeveloperByUidQuery, useUpdateDeveloperMutation } = developersApi;
