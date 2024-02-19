import React from 'react';
import { TERipple } from 'tw-elements-react';
import Link from 'next/link';

interface CardBasicProps {
    id: number,
    name: string,
    content: string,
    createdAt: string
}

export default function CardBasicExample({id, name, content, createdAt}: CardBasicProps): JSX.Element {
  const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
      <div className="mx-auto mb-8 block max-w-md p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out dark:bg-gray-800 dark:border-gray-700 border border-gray-200 md:max-w-2xl">
        <TERipple>
          <div className="space-y-6">
            <h5 className="text-2xl font-semibold leading-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {content}
            </p>
            <em className="text-sm text-gray-500">{formattedDate}</em> <br />
            <Link href={`/articles/${id}`}>Cliquez ici</Link>
          </div>
        </TERipple>
      </div>
  );
}
