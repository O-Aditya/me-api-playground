'use client';

import { useEffect, useState } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';

interface AboutProps {
    name: string;
    bio: string;
    role: string;
    status: 'available' | 'busy';
    location: string;
    email: string;
}

export default function About({ name, bio, role, status, location, email }: AboutProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };

    return (
        <div className="border-b border-border pb-12 mb-16">
            {/* Intro */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">about</h2>
                <p className="text-base leading-relaxed text-foreground">
                    <span className="font-medium">Hello.</span> {bio}
                </p>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Role */}
                <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-muted-foreground">role</span>
                        <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${status === 'available' ? 'text-green-500' : 'text-yellow-500'
                            }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {status}
                        </span>
                    </div>
                    <p className="text-sm font-medium">{role}</p>
                </div>

                {/* Location & Time */}
                <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                        <span className="font-mono text-xs text-muted-foreground">location</span>
                    </div>
                    <p className="text-sm font-medium mb-1">{location}</p>
                    <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                        <span className="font-mono text-xs text-muted-foreground">{formatTime(time)}</span>
                    </div>
                </div>

                {/* Contact */}
                <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                        <span className="font-mono text-xs text-muted-foreground">contact</span>
                    </div>
                    <a
                        href={`mailto:${email}`}
                        className="text-sm underline underline-offset-4 text-foreground hover:text-muted-foreground transition-colors"
                    >
                        {email}
                    </a>
                </div>
            </div>
        </div>
    );
}
