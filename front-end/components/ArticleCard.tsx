import React from 'react';
import Link from 'next/link';

interface CardBasicProps {
    id: number,
    name: string,
    slug: string,
    content: string,
    createdAt: string
}

function TruncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

export default function CardBasicExample({id, name,slug, content, createdAt}: CardBasicProps): JSX.Element {
  const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

  const maxLength = 100; 
  const truncatedText = TruncateText(content, maxLength);

  return (
      <div className="mx-auto mt-5 mb-8 block max-w-md p-8 rounded-xl shadow-sm white:bg-gray-800 grey:border-gray-700 border border-gray-200 md:max-w-3xl">
          <div className="space-y-6">
            <h5 className="text-2xl font-semibold leading-tight text-gray-900 dark:text-white">
            <Link href={`/articles/${slug}`}>{name}</Link>
            </h5>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {truncatedText}
            </p>
            <em className="text-sm text-gray-500">{formattedDate}</em> <br />
          </div>
        
      </div>
  );
}
