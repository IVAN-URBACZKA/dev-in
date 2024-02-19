import React from 'react';
import { TERipple } from 'tw-elements-react';
import Link from 'next/link'


interface CardBasicProps {
    id: number,
    name: string,
    content: string,
    createdAt: string
}

export default function CardBasicExample({id, name, content, createdAt}: CardBasicProps): JSX.Element {
  return (
      <div
        className="mx-auto mb-5 block max-w-md p-6 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {name}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {content}
        </p>
        <em>{createdAt}</em> <br />
        <Link href={`/articles/${id}`}>Cliquez ici</Link>
      </div>
  );
}
