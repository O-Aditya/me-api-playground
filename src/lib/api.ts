// API client utilities

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        status: number;
    };
}

export interface Profile {
    id: number;
    name: string;
    email: string;
    education: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    portfolioUrl: string | null;
    avatarUrl: string | null;
    skills: Skill[];
    projects: Project[];
    work: WorkExperience[];
}

export interface Skill {
    name: string;
    proficiency: string | null;
    years: number | null;
}

export interface Project {
    id: number;
    title: string;
    description: string | null;
    link: string | null;
    skillsUsed: string[] | null;
    startDate: string | null;
    endDate: string | null;
}

export interface WorkExperience {
    company: string;
    role: string;
    startDate: string;
    endDate: string | null;
    description: string | null;
    isCurrent: boolean;
}

export interface SearchResults {
    projects: Array<{
        id: number;
        title: string;
        description: string | null;
        type: 'project';
    }>;
    skills: Array<{
        name: string;
        proficiency: string | null;
        type: 'skill';
    }>;
    work: Array<{
        company: string;
        role: string;
        type: 'work';
    }>;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            return {
                success: false,
                error: {
                    code: 'NETWORK_ERROR',
                    message: 'Failed to connect to API',
                    status: 0,
                },
            };
        }
    }

    async getProfile(): Promise<ApiResponse<Profile>> {
        return this.request<Profile>('/api/profile');
    }

    async getProjects(skill?: string): Promise<ApiResponse<Project[]>> {
        const query = skill ? `?skill=${encodeURIComponent(skill)}` : '';
        return this.request<Project[]>(`/api/projects${query}`);
    }

    async getProject(id: number): Promise<ApiResponse<Project>> {
        return this.request<Project>(`/api/projects/${id}`);
    }

    async getSkills(): Promise<ApiResponse<Skill[]>> {
        return this.request<Skill[]>('/api/skills');
    }

    async getTopSkills(): Promise<ApiResponse<Array<{ name: string; count: number }>>> {
        return this.request('/api/skills/top');
    }

    async getWorkExperience(): Promise<ApiResponse<WorkExperience[]>> {
        return this.request<WorkExperience[]>('/api/work');
    }

    async search(query: string): Promise<ApiResponse<SearchResults>> {
        return this.request<SearchResults>(`/api/search?q=${encodeURIComponent(query)}`);
    }

    async checkHealth(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
        return this.request('/api/health');
    }
}

export const api = new ApiClient(API_URL);
