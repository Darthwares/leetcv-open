"use client";

import { SocialMedia } from "@/lib/schemas/resume.schema";
import { Github, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";

interface SocialMediaProps {
  socialMedia: SocialMedia[];
}

export default function SocialMediaLinks({ socialMedia }: SocialMediaProps) {
  if (!socialMedia || socialMedia.length === 0) {
    return null;
  }

  const getIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes("github")) return Github;
    if (lowerPlatform.includes("linkedin")) return Linkedin;
    if (lowerPlatform.includes("twitter") || lowerPlatform.includes("x")) return Twitter;
    return LinkIcon;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Connect</h2>
      <div className="space-y-3">
        {socialMedia.map((social) => {
          const Icon = getIcon(social.platform);
          return (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <Icon className="h-4 w-4 mr-2" />
              <span>{social.platform}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}