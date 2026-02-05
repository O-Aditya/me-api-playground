'use client';

import { useEffect, useState } from 'react';
import { api, Profile } from '@/lib/api';
import ProfileCard from '@/components/ProfileCard';
import ProjectCard from '@/components/ProjectCard';
import SkillTag from '@/components/SkillTag';
import About from '@/components/About';
import Link from 'next/link';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getProfile();
        if (response.success && response.data) {
          setProfile(response.data);
        } else {
          setError(response.error?.message || 'Failed to load profile');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent mx-auto mb-4"></div>
          <p className="font-mono text-xs text-muted-foreground">loading...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full border border-border rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-2">error</h2>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-border rounded hover:bg-muted transition-colors font-mono text-sm"
          >
            retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Profile Section */}
        <ProfileCard profile={profile} />

        {/* About Section */}
        <About
          name={profile.name}
          bio="I'm a full-stack developer specializing in modern web technologies, with expertise in building scalable applications using React, Next.js, and Spring Boot."
          role="Full-Stack Developer"
          status="available"
          location="India"
          email={profile.email}
        />

        {/* Projects Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">projects</h2>
            <Link
              href="/projects"
              className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              view all
            </Link>
          </div>

          <div className="border-t border-border">
            {profile.projects.slice(0, 5).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Full-width separator */}
        <hr className="border-border my-16 -mx-6" />

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <SkillTag key={skill.name} skill={skill} />
            ))}
          </div>
        </section>

        {/* Full-width separator */}
        <hr className="border-border my-16 -mx-6" />

        {/* Work Experience Section */}
        {profile.work.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-8">experience</h2>
            <div className="border-t border-border">
              {profile.work.map((work, index) => (
                <div
                  key={index}
                  className="py-8 border-b border-border last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-medium">{work.role}</h3>
                    <span className="font-mono text-xs text-muted-foreground shrink-0">
                      {work.isCurrent ? 'present' : new Date(work.endDate || '').getFullYear()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{work.company}</p>
                  {work.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {work.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Full-width separator */}
        <hr className="border-border my-16 -mx-6" />

        {/* Quick Links */}
        <section>
          <div className="flex flex-wrap gap-6 font-mono text-xs">
            <Link
              href="/projects"
              className="underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              all projects
            </Link>
            <Link
              href="/search"
              className="underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              search
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
