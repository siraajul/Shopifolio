"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

interface TeamMember {
    name: string;
    role: string;
    image: any;
    linkedin?: string;
    twitter?: string;
}

interface TeamData {
    title: string;
    description: string;
    members: TeamMember[];
}

export default function TeamSection() {
    const [data, setData] = useState<TeamData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const query = `*[_type == "team"][0]`;
            const result = await client.fetch(query);
            setData(result);
        };
        fetchData();
    }, []);

    if (!data) return null;

    return (
        <section className="py-20 bg-background relative overflow-hidden" id="team">
             <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-12 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{data.title}</h2>
                    <p className="text-muted-foreground text-lg">
                        {data.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.members?.map((member, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4">
                                {member.image && (
                                    <Image 
                                        src={urlFor(member.image).url()} 
                                        alt={member.name} 
                                        fill 
                                        className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                    />
                                )}
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-primary font-medium mb-3">{member.role}</p>
                            
                            <div className="flex items-center gap-3">
                                {member.linkedin && (
                                    <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        <Linkedin size={20} />
                                    </Link>
                                )}
                                {member.twitter && (
                                    <Link href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        <Twitter size={20} />
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
             </div>
        </section>
    )
}
