import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Delete existing data
    await prisma.workExperience.deleteMany();
    await prisma.project.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.profile.deleteMany();

    // Create profile for Aditya Maurya
    const profile = await prisma.profile.create({
        data: {
            name: 'Aditya Maurya',
            email: 'aditya.maurya@example.com',
            education: 'B.Tech Computer Science (2026)',
            githubUrl: 'https://github.com/O-Aditya',
            linkedinUrl: 'https://linkedin.com/in/aditya-maurya',
            portfolioUrl: 'https://github.com/O-Aditya',
            avatarUrl: 'https://avatars.githubusercontent.com/u/126507594?v=4',
        },
    });

    console.log(`✅ Created profile: ${profile.name}`);

    // Create skills
    const skills = await prisma.skill.createMany({
        data: [
            // Backend
            { profileId: profile.id, name: 'Java', proficiency: 'Advanced', yearsExperience: 2 },
            { profileId: profile.id, name: 'Spring Boot', proficiency: 'Advanced', yearsExperience: 2 },
            { profileId: profile.id, name: 'Node.js', proficiency: 'Intermediate', yearsExperience: 1 },
            { profileId: profile.id, name: 'Express.js', proficiency: 'Intermediate', yearsExperience: 1 },

            // Frontend
            { profileId: profile.id, name: 'React', proficiency: 'Advanced', yearsExperience: 2 },
            { profileId: profile.id, name: 'Next.js', proficiency: 'Advanced', yearsExperience: 2 },
            { profileId: profile.id, name: 'TypeScript', proficiency: 'Advanced', yearsExperience: 2 },
            { profileId: profile.id, name: 'JavaScript', proficiency: 'Advanced', yearsExperience: 3 },
            { profileId: profile.id, name: 'Tailwind CSS', proficiency: 'Advanced', yearsExperience: 2 },
            { profileId: profile.id, name: 'HTML/CSS', proficiency: 'Expert', yearsExperience: 3 },

            // Database
            { profileId: profile.id, name: 'PostgreSQL', proficiency: 'Intermediate', yearsExperience: 1 },
            { profileId: profile.id, name: 'MongoDB', proficiency: 'Intermediate', yearsExperience: 1 },
            { profileId: profile.id, name: 'Redis', proficiency: 'Intermediate', yearsExperience: 1 },

            // Tools & Others
            { profileId: profile.id, name: 'Docker', proficiency: 'Intermediate', yearsExperience: 1 },
            { profileId: profile.id, name: 'Git', proficiency: 'Advanced', yearsExperience: 3 },
            { profileId: profile.id, name: 'REST APIs', proficiency: 'Advanced', yearsExperience: 2 },
            { profileId: profile.id, name: 'WebSockets', proficiency: 'Intermediate', yearsExperience: 1 },
            { profileId: profile.id, name: 'Rust', proficiency: 'Intermediate', yearsExperience: 1 },
            { profileId: profile.id, name: 'Tauri', proficiency: 'Intermediate', yearsExperience: 1 },
        ],
    });

    console.log(`✅ Created ${skills.count} skills`);

    // Create projects based on GitHub repos
    const projects = await prisma.project.createMany({
        data: [
            {
                profileId: profile.id,
                title: 'GhostChat — Real-Time Anonymous Messaging',
                description: 'Privacy-first real-time messaging application with anonymous chat rooms and auto message deletion. Built with Next.js 16, Redis (TTL), and WebSockets for scalable, performance-optimized architecture.',
                startDate: new Date('2025-12-13'),
                endDate: null,
                link: 'https://github.com/O-Aditya/GhostChat',
                skillsUsed: ['Next.js', 'TypeScript', 'Redis', 'WebSockets', 'React', 'Tailwind CSS'],
            },
            {
                profileId: profile.id,
                title: 'Hospital Management System',
                description: 'Production-grade, full-stack Hospital Management System built with Java 21 and Spring Boot 3.3. Features clean REST APIs using DTO pattern, centralized exception handling, and Docker deployment.',
                startDate: new Date('2025-12-13'),
                endDate: new Date('2025-12-13'),
                link: 'https://github.com/O-Aditya/Hospital_Management',
                skillsUsed: ['Java', 'Spring Boot', 'REST APIs', 'Docker', 'PostgreSQL'],
            },
            {
                profileId: profile.id,
                title: 'TechBlog Backend',
                description: 'Personal blog application backend using Spring Boot and Spring Security. Features JWT authentication, role-based access control, and RESTful API design with comprehensive security measures.',
                startDate: new Date('2025-06-23'),
                endDate: null,
                link: 'https://github.com/O-Aditya/TechBlog-Backend',
                skillsUsed: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'PostgreSQL'],
            },
            {
                profileId: profile.id,
                title: 'Wispr Flow Clone',
                description: 'High-performance, cross-platform voice-to-text desktop application built with Rust (Tauri) and React. Demonstrates mastery of systems programming and modern desktop app development.',
                startDate: new Date('2025-12-31'),
                endDate: new Date('2026-01-02'),
                link: 'https://github.com/O-Aditya/wispr-flow-clone',
                skillsUsed: ['Rust', 'Tauri', 'React', 'TypeScript'],
            },
            {
                profileId: profile.id,
                title: 'Notes Management App',
                description: 'React application demonstrating state management and core React concepts. Features CRUD operations, component lifecycle, and modern React patterns including hooks and context API.',
                startDate: new Date('2026-01-08'),
                endDate: new Date('2026-01-08'),
                link: 'https://github.com/O-Aditya/Notes-Management-App',
                skillsUsed: ['React', 'JavaScript', 'HTML/CSS'],
            },
            {
                profileId: profile.id,
                title: 'Voting DApp',
                description: 'Decentralized voting application built on blockchain technology. Demonstrates understanding of Web3 concepts, smart contracts, and decentralized application architecture.',
                startDate: new Date('2025-02-03'),
                endDate: new Date('2025-09-22'),
                link: 'https://github.com/O-Aditya/Voting_Dapp',
                skillsUsed: ['JavaScript', 'React', 'Blockchain', 'Web3'],
            },
            {
                profileId: profile.id,
                title: 'AuthDemo — JWT Security Implementation',
                description: 'Spring Boot application implementing JWT authentication and Spring Security. Demonstrates secure API design, token-based authentication, and authorization best practices.',
                startDate: new Date('2025-08-26'),
                endDate: new Date('2025-08-26'),
                link: 'https://github.com/O-Aditya/AuthDemo',
                skillsUsed: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'REST APIs'],
            },
        ],
    });

    console.log(`✅ Created ${projects.count} projects`);

    // Create work experience (as a fresher, focusing on education and self-learning)
    const work = await prisma.workExperience.createMany({
        data: [
            {
                profileId: profile.id,
                company: 'Open Source Community',
                role: 'Open Source Contributor',
                description: 'Contributing to various open-source projects, collaborating with global developers, and building public repositories to showcase full-stack development skills.',
                startDate: new Date('2023-02-01'),
                endDate: null,
                isCurrent: true,
            },
            {
                profileId: profile.id,
                company: 'Self-Directed Learning',
                role: 'Full-Stack Developer',
                description: 'Building production-ready applications using Java, Spring Boot, React, and Next.js. Focus on backend architecture, REST APIs, system design, and modern web development practices.',
                startDate: new Date('2023-01-01'),
                endDate: null,
                isCurrent: true,
            },
        ],
    });

    console.log(`✅ Created ${work.count} work experiences`);
    console.log('🎉 Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
